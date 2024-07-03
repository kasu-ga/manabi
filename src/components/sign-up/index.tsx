import { signUpAction } from "@/actions/sign-up";
import { Form } from "../ui/form";
import { Input } from "../ui/form/input";
import { FormButton } from "../ui/form/button";
import { getTranslations } from "@/services/translations";

export async function SignUpForm() {
  const translations = await getTranslations();
  return (
    <Form submit={signUpAction} className="w-full">
      <Input
        placeholder={translations.common.email}
        name="email"
        type="email"
      />
      <Input
        placeholder={translations.common.password}
        name="password"
        type="password"
      />
      <FormButton className="w-full">{translations.common.continue}</FormButton>
    </Form>
  );
}
