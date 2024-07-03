import { validateResetPasswordCodeAction } from "@/actions/reset-password";
import { Form } from "../ui/form";
import { FormButton } from "../ui/form/button";
import { Input } from "../ui/form/input";
import { SessionData } from "mixejs";
import { getTranslations } from "@/services/translations";

export async function ChangePasswordForm({
  session,
}: {
  session: SessionData;
}) {
  const action = validateResetPasswordCodeAction(session);
  const translations = await getTranslations();
  return (
    <Form submit={action}>
      <Input
        placeholder={translations["change-password"]["recovery-code"]}
        name="code"
      />
      <Input
        placeholder={translations["change-password"]["new-password"]}
        name="password"
        type="password"
      />
      <FormButton>{translations.common.continue}</FormButton>
    </Form>
  );
}
