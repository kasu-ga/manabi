"use client";

import { DropdownContext } from "@/context/dropdown";
import { useClickOutside } from "@/hook/click-outside";
import { cn } from "@/lib/utils";
import { useCallback, useRef, useState } from "react";

export function Dropdown({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const show = useCallback(() => {
    setOpen((o) => !o);
  }, []);
  const hide = useCallback(() => {
    setOpen(false);
  }, []);
  useClickOutside<HTMLDivElement>(ref, hide);
  return (
    <DropdownContext.Provider value={{ open, show, hide }}>
      <div ref={ref} className={cn("relative", className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}
