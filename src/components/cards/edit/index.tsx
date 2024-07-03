import { editCardAction } from "@/actions/edit-card";
import { Form } from "@/components/ui/form";
import { FormButton } from "@/components/ui/form/button";
import { Input } from "@/components/ui/form/input";
import { Subtitle } from "@/components/ui/subtitle";
import { Title } from "@/components/ui/title";
import { SelectCard } from "@/db/schemas/card";
import { CardImageInput } from "../ui/image-input";
import { CardAudioInput } from "../ui/audio-input";
import { getTranslations } from "@/services/translations";

export async function EditCardForm({ data }: { data: SelectCard }) {
  const translations = await getTranslations();
  return (
    <>
      <Title>{translations.common.edit} Card</Title>
      <Form submit={editCardAction(data.id)}>
        <section>
          <Subtitle>{translations.common.front}</Subtitle>
          <div className="flex gap-2 md:gap-4 max-md:flex-col">
            <CardImageInput value={data.frontImage} name="frontImage" />
            <div className="flex-1 relative flex flex-col gap-4">
              <Input
                value={data.frontText ?? ""}
                name="frontText"
                placeholder={translations.common.text}
              />
              <Input
                value={data.frontReading ?? ""}
                name="frontReading"
                placeholder={translations.common.reading}
              />
              <CardAudioInput
                translations={{
                  "not-selected": translations.common["not-selected"],
                }}
                value={data.frontAudio}
                name="frontAudio"
              />
            </div>
          </div>
        </section>

        <section>
          <Subtitle>{translations.common.back}</Subtitle>
          <div className="flex gap-2 md:gap-4 max-md:flex-col">
            <CardImageInput value={data.backImage} name="backImage" />
            <div className="flex-1 relative flex flex-col gap-4">
              <Input
                value={data.backText ?? ""}
                name="backText"
                placeholder={translations.common.text}
              />
              <Input
                value={data.backReading ?? ""}
                name="backReading"
                placeholder={translations.common.reading}
              />
              <CardAudioInput
                translations={{
                  "not-selected": translations.common["not-selected"],
                }}
                value={data.backAudio}
                name="backAudio"
              />
            </div>
          </div>
        </section>

        <FormButton>{translations.common.save}</FormButton>
      </Form>
    </>
  );
}
