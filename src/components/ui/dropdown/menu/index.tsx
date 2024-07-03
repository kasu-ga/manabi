"use client";

import { useDropdownContext } from "@/context/dropdown";
import { cn } from "@/lib/utils";

export function DropdownMenu({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open } = useDropdownContext();
  return (
    <div
      className={cn(
        "absolute right-0 top-full pt-2 z-20",
        open ? "" : "hidden"
      )}
    >
      <menu
        className={cn(
          "relative bg-white shadow-xl border border-zinc-200 rounded-2xl",
          className
        )}
      >
        {children}
      </menu>
    </div>
  );
}
