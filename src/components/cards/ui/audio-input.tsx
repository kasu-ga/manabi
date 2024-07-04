"use client";

import { AudioIcon } from "@/components/icons/audio";
import { PlayIcon } from "@/components/icons/play";
import { PauseIcon } from "@/components/icons/puase";
import { TrashIcon } from "@/components/icons/trash";
import { HOST_NAME } from "@/lib/consts";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export function CardAudioInput({
  name,
  value: defaultValue,
  translations,
}: {
  name: string;
  translations: {
    "not-selected": string;
  };
  value?: string | null;
}) {
  const [fileName, setFileName] = useState<string>();
  const audio = useRef<HTMLAudioElement | null>(null);
  const [paused, setPaused] = useState(true);
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (!defaultValue) return;
    setUrl(`${HOST_NAME}/assets/${defaultValue}`);
    setFileName(defaultValue);
  }, [defaultValue]);

  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const file = event.target.files ? event.target.files[0] : null;
      if (!file) return;
      setUrl(URL.createObjectURL(file));
      setFileName(file.name);
    },
    []
  );

  const handlePlayAudio: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.stopPropagation();
      event.preventDefault();

      if (audio.current) {
        if (audio.current.paused) {
          audio.current.play();
          setPaused(false);
        } else {
          audio.current.pause();
          setPaused(true);
        }
      }
    },
    []
  );

  const handleDelete: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.stopPropagation();
      event.preventDefault();
      setUrl(undefined);
      audio.current?.pause();
      setPaused(true);
      setFileName(undefined);
    },
    []
  );

  return (
    <label className="relative transition-[border-color] hover:border-rose-500 rounded-xl border-2 border-zinc-200 flex items-center h-12 px-4 gap-4">
      <audio ref={audio} src={url} className="hiddlen absolute"></audio>
      <input
        onChange={handleChangeFile}
        className="hidden absolute"
        type="file"
        accept="audio/mp3"
        name={name}
        placeholder="Audio"
      />
      <div className="relative flex items-center gap-2 flex-1">
        <div className="text-xl">
          <AudioIcon />
        </div>
        <div className="text-zinc-500 w-full line-clamp-1">
          {fileName ?? translations["not-selected"]}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={!url}
          onClick={handlePlayAudio}
          className="grid place-items-center w-8 aspect-square bg-zinc-200/80 text-sm rounded-full disabled:opacity-30"
          type="button"
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
        </button>
        <button
          onClick={handleDelete}
          disabled={!url}
          className="grid place-items-center w-8 aspect-square bg-red-500 text-white text-sm rounded-full disabled:opacity-30"
          type="button"
        >
          <TrashIcon />
        </button>
      </div>
    </label>
  );
}
