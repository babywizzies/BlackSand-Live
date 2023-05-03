import { createContext } from "react";

export const AudioContext = createContext<{
  audioEnabled: number;
  setAudioEnabled: (audioEnabled: number) => void;
}>({
  audioEnabled: 1,
  setAudioEnabled: () => {},
});
