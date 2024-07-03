import React, { createContext, useEffect, useState } from "react";

import { WebSocketContextType, WebSocketProviderProps, WebSocketStatus } from "./types";

export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [status, setStatus] = useState<WebSocketStatus>(WebSocketStatus.CLOSED);

  useEffect(() => {
    if (
      status === WebSocketStatus.CONNECTING ||
      status === WebSocketStatus.CONNECTED
    ) {
      return;
    }

    setStatus(WebSocketStatus.CONNECTING);

    const socket = new WebSocket(`ws://localhost:4002`);

    socket.addEventListener("open", () => {
      setStatus(WebSocketStatus.CONNECTED);
    });
    socket.addEventListener("close", () => {
      setTimeout(() => setStatus(WebSocketStatus.CLOSED), 5000);
    });

    setWebSocket(socket);
  }, [status, webSocket]);

  useEffect(() => {
    return () => {
      webSocket?.close();
    };
  }, [webSocket]);

  const value: WebSocketContextType = {
    webSocket,
  };

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
};
