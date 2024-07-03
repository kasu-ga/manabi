export function removeEmptyFiles(
  body: Record<string, FormDataEntryValue | null>
) {
  const newBody: Record<string, FormDataEntryValue | null> = {};
  for (const prop in body) {
    const value = body[prop];
    if (!value) continue;
    if (value instanceof File) {
      if (value.size === 0) continue;
      newBody[prop] = value;
      continue;
    }
    if (value.length === 0) continue;
    newBody[prop] = value;
  }
  return newBody;
}
