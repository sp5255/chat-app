"use client";

import { useSession } from "next-auth/react";

import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const initSocket = (token: string) => {
  console.log("token in socket init :", token);
  if (!token) return;

  const socket = io(process.env.NEXT_PUBLIC_NODE_URL, {
    auth: {
      token,
    },
  });
  socket.on("connect", () => {
    console.log("socket connected: ", socket.id); // ojIckSD2jqNzOqIrAGzL
  });
  return socket;
};

export const SocketContext = createContext({
  socket: undefined as Socket | undefined,
});

export const SocketProvider = ({ children }: { children: any }) => {
  const { data: sessionData }: { data: any; status: any } = useSession();

  const socketRef = useRef<Socket | null>(undefined);

  if (!socketRef?.current) {
    socketRef.current = initSocket(sessionData?.backendAccessToken);
  }

  console.log("session data in provider : ", sessionData);
  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};
