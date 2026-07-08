import { notFound } from "next/navigation";
import { TransparencyDocumentForm } from "@/components/admin/transparency-document-form";
import { getAdminTransparencyDocumentById } from "@/lib/supabase/admin-queries";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditTransparencyDocumentPage({ params }: PageProps) {
  const { id } = await params;
  const document = await getAdminTransparencyDocumentById(id);

  if (!document) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Editar documento</h1>
        <p className="mt-1 text-sm text-muted-foreground">{document.title}</p>
      </div>
      <TransparencyDocumentForm document={document} />
    </div>
  );
}
