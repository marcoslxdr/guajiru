import { notFound } from "next/navigation";
import { ModalityForm } from "@/components/admin/modality-form";
import { getAdminModalityById } from "@/lib/supabase/admin-queries";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditModalityPage({ params }: PageProps) {
  const { id } = await params;
  const modality = await getAdminModalityById(id);

  if (!modality) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Editar {modality.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Alterações aparecem na página pública após salvar.
        </p>
      </div>
      <ModalityForm modality={modality} />
    </div>
  );
}
