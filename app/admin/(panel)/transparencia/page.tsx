import Link from "next/link";
import { TransparencyDocumentList } from "@/components/admin/transparency-document-list";
import { getAdminTransparencyDocuments } from "@/lib/supabase/admin-queries";

export default async function AdminTransparenciaPage() {
  const documents = await getAdminTransparencyDocuments();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Transparência</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie atas, estatuto e relatórios da página pública.
          </p>
        </div>
        <Link href="/admin/transparencia/new" className="btn-primary h-11">
          Anexar documento
        </Link>
      </div>
      <TransparencyDocumentList documents={documents} />
    </div>
  );
}
