import { cn } from "@/lib/utils";

export function Main({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("relative mx-auto max-w-4xl p-4", className)}>
      {children}
    </main>
  );
}
