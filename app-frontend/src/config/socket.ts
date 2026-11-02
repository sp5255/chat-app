// "use client";
import { io, Socket } from "socket.io-client";

export const initSocket = (token: string) => {
  const socket = io(process.env.NEXT_PUBLIC_NODE_URL, {
    auth: {
      token,
    },
  });
  socket.on("connect", () => {
    console.log("socket : ", socket.id); 
  });
  return socket;
};

export const connectSocket = (socket: Socket) => {
  if (!socket.connected) {
    console.log("connecting socket");
    // socket.connect();
    return;
  }
  console.log("socket already connected");
};

export const disconnectSocket = (socket: Socket) => {
  if (socket.connected) {
    console.log("disconnecting socket");
    socket.disconnect();
  }
};
