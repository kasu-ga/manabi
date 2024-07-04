"use client";

import Image from "next/image";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";

import { ImageIcon } from "@/components/icons/image";
import { TrashIcon } from "@/components/icons/trash";

export function CardImageInput({
  name,
  value: defaultValue,
}: {
  name: string;
  value?: string | null;
}) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!defaultValue) return;
    setUrl(`/assets/${defaultValue}`);
  }, [defaultValue]);

  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const file = event.target.files ? event.target.files[0] : null;
      if (!file) return;
      setUrl(URL.createObjectURL(file));
    },
    []
  );

  const handleDelete: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.stopPropagation();
      event.preventDefault();
      setUrl(null);
    },
    []
  );

  return (
    <div className="relative w-44 aspect-square rounded-xl overflow-hidden mb-4 grid place-items-center bg-zinc-200/50">
      {url ? (
        <Image src={url} fill className="object-cover" alt="Front Image" />
      ) : (
        <span className="text-6xl font-medium">
          <ImageIcon />
        </span>
      )}
      <input
        accept="image/png,image/webp,image/jpg,image/jpeg"
        className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
        type="file"
        onChange={handleChangeFile}
        name={name}
      />
      <button
        onClick={handleDelete}
        disabled={!url}
        className="grid place-items-center w-8 aspect-square bg-red-500 text-white text-sm rounded-full disabled:opacity-0 absolute right-2 top-2"
        type="button"
      >
        <TrashIcon />
      </button>
    </div>
  );
}
