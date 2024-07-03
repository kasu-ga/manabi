import { createCardAction } from "@/actions/create-card";
import { Form } from "@/components/ui/form";
import { FormButton } from "@/components/ui/form/button";
import { Input } from "@/components/ui/form/input";
import { Subtitle } from "@/components/ui/subtitle";
import { Title } from "@/components/ui/title";
import { CardAudioInput } from "../ui/audio-input";
import { CardImageInput } from "../ui/image-input";
import { getTranslations } from "@/services/translations";

export async function CreateCardForm({ deskId }: { deskId: string }) {
  const translations = await getTranslations();
  return (
    <>
      <Title className="mb-6">{translations.common.create} Card</Title>
      <Form submit={createCardAction(deskId)}>
        <section>
          <Subtitle>{translations.common.front}</Subtitle>
          <div className="flex gap-2 md:gap-4 max-md:flex-col">
            <CardImageInput name="frontImage" />
            <div className="flex-1 relative flex flex-col gap-4">
              <Input name="frontText" placeholder={translations.common.text} />
              <Input
                name="frontReading"
                placeholder={translations.common.reading}
              />
              <CardAudioInput
                translations={{
                  "not-selected": translations.common["not-selected"],
                }}
                name="frontAudio"
              />
            </div>
          </div>
        </section>

        <section>
          <Subtitle>{translations.common.back}</Subtitle>
          <div className="flex gap-2 md:gap-4 max-md:flex-col">
            <CardImageInput name="backImage" />
            <div className="flex-1 relative flex flex-col gap-4">
              <Input name="backText" placeholder={translations.common.text} />
              <Input
                name="backReading"
                placeholder={translations.common.reading}
              />
              <CardAudioInput
                translations={{
                  "not-selected": translations.common["not-selected"],
                }}
                name="backAudio"
              />
            </div>
          </div>
        </section>

        <FormButton>{translations.common.create}</FormButton>
      </Form>
    </>
  );
}
