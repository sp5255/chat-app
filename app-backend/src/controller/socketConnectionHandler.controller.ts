import { SOCKET_EVENTS } from "@/constants/socketEvents";
import type { Server, Socket } from "socket.io";

export const socketConnectionHandler = (socket: Socket, io: Server) => {
  console.log("a user connected", socket.id, socket.data);
  if (socket.data.authError) {
    console.log("socket : user auth failed emiting...");
    socket.emit(SOCKET_EVENTS.AUTH_ERROR, "socket user auth failed!");
  }

  socket.on(SOCKET_EVENTS.CHAT_ROOM_JOINED, (chat) => {
    console.log("joining room...", chat);
    socket.join(chat._id);
    socket.emit(SOCKET_EVENTS.CHAT_ROOM_JOINED, {
      chat: chat._id,
      status: "OK",
    });
  });

  socket.on(SOCKET_EVENTS.CHAT_ROOM_LEFT, (chat) => {
    console.log("chatRoom:left");
    socket.leave(chat._id);
    socket.emit(SOCKET_EVENTS.CHAT_ROOM_LEFT, { ...chat, status: "OK" });
  });

  socket.on(SOCKET_EVENTS.MESSAGE_SENT, (message) => {
    const { chatId, content, senderId } = message;
    console.log("room message rec: ", message);
    io.to(chatId).emit(SOCKET_EVENTS.MESSAGE_RECEIVED, {
      ...message,
      status: "OK",
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
};
