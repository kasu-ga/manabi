import { submitS3Object } from "@/services/s3";

export interface SubmitCardFiles {
  frontAudio?: string | undefined;
  frontImage?: string | undefined;
  backAudio?: string | undefined;
  backImage?: string | undefined;
}

export async function submitCardFiles(
  cardId: string,
  files: {
    frontAudio?: File | undefined;
    frontImage?: File | undefined;
    backAudio?: File | undefined;
    backImage?: File | undefined;
  }
) {
  const frontAudio = files.frontAudio
    ? await submitS3Object(files.frontAudio, `${cardId}-front-audio`)
    : undefined;
  const frontImage = files.frontImage
    ? await submitS3Object(files.frontImage, `${cardId}-front-image`)
    : undefined;
  const backAudio = files.backAudio
    ? await submitS3Object(files.backAudio, `${cardId}-back-audio`)
    : undefined;
  const backImage = files.backImage
    ? await submitS3Object(files.backImage, `${cardId}-back-image`)
    : undefined;
  const newFiles: SubmitCardFiles = {};
  if (frontAudio) newFiles.frontAudio = frontAudio;
  if (frontImage) newFiles.frontImage = frontImage;
  if (backAudio) newFiles.backAudio = backAudio;
  if (backImage) newFiles.backImage = backImage;
  return newFiles;
}
