import { useContext, useEffect } from "react";

import { WebSocketContext } from "./WebSocketProvider";

export const useWebSocket = <T>(
  onMessage: (data: T) => void,
) => {
  const context = useContext(WebSocketContext);

  useEffect(() => {
    const handleMessage = (e: MessageEvent<string>) => {
      const data: T = JSON.parse(e.data);
    };

    context?.webSocket?.addEventListener("message", handleMessage);

    return () => {
      context?.webSocket?.removeEventListener("message", handleMessage);
    };
  }, [context, onMessage]);

  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
