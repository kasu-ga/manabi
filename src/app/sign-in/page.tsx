import Link from "next/link";

import { SignInForm } from "@/components/sign-in";
import { Main } from "@/components/ui/main";
import { Title } from "@/components/ui/title";
import { Brand } from "@/components/ui/brand";
import { getTranslations } from "@/services/translations";

export default async function SignIn() {
  const translations = await getTranslations();
  return (
    <Main>
      <article className="py-20">
        <Brand />
        <Title className="mb-6 mt-8">{translations.signin.title}</Title>
        <SignInForm />
        <Link
          className="block mt-8 mb-2 text-rose-500 transition-[color] hover:text-rose-600"
          href="/recovery"
        >
          {translations.signin["forgot-password"]}
        </Link>
        <p className="text-zinc-500">
          {translations.signin["new-here"]}{" "}
          <Link
            className="text-rose-500 transition-[color] hover:text-rose-600"
            href="/sign-up"
          >
            {translations.signin["sign-up"]}
          </Link>
        </p>
      </article>
    </Main>
  );
}
