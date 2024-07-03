import { deleteCardAction } from "@/actions/delete-card";
import { Form } from "@/components/ui/form";
import { FormButton } from "@/components/ui/form/button";
import { Input } from "@/components/ui/form/input";
import { Title } from "@/components/ui/title";
import { SelectCard } from "@/db/schemas/card";
import { getTranslations } from "@/services/translations";

export async function DeleteCardForm({ data }: { data: SelectCard }) {
  const translations = await getTranslations();
  const action = deleteCardAction(data.id, translations.common.yes);
  return (
    <>
      <Title className="mb-4">{translations.common.delete} Card</Title>
      <Form submit={action}>
        <p className="text-zinc-500 mb-4">
          {translations["delete-card"].write}{" "}
          <span className="font-semibold text-zinc-800">
            {translations.common.yes}
          </span>{" "}
          {translations["delete-card"].description}
        </p>
        <Input name="name" placeholder={translations.common.yes} />
        <FormButton>{translations.common.delete}</FormButton>
      </Form>
    </>
  );
}
