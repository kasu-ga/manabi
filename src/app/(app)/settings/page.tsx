import { SettingsForm } from "@/components/settings";
import { Main } from "@/components/ui/main";
import { Title } from "@/components/ui/title";
import { getSessionData } from "@/services/session";
import { getTranslations } from "@/services/translations";
import { notFound } from "next/navigation";

export default async function Page() {
  const sessionData = await getSessionData();
  if (!sessionData) return notFound();
  const { user } = sessionData;
  const translations = await getTranslations();
  return (
    <Main>
      <Title className="mb-6">{translations.common.settings}</Title>
      <SettingsForm currentLanguage={user.language ?? "en"} />
    </Main>
  );
}
