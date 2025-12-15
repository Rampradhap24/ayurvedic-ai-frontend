import { useState } from "react";

type PushToTalkProps = {
  onStart: () => Promise<void> | void;
  onStop: () => void;
};

export default function PushToTalk({
  onStart,
  onStop
}: PushToTalkProps) {
  const [recording, setRecording] = useState(false);

  const start = async () => {
    try {
      setRecording(true);
      await onStart(); // start recording + Deepgram
    } catch (error) {
      console.error("Failed to start recording", error);
      setRecording(false);
    }
  };

  const stop = () => {
    setRecording(false);
    onStop(); // stop recording + close Deepgram
  };

  return (
    <button
      onPointerDown={start}
      onPointerUp={stop}
      style={{
        padding: "18px 30px",
        fontSize: "18px",
        borderRadius: "12px",
        border: "none",
        cursor: "pointer",
        background: recording ? "#ff3b3b" : "#2e2e2e",
        color: "#ffffff"
      }}
    >
      {recording ? "🎙 Recording..." : "🎤 Hold to Speak"}
    </button>
  );
}