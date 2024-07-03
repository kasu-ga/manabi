import { deleteDeskAction } from "@/actions/delete-desk";
import { Form } from "@/components/ui/form";
import { FormButton } from "@/components/ui/form/button";
import { Input } from "@/components/ui/form/input";
import { Title } from "@/components/ui/title";
import { SelectDesk } from "@/db/schemas/desk";
import { getTranslations } from "@/services/translations";

export async function DeleteDeskForm({ data }: { data: SelectDesk }) {
  const translations = await getTranslations();
  const action = deleteDeskAction(data.id, data.name);
  return (
    <>
      <Title className="mb-4">{translations.common.delete} Desk</Title>
      <Form submit={action}>
        <p className="text-zinc-500 mb-4">
          {translations["delete-desk"].write}{" "}
          <span className="font-semibold text-zinc-700">{data.name}</span>{" "}
          {translations["delete-desk"].description}
        </p>
        <Input name="name" placeholder={data.name} />
        <FormButton>{translations.common.delete}</FormButton>
      </Form>
    </>
  );
}
