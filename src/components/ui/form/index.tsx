"use client";

import { useFormState } from "react-dom";
import { FormContext, FormState } from "./context";
import { cn } from "@/lib/utils";

export type FormSubmitAction = (
  formState: FormState,
  formData?: FormData
) => Promise<FormState>;

export interface FormProps {
  className?: string;
  submit: FormSubmitAction;
  children: React.ReactNode;
}

export function Form({ submit, className, children }: FormProps) {
  const [state, action] = useFormState<FormState>(submit, {});
  return (
    <FormContext.Provider value={state}>
      <form action={action} className={cn("flex flex-col gap-4", className)}>
        {state.errors?.root ? (
          <p className="bg-red-500 text-white grid place-items-center rounded-xl h-10 px-6 mt-4 uppercase text-sm font-semibold">
            {state.errors.root}
          </p>
        ) : null}
        {children}
      </form>
    </FormContext.Provider>
  );
}
