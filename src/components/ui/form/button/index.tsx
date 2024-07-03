"use client";

import { ButtonHTMLAttributes } from "react";
import { Button } from "../../button";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { Spinner } from "@/components/icons/spinner";

export function FormButton({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className={cn("w-full", className)} {...props}>
      {pending ? <Spinner /> : children}
    </Button>
  );
}
