import { useState } from "react";
import PushToTalk from "./components/PushToTalk";
import { startRecording, stopRecording } from "./services/audioService";
import {
  connectDeepgram,
  sendAudio,
  closeDeepgram
} from "./services/deepgramService";

export default function App() {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  /**
   * Start microphone + Deepgram
   */
  const start = async () => {
    if (isRecording) return;

    try {
      console.log("▶️ Starting recording");

      // 1️⃣ Start microphone FIRST
      await startRecording(sendAudio);

      // 2️⃣ Then connect Deepgram
      connectDeepgram((newText: string) => {
        setText(prev => (prev + " " + newText).trim());
      });

      setIsRecording(true);
    } catch (error) {
      console.error("❌ Failed to start recording:", error);
      alert("Microphone access failed. Please check permissions.");
      setIsRecording(false);
    }
  };

  /**
   * Stop microphone + Deepgram
   */
  const stop = () => {
    if (!isRecording) return;

    console.log("⏹ Stopping recording");

    try {
      stopRecording();
      closeDeepgram();
    } catch (error) {
      console.warn("Stop error:", error);
    } finally {
      setIsRecording(false);
    }
  };

  return (
    <div className="app-container">
      <div className="title">Voice to Text</div>
      <div className="subtitle">Hold the button and speak</div>

      <PushToTalk onStart={start} onStop={stop} />

      <div className="transcript-box">
        {text || "Your transcription will appear here..."}
      </div>
    </div>
  );
}