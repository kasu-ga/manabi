import { cn } from "@/lib/utils";

export function Title({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-2xl font-semibold mb-2", className)}>{children}</h2>
  );
}
