import { RecoveryForm } from "@/components/recovery";
import { Brand } from "@/components/ui/brand";
import { Main } from "@/components/ui/main";
import { Title } from "@/components/ui/title";
import { getTranslations } from "@/services/translations";

export default async function Recovery() {
  const translations = await getTranslations();
  return (
    <Main>
      <article className="py-20">
        <Brand />
        <Title className="mt-8 mb-4">{translations.recovery.title}</Title>
        <p className="mb-8 text-zinc-500">
          {translations.recovery.description}
        </p>
        <RecoveryForm />
      </article>
    </Main>
  );
}
