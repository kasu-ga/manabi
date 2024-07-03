import { SettingsForm } from "@/components/settings";
import { Main } from "@/components/ui/main";
import { Title } from "@/components/ui/title";
import { getSessionData } from "@/services/session";
import { getTranslations } from "@/services/translations";

export default async function Page() {
  const { user } = await getSessionData();
  const translations = await getTranslations();
  return (
    <Main>
      <Title className="mb-6">{translations.common.settings}</Title>
      <SettingsForm currentLanguage={user.language ?? "en"} />
    </Main>
  );
}
