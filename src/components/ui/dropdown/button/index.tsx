"use client";

import { useDropdownContext } from "@/context/dropdown";
import { cn } from "@/lib/utils";

export function DropdownButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { show } = useDropdownContext();
  return (
    <button onClick={show} className={cn("", className)}>
      {children}
    </button>
  );
}
