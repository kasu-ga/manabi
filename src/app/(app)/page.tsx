import { UserDesks } from "@/components/desks/table";
import { Main } from "@/components/ui/main";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <Main>
      <UserDesks />
    </Main>
  );
}
