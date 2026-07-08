import { TransparencyDocumentForm } from "@/components/admin/transparency-document-form";

export default function AdminNewTransparencyDocumentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Anexar documento</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          O PDF ficará disponível na página de transparência do site.
        </p>
      </div>
      <TransparencyDocumentForm />
    </div>
  );
}
