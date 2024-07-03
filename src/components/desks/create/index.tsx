import { createDeskAction } from "@/actions/create-desk";
import { Form } from "@/components/ui/form";
import { FormButton } from "@/components/ui/form/button";
import { Input } from "@/components/ui/form/input";
import { Title } from "@/components/ui/title";
import { getTranslations } from "@/services/translations";

export async function CreateDeskForm() {
  const translations = await getTranslations();
  return (
    <>
      <Title className="mb-6">{translations.common.new} Desk</Title>
      <Form submit={createDeskAction}>
        <Input name="name" placeholder={translations.common.name} />
        <FormButton>{translations.common.create}</FormButton>
      </Form>
    </>
  );
}
