import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

export function Button({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "relative rounded-xl bg-rose-500 hover:bg-rose-600/90 transition-[background-color] text-white h-12 uppercase font-semibold grid place-items-center",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
