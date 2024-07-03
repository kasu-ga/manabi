"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronIcon } from "@/components/icons/chevron";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hook/click-outside";

export interface SelectOptions<T extends Record<string, string>> {
  options: T;
  value: string;
  name: string;
}

export function Select<T extends Record<string, string>>({
  name,
  value: defaultValue,
  options,
}: SelectOptions<T>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const show = useCallback(() => {
    setOpen((n) => !n);
  }, []);
  const hide = useCallback(() => {
    setOpen(false);
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [value]);
  const ref = useClickOutside<HTMLDivElement>(hide);
  return (
    <div ref={ref} className="relative flex items-center">
      <input readOnly className="hidden" name={name} value={value} />
      <div
        onClick={show}
        className="relative border-2 cursor-pointer border-zinc-200 flex items-center justify-between rounded-xl px-4 w-full h-12 outline-none hover:border-rose-500 transition-[border-color]"
      >
        {options[value]}
        <span className="text-xl rotate-90">
          <ChevronIcon />
        </span>
      </div>
      <menu
        className={cn(
          "absolute top-full pt-2 left-0 w-full z-20",
          open ? "" : "hidden"
        )}
      >
        <div className="bg-white relative rounded-xl p-2 shadow-xl border border-zinc-200">
          {Object.keys(options).map((value) => {
            const label = options[value];
            return (
              <li
                key={value}
                className="relative px-3 py-1.5 cursor-pointer text-zinc-500 hover:bg-zinc-200/40 hover:text-zinc-800 transition-[background-color,color] rounded-xl"
                onClick={() => setValue(value)}
              >
                {label}
              </li>
            );
          })}
        </div>
      </menu>
    </div>
  );
}
