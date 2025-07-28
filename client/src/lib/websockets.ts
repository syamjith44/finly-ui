// src/lib/websockets.ts
import { config } from '@/config';

let socket: WebSocket | null = null;

export function connectWebSocket(onMessage: (data: any) => void) {
  if (socket && socket.readyState === WebSocket.OPEN) return;

  const accessToken = localStorage.getItem("access_token");

  socket = new WebSocket(`${config.WS_BASE_URL}/chat/${accessToken}`); // Update host

  socket.onopen = () => {
    console.log("🔌 WebSocket connected");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("📨 WebSocket message received:", data);
    onMessage(data);
  };

  socket.onerror = (error) => {
    console.error("❌ WebSocket error", error);
  };

  socket.onclose = () => {
    console.warn("🔌 WebSocket disconnected");
    socket = null;
  };
}

export function sendMessageWS(message: string) {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ message }));
  } else {
    console.error("❌ WebSocket not connected");
  }
}
