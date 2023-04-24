import { useEffect, useRef } from "react";

type AudioProps = {
  volume?: number;
  playbackRate?: number;
  autoplay?: boolean;
  loop?: boolean;
};

export const useAudio = (
  src: string,
  {
    volume = 1,
    playbackRate = 1,
    autoplay = false,
    loop = false,
  }: AudioProps = {}
) => {
  const audio = useRef<HTMLAudioElement | undefined>();

  useEffect(() => {
    audio.current = new Audio(src);
    audio.current.autoplay = autoplay;
    audio.current.loop = loop;
    audio.current.volume = volume;
    let documentHandler: any;
    if (audio.current.autoplay) {
      audio.current.play().catch((err) => {
        if (
          err &&
          err.message.includes("failed because the user didn't interact ")
        ) {
          documentHandler = () => {
            if (audio.current?.autoplay) {
              audio.current.play();
            }
            document.removeEventListener("click", documentHandler);
          };
          document.addEventListener("click", documentHandler);
        }
      });
    }

    return () => {
      audio.current?.pause();
      if (documentHandler) {
        document.removeEventListener("click", documentHandler);
      }
    };
  }, []);

  useEffect(() => {
    if (audio.current) {
      audio.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audio.current) {
      audio.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    if (audio.current) {
      audio.current.autoplay = autoplay;
    }
  }, [autoplay]);

  useEffect(() => {
    if (audio.current) {
      audio.current.loop = loop;
    }
  }, [loop]);

  return audio.current;
};

export default useAudio;
