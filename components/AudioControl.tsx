import { useContext } from "react";
import { AudioContext } from "../context/AudioContext";

const AudioControl = () => {
  const audioContext = useContext(AudioContext);

  return (
    <button
      className="volume-icon"
      onClick={() => {
        const audioEnabled = audioContext.audioEnabled ? 0 : 1;
        audioContext.setAudioEnabled(audioEnabled);
        localStorage.setItem("blacksand.audioEnabled", `${audioEnabled}`);
      }}
    >
      <img
        src={`/img/${
          audioContext.audioEnabled > 0 ? "unmute" : "mute"
        }-icon.png`}
        width={20}
        height={20}
        alt="Volume Icon"
      />
    </button>
  );
};

export default AudioControl;
