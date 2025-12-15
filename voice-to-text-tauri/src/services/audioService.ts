let mediaRecorder: MediaRecorder | null = null;
let audioStream: MediaStream | null = null;

function getUserMediaSafe(): Promise<MediaStream> {
  if (navigator.mediaDevices?.getUserMedia) {
    return navigator.mediaDevices.getUserMedia({ audio: true });
  }

  // 🔥 Fallback for older WebView
  const legacyGetUserMedia =
    (navigator as any).getUserMedia ||
    (navigator as any).webkitGetUserMedia ||
    (navigator as any).mozGetUserMedia;

  if (!legacyGetUserMedia) {
    return Promise.reject(
      new Error("getUserMedia not supported in this environment")
    );
  }

  return new Promise((resolve, reject) => {
    legacyGetUserMedia.call(
      navigator,
      { audio: true },
      resolve,
      reject
    );
  });
}

export async function startRecording(
  onAudioChunk: (chunk: Blob) => void
): Promise<void> {
  try {
    console.log("🎤 Requesting microphone access");

    audioStream = await getUserMediaSafe();

    console.log("✅ Microphone access granted");

    mediaRecorder = new MediaRecorder(audioStream, {
      mimeType: "audio/webm;codecs=opus"
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        onAudioChunk(event.data);
      }
    };

    mediaRecorder.start(250);
  } catch (err) {
    console.error("🎤 Microphone error:", err);
    throw err;
  }
}

export function stopRecording(): void {
  try {
    mediaRecorder?.stop();
    audioStream?.getTracks().forEach(track => track.stop());
  } catch {}

  mediaRecorder = null;
  audioStream = null;
}