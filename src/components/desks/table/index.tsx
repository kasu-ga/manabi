import { DeskCard } from "./desk-card";
import { SelectDesk } from "@/db/schemas/desk";

export function UserDesks({ desks }: { desks: SelectDesk[] }) {
  return (
    <>
      <section className="relative flex flex-col gap-4">
        {desks.map((desk) => (
          <DeskCard key={desk.id} {...desk} />
        ))}
      </section>
    </>
  );
}
