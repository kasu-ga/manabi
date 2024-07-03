"use client";

import { DropdownContext } from "@/context/dropdown";
import { useClickOutside } from "@/hook/click-outside";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

export function Dropdown({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const show = useCallback(() => {
    setOpen((o) => !o);
  }, []);
  const hide = useCallback(() => {
    setOpen(false);
  }, []);
  const ref = useClickOutside<HTMLDivElement>(hide);
  return (
    <DropdownContext.Provider value={{ open, show, hide }}>
      <div ref={ref} className={cn("relative", className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}
