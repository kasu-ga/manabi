"use client";

import { ReactEventHandler, useCallback, useRef, useState } from "react";

import { PlayIcon } from "@/components/icons/play";
import { PauseIcon } from "@/components/icons/puase";
import { HOST_NAME } from "@/lib/consts";

export function AudioPlayer({ src }: { src: string }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [paused, setPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const handlePauseClick = useCallback(() => {
    if (ref.current?.paused) {
      setPaused(false);
      ref.current.play();
      return;
    }
    setPaused(true);
    ref.current?.pause();
  }, []);
  const handleTimeUpdate: ReactEventHandler<HTMLAudioElement> =
    useCallback(() => {
      if (!ref.current) return;
      const { currentTime, duration } = ref.current;
      setCurrentTime(currentTime);
      setDuration(duration);
    }, []);
  const handleOnLoad = useCallback(() => {
    console.log(ref.current);
    if (!ref.current) return;
    const { currentTime } = ref.current;
    setCurrentTime(currentTime);
  }, []);
  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!ref.current) return;
    const newPosition = parseFloat(e.target.value);
    ref.current.currentTime = newPosition;
  }, []);
  const handleOnEnded = useCallback(() => {
    if (!ref.current) return;
    ref.current.pause();
    ref.current.currentTime = 0;
    setPaused(true);
  }, []);
  return (
    <div className="flex items-center gap-1.5 w-full max-w-[12em] border border-zinc-200 bg-zinc-50 rounded-xl shadow-sm h-8 px-2.5">
      <audio
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleOnLoad}
        onEnded={handleOnEnded}
        ref={ref}
        className="hidden"
        src={`${HOST_NAME}/assets/${src}`}
      />
      <button onClick={handlePauseClick}>
        {paused ? <PlayIcon /> : <PauseIcon />}
      </button>
      <span className="relative flex-1 h-2 flex items-center">
        <span className="w-full h-full relative bg-zinc-300 rounded-full overflow-hidden">
          <span
            style={{
              width: `${(100 / duration) * currentTime}%`,
            }}
            className="h-full absolute bg-rose-500"
          ></span>
        </span>
        <input
          disabled={duration === 0}
          className="w-full h-full appearance-none bg-transparent absolute cursor-pointer opacity-0 hover:opacity-100 disabled:hover:opacity-0 disabled:cursor-default"
          type="range"
          min={0}
          onChange={handleSeek}
          max={duration}
          value={currentTime}
        />
      </span>
    </div>
  );
}
