export function validateExtname(...allowExtnames: string[]) {
  return (file: File) => {
    return allowExtnames.includes(file.type);
  };
}

export const validateImageExtname = validateExtname(
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp"
);

export const validateAudioExtname = validateExtname("audio/mp3", "audio/mpeg");
