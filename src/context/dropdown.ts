import { createContext, useContext } from "react";

export const DropdownContext = createContext(
  {} as {
    open: boolean;
    show: () => void;
    hide: () => void;
  }
);

export function useDropdownContext() {
  return useContext(DropdownContext);
}
