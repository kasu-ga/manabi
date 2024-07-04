"use client";

import {
  ChangeEventHandler,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";

import { cn } from "@/lib/utils";
import { useFormContext } from "../context";

export function Input({
  className,
  value: defaultValue,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const [value, setValue] = useState<string>((defaultValue as string) ?? "");
  const [error, setError] = useState<string>();
  const { errors } = useFormContext();

  const clearError = useCallback(() => setError(undefined), []);
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setValue(e.target.value),
    []
  );

  useEffect(() => {
    if (props.name) {
      setError(errors?.[props.name.toLowerCase()]);
    }
  }, [errors, props.name]);
  return (
    <div className="w-full">
      <input
        className={cn(
          "relative border-2 border-zinc-200 rounded-xl px-4 w-full h-12 outline-none focus:border-rose-500 transition-[border-color]",
          className
        )}
        onFocus={clearError}
        onChange={handleChange}
        value={value}
        {...props}
      />
      {error ? (
        <p className="text-xs text-red-500 uppercase font-medium mt-1 ml-1">
          {error}
        </p>
      ) : null}
    </div>
  );
}
