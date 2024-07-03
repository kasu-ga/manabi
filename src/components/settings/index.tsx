import { changeLanguageAction } from "@/actions/change-lang";
import { Form } from "../ui/form";
import { FormButton } from "../ui/form/button";
import { Select } from "../ui/select";
import { Subtitle } from "../ui/subtitle";
import { Languages } from "@/lib/consts";
import { getTranslations } from "@/services/translations";

const languages: Record<string, string> = {};

for (const code in Languages) {
  languages[code] = Languages[code as keyof typeof Languages].label;
}

export async function SettingsForm({
  currentLanguage,
}: {
  currentLanguage: string;
}) {
  const translations = await getTranslations();
  return (
    <>
      <Subtitle>{translations.common.language}</Subtitle>
      <Form submit={changeLanguageAction}>
        <Select name="language" options={languages} value={currentLanguage} />
        <FormButton>{translations.common.save}</FormButton>
      </Form>
    </>
  );
}
