import { ReactNode } from "react";

export enum WebSocketStatus {
  CONNECTING = "CONNECTING",
  CONNECTED = "CONNECTED",
  CLOSED = "CLOSED",
}

export type WebSocketContextType = {
  webSocket: WebSocket | null;
};

export type WebSocketProviderProps = {
  children: ReactNode;
};
