import { signInAction } from "@/actions/sign-in";
import { Form } from "../ui/form";
import { Input } from "../ui/form/input";
import { FormButton } from "../ui/form/button";
import { getTranslations } from "@/services/translations";

export async function SignInForm() {
  const translations = await getTranslations();
  return (
    <Form submit={signInAction}>
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
      <FormButton>{translations.common.continue}</FormButton>
    </Form>
  );
}
