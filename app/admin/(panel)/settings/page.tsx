import { SettingsForm } from "@/components/admin/settings-form";
import { getAdminSiteSettings } from "@/lib/supabase/admin-queries";

export default async function AdminSettingsPage() {
  const settings = await getAdminSiteSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Configurações</h1>
        <p className="mt-1 text-sm text-muted-foreground">Contato, endereço e redes sociais exibidos no site.</p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
