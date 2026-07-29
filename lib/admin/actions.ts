"use server";

import { createHash } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sanitizePostHtml } from "@/lib/admin/sanitize-html";
import { slugify } from "@/lib/admin/slugify";
import { assertAdmin } from "@/lib/supabase/admin";
import { getTypedSupabase } from "@/lib/supabase/typed-server";
import { DEFAULT_DOCUMENT_SOURCE, isTransparencyDocType } from "@/lib/transparency";
import type { Database, Post, PostStatus } from "@/lib/supabase/types";

const MAX_COVER_BYTES = 2 * 1024 * 1024;
const ALLOWED_COVER_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_PDF_BYTES = 10 * 1024 * 1024;

export type ActionResult = {
  ok: boolean;
  error?: string;
  id?: string;
};

function revalidatePostPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/noticias");
  if (slug) {
    revalidatePath(`/noticias/${slug}`);
  }
}

async function uploadCover(postId: string, file: File) {
  if (file.size > MAX_COVER_BYTES) {
    throw new Error("A imagem deve ter no máximo 2 MB.");
  }

  if (!ALLOWED_COVER_TYPES.has(file.type)) {
    throw new Error("Formato inválido. Use JPEG, PNG ou WebP.");
  }

  const supabase = await getTypedSupabase();
  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `posts/${postId}/cover.${extension}`;

  const { error } = await supabase.storage.from("club-assets").upload(path, file, {
    upsert: true,
    contentType: file.type,
  });

  if (error) {
    throw new Error("Falha ao enviar imagem de capa.");
  }

  const { data } = supabase.storage.from("club-assets").getPublicUrl(path);
  return data.publicUrl;
}

async function isSlugTaken(slug: string, excludeId?: string) {
  const supabase = await getTypedSupabase();
  let query = supabase.from("posts").select("id").eq("slug", slug);

  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  const { data } = await query.maybeSingle();
  return Boolean(data as { id: string } | null);
}

export async function loginAction(formData: FormData): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { ok: false, error: "E-mail e senha são obrigatórios." };
  }

  const supabase = await getTypedSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return { ok: false, error: "E-mail ou senha incorretos." };
  }

  if (data.user.app_metadata?.role !== "admin") {
    await supabase.auth.signOut();
    return { ok: false, error: "Conta sem permissão de administrador." };
  }

  redirect("/admin/posts");
}

export async function logoutAction() {
  await assertAdmin();
  const supabase = await getTypedSupabase();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function savePostAction(formData: FormData): Promise<ActionResult> {
  await assertAdmin();

  const id = String(formData.get("id") ?? "").trim() || undefined;
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const categoryRaw = String(formData.get("category") ?? "notícia");
  const bodyRaw = String(formData.get("body") ?? "");
  const intent = String(formData.get("intent") ?? "draft");
  const coverFile = formData.get("cover");

  if (!title) {
    return { ok: false, error: "Título é obrigatório." };
  }

  if (categoryRaw !== "notícia" && categoryRaw !== "comunicado") {
    return { ok: false, error: "Categoria inválida." };
  }

  const category = categoryRaw as Post["category"];

  const slug = slugify(slugInput || title);
  if (!slug) {
    return { ok: false, error: "Endereço (slug) inválido." };
  }

  if (await isSlugTaken(slug, id)) {
    return { ok: false, error: "Já existe notícia com este endereço." };
  }

  const body = sanitizePostHtml(bodyRaw);
  const supabase = await getTypedSupabase();

  let postId = id;
  let previousSlug: string | undefined;

  if (id) {
    const { data: existingRow } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
    const existing = existingRow as Post | null;

    previousSlug = existing?.slug;

    let status: PostStatus;
    if (intent === "publish") {
      status = "published";
    } else if (intent === "save" && existing?.status === "published") {
      status = "published";
    } else {
      status = "draft";
    }

    const publishedAt =
      status === "published" ? (existing?.published_at ?? new Date().toISOString()) : null;

    const updatePayload: Database["public"]["Tables"]["posts"]["Update"] = {
      title,
      slug,
      category,
      body,
      status,
      published_at: publishedAt,
    };

    const { error } = await supabase.from("posts").update(updatePayload).eq("id", id);
    if (error) {
      return { ok: false, error: "Não foi possível salvar a notícia." };
    }
  } else {
    const status: PostStatus = intent === "publish" ? "published" : "draft";

    const { data, error } = await supabase
      .from("posts")
      .insert({
        title,
        slug,
        category,
        body,
        status,
        published_at: status === "published" ? new Date().toISOString() : null,
      })
      .select("id")
      .single();

    if (error || !data) {
      return { ok: false, error: "Não foi possível criar a notícia." };
    }

    postId = data.id;
  }

  if (!postId) {
    return { ok: false, error: "Erro interno ao salvar notícia." };
  }

  if (coverFile instanceof File && coverFile.size > 0) {
    try {
      const coverUrl = await uploadCover(postId, coverFile);
      await supabase.from("posts").update({ cover_image_url: coverUrl }).eq("id", postId);
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : "Falha no upload da capa.",
      };
    }
  }

  revalidatePostPaths(slug);
  if (previousSlug && previousSlug !== slug) {
    revalidatePostPaths(previousSlug);
  }

  return { ok: true, id: postId };
}

export async function unpublishPostAction(id: string): Promise<ActionResult> {
  await assertAdmin();
  const supabase = await getTypedSupabase();

  const { data: post } = await supabase.from("posts").select("slug").eq("id", id).maybeSingle();
  const { error } = await supabase
    .from("posts")
    .update({ status: "draft", published_at: null })
    .eq("id", id);

  if (error) {
    return { ok: false, error: "Não foi possível despublicar." };
  }

  if (post?.slug) {
    revalidatePostPaths(post.slug);
  }

  return { ok: true };
}

export async function deletePostAction(id: string): Promise<ActionResult> {
  await assertAdmin();
  const supabase = await getTypedSupabase();

  const { data: post } = await supabase.from("posts").select("slug").eq("id", id).maybeSingle();
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    return { ok: false, error: "Não foi possível excluir a notícia." };
  }

  await supabase.storage.from("club-assets").remove([
    `posts/${id}/cover.jpg`,
    `posts/${id}/cover.png`,
    `posts/${id}/cover.webp`,
  ]);

  if (post?.slug) {
    revalidatePostPaths(post.slug);
  }

  return { ok: true };
}

export async function saveSettingsAction(formData: FormData): Promise<ActionResult> {
  await assertAdmin();

  const payload = {
    contact_email: String(formData.get("contact_email") ?? "").trim() || null,
    address: String(formData.get("address") ?? "").trim() || null,
    map_lat: parseOptionalNumber(formData.get("map_lat")),
    map_lng: parseOptionalNumber(formData.get("map_lng")),
    whatsapp: String(formData.get("whatsapp") ?? "").trim() || null,
    instagram: String(formData.get("instagram") ?? "").trim() || null,
    facebook: String(formData.get("facebook") ?? "").trim() || null,
  };

  const supabase = await getTypedSupabase();
  const { error } = await supabase.from("site_settings").upsert({ id: 1, ...payload });

  if (error) {
    return { ok: false, error: "Não foi possível salvar as configurações." };
  }

  revalidatePath("/", "layout");
  revalidatePath("/contato");

  return { ok: true };
}

function parseOptionalNumber(value: FormDataEntryValue | null): number | null {
  const raw = String(value ?? "").trim();
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

function transparencyStoragePath(id: string) {
  return `transparency/${id}/document.pdf`;
}

async function hashPdfFile(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return createHash("sha256").update(buffer).digest("hex");
}

async function uploadTransparencyPdf(id: string, file: File) {
  if (file.size > MAX_PDF_BYTES) {
    throw new Error("O PDF deve ter no máximo 10 MB.");
  }

  if (file.type !== "application/pdf") {
    throw new Error("Formato inválido. Use apenas PDF.");
  }

  const supabase = await getTypedSupabase();
  const path = transparencyStoragePath(id);

  const { error } = await supabase.storage.from("club-assets").upload(path, file, {
    upsert: true,
    contentType: "application/pdf",
  });

  if (error) {
    throw new Error("Falha ao enviar o PDF.");
  }

  const { data } = supabase.storage.from("club-assets").getPublicUrl(path);
  return data.publicUrl;
}

export async function saveTransparencyDocumentAction(formData: FormData): Promise<ActionResult> {
  await assertAdmin();

  const id = String(formData.get("id") ?? "").trim() || undefined;
  const title = String(formData.get("title") ?? "").trim();
  const docTypeRaw = String(formData.get("doc_type") ?? "");
  const publishedAt = String(formData.get("published_at") ?? "").trim();
  const sourceNote =
    String(formData.get("source_note") ?? "").trim() || DEFAULT_DOCUMENT_SOURCE;
  const version = String(formData.get("version") ?? "").trim() || "1.0";
  const file = formData.get("file");

  if (!title) {
    return { ok: false, error: "Título é obrigatório." };
  }

  if (!isTransparencyDocType(docTypeRaw)) {
    return { ok: false, error: "Tipo de documento inválido." };
  }

  if (!publishedAt) {
    return { ok: false, error: "Data de publicação é obrigatória." };
  }

  const docType = docTypeRaw;
  const supabase = await getTypedSupabase();
  const hasNewFile = file instanceof File && file.size > 0;
  const now = new Date().toISOString();

  if (!id && !hasNewFile) {
    return { ok: false, error: "Selecione um arquivo PDF." };
  }

  let docId = id;

  if (id) {
    const updatePayload: Database["public"]["Tables"]["transparency_documents"]["Update"] = {
      title,
      doc_type: docType,
      published_at: publishedAt,
      source_note: sourceNote,
      version,
      updated_at: now,
    };

    const { error } = await supabase.from("transparency_documents").update(updatePayload).eq("id", id);
    if (error) {
      return { ok: false, error: "Não foi possível salvar o documento." };
    }
  } else {
    if (!hasNewFile || !(file instanceof File)) {
      return { ok: false, error: "Selecione um arquivo PDF." };
    }

    docId = crypto.randomUUID();

    try {
      const [fileUrl, contentHash] = await Promise.all([
        uploadTransparencyPdf(docId, file),
        hashPdfFile(file),
      ]);
      const { error } = await supabase.from("transparency_documents").insert({
        id: docId,
        title,
        doc_type: docType,
        published_at: publishedAt,
        file_url: fileUrl,
        source_note: sourceNote,
        version,
        content_hash: contentHash,
        updated_at: now,
      });

      if (error) {
        await supabase.storage.from("club-assets").remove([transparencyStoragePath(docId)]);
        return { ok: false, error: "Não foi possível criar o documento." };
      }
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : "Falha no upload do PDF.",
      };
    }
  }

  if (!docId) {
    return { ok: false, error: "Erro interno ao salvar documento." };
  }

  if (id && hasNewFile && file instanceof File) {
    try {
      const [fileUrl, contentHash] = await Promise.all([
        uploadTransparencyPdf(docId, file),
        hashPdfFile(file),
      ]);
      await supabase
        .from("transparency_documents")
        .update({ file_url: fileUrl, content_hash: contentHash, updated_at: now })
        .eq("id", docId);
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : "Falha no upload do PDF.",
      };
    }
  }

  revalidatePath("/transparencia");
  revalidatePath("/admin/transparencia");
  return { ok: true, id: docId };
}

export async function deleteTransparencyDocumentAction(id: string): Promise<ActionResult> {
  await assertAdmin();
  const supabase = await getTypedSupabase();

  const { error } = await supabase.from("transparency_documents").delete().eq("id", id);
  if (error) {
    return { ok: false, error: "Não foi possível excluir o documento." };
  }

  await supabase.storage.from("club-assets").remove([transparencyStoragePath(id)]);
  revalidatePath("/transparencia");

  return { ok: true };
}

function parseLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function revalidateModalityPaths(slug?: string) {
  revalidatePath("/modalidades");
  if (slug) {
    revalidatePath(`/modalidades/${slug}`);
  }
  revalidatePath("/", "layout");
}

export async function saveModalityAction(formData: FormData): Promise<ActionResult> {
  await assertAdmin();

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    return { ok: false, error: "Modalidade inválida." };
  }

  const shortDescription = String(formData.get("short_description") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim() || null;
  const audience = String(formData.get("audience") ?? "").trim() || null;
  const trainingSchedule = String(formData.get("training_schedule") ?? "").trim() || null;
  const trainingFocus = parseLines(formData.get("training_focus"));
  const published = formData.get("published") === "on";

  if (!shortDescription) {
    return { ok: false, error: "Resumo é obrigatório." };
  }

  if (!description) {
    return { ok: false, error: "Descrição é obrigatória." };
  }

  const supabase = await getTypedSupabase();
  const { data: existing } = await supabase.from("modalities").select("slug").eq("id", id).maybeSingle();

  const { error } = await supabase
    .from("modalities")
    .update({
      short_description: shortDescription,
      description,
      location,
      audience,
      training_schedule: trainingSchedule,
      training_focus: trainingFocus,
      published,
    })
    .eq("id", id);

  if (error) {
    return { ok: false, error: "Não foi possível salvar a modalidade." };
  }

  revalidateModalityPaths(existing?.slug);
  return { ok: true, id };
}
