import { ModalityList } from "@/components/admin/modality-list";
import { getAdminModalities } from "@/lib/supabase/admin-queries";

export default async function AdminModalidadesPage() {
  const modalities = await getAdminModalities();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Modalidades</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edite textos, horários e categorias exibidos nas páginas públicas.
        </p>
      </div>
      <ModalityList modalities={modalities} />
    </div>
  );
}
