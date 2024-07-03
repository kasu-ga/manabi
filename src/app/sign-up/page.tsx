import Link from "next/link";

import { SignUpForm } from "@/components/sign-up";
import { Main } from "@/components/ui/main";
import { Brand } from "@/components/ui/brand";
import { Title } from "@/components/ui/title";
import { getTranslations } from "@/services/translations";

export default async function SignUp() {
  const translations = await getTranslations();
  return (
    <Main>
      <article className="py-20">
        <Brand />
        <Title className="mb-4 mt-8">{translations.signup.title}</Title>
        <SignUpForm />
        <p className="text-zinc-500 mt-8">
          {translations.signup["has-account"]}{" "}
          <Link
            className="text-rose-500 transition-[color] hover:text-rose-600"
            href="/sign-in"
          >
            {translations.signup["sign-in"]}
          </Link>
        </p>
      </article>
    </Main>
  );
}
