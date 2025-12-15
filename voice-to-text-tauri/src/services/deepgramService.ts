const API_KEY = '51e129711f56df35cf77621624d7d75689b93f85';

let socket: WebSocket | null = null;

export function connectDeepgram(
  onTranscript: (text: string) => void
): void {
  if (!API_KEY) {
    console.error("Deepgram API key missing");
    return;
  }

  socket = new WebSocket(
    "wss://api.deepgram.com/v1/listen?encoding=opus&sample_rate=16000&punctuate=true&interim_results=true",
    ["token", API_KEY]
  );

  socket.onopen = () => {
    console.log("Deepgram socket opened");
  };

  socket.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);

    const transcript =
      data.channel?.alternatives?.[0]?.transcript;

    if (transcript && transcript.trim() !== "") {
      console.log("Transcript:", transcript);
      onTranscript(transcript);
    }
  };

  socket.onerror = (error) => {
    console.error("Deepgram WebSocket error", error);
  };

  socket.onclose = (event) => {
    console.log("Deepgram socket closed", event.code, event.reason);
  };
}

export function sendAudio(chunk: Blob): void {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(chunk);
  }
}

export function closeDeepgram(): void {
  socket?.close();
  socket = null;
}