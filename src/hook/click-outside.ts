import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: (event: MouseEvent | TouchEvent | FocusEvent) => void
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      const target = event.target as Node;

      if (!target || !target.isConnected) {
        return;
      }

      const isOutside = Array.isArray(ref)
        ? ref
            .filter((r) => Boolean(r.current))
            .every((r) => r.current && !r.current.contains(target))
        : ref.current && !ref.current.contains(target);

      if (isOutside) {
        handler(event);
      }
    });
  }, [handler, ref]);
  return ref;
}
