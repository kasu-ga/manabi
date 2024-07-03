import { ChangePasswordForm } from "@/components/change-password";
import { Brand } from "@/components/ui/brand";
import { Main } from "@/components/ui/main";
import { Title } from "@/components/ui/title";
import { getSessionData } from "@/services/session";
import { getTranslations } from "@/services/translations";

export default async function ChangePassword() {
  const { session } = await getSessionData();
  const translations = await getTranslations();
  return (
    <Main>
      <article className="py-20">
        <Brand />
        <Title className="mt-8 mb-4">
          {translations["change-password"].title}
        </Title>
        <p className="mb-8 text-zinc-500">
          {translations["change-password"].description}
        </p>
        <ChangePasswordForm session={session} />
      </article>
    </Main>
  );
}
