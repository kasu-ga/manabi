import { createContext, useContext } from "react";

export type FormErrors = Record<string, string>;

export interface FormState {
  status?: "pending" | "success" | "error";
  message?: string;
  errors?: FormErrors;
}

export const FormContext = createContext({} as FormState);

export function useFormContext() {
  return useContext(FormContext);
}
