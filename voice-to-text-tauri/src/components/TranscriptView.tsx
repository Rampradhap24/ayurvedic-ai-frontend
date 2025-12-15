let mediaRecorder: MediaRecorder | null = null;
let audioStream: MediaStream | null = null;

export async function startRecording(
  onAudioChunk: (chunk: Blob) => void
): Promise<void> {
  audioStream = await navigator.mediaDevices.getUserMedia({
    audio: true
  });

  mediaRecorder = new MediaRecorder(audioStream, {
    mimeType: "audio/webm"
  });

  mediaRecorder.ondataavailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      onAudioChunk(event.data);
    }
  };

  mediaRecorder.start(250);
}

export function stopRecording(): void {
  mediaRecorder?.stop();
  audioStream?.getTracks().forEach(track => track.stop());
  mediaRecorder = null;
  audioStream = null;
}