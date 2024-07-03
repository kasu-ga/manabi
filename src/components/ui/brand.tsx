import { BookIcon } from "../icons/book";

export function Brand() {
  return (
    <h1 className="text-3xl font-semibold flex items-center gap-2">
      <span className="text-rose-500">
        <BookIcon />
      </span>
      Manabi
    </h1>
  );
}
