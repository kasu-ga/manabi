import { sendResetPasswordCodeAction } from "@/actions/reset-password";
import { Form } from "../ui/form";
import { FormButton } from "../ui/form/button";
import { Input } from "../ui/form/input";
import { getTranslations } from "@/services/translations";

export async function RecoveryForm() {
  const translations = await getTranslations();
  return (
    <Form submit={sendResetPasswordCodeAction}>
      <Input
        placeholder={translations.common.email}
        name="email"
        type="email"
      />
      <FormButton>{translations.common.send}</FormButton>
    </Form>
  );
}
