import { editDeskAction } from "@/actions/edit-desk";
import { Form } from "@/components/ui/form";
import { FormButton } from "@/components/ui/form/button";
import { Input } from "@/components/ui/form/input";
import { Title } from "@/components/ui/title";
import { SelectDesk } from "@/db/schemas/desk";
import { getTranslations } from "@/services/translations";

export async function EditDeskForm({ data }: { data: SelectDesk }) {
  const translations = await getTranslations();
  const action = editDeskAction(data.id);
  return (
    <>
      <Title className="mb-6">{translations.common.edit} Desk</Title>
      <Form submit={action}>
        <Input
          value={data.name}
          name="name"
          placeholder={translations.common.name}
        />
        <FormButton>{translations.common.save}</FormButton>
      </Form>
    </>
  );
}
