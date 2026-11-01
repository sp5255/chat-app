import { SOCKET_EVENTS } from "@/app/all_chats/constants";
import { SocketContext } from "@/components/SocketProvider";
import { ChatContext } from "@/context/ChatContextProvider";
import { useCallback, useContext, useEffect } from "react";

export const useChat = () => {
  const { socket } = useContext(SocketContext);
  const { currentChat, setCurrentChat } = useContext(ChatContext);

  const handleChatClick = useCallback(
    (chatData: any) => {
      console.log("handle chat click : ", socket);
      // TODO: Show toast message here
      if (!socket) return {};
      setCurrentChat((prevChat: any) => {
        if (prevChat?._id) socket.emit(SOCKET_EVENTS.CHAT_ROOM_LEFT, prevChat);

        socket.emit(SOCKET_EVENTS.CHAT_ROOM_JOINED, chatData);
        return chatData;
      });
    },
    [setCurrentChat, socket],
  );

  useEffect(() => {
    if (!socket) return;
    socket.on(SOCKET_EVENTS.CHAT_ROOM_JOINED, (data: any) => {
      console.log("chat joined : ", data);
    });
    socket.on(SOCKET_EVENTS.CHAT_ROOM_LEFT, (data: any) => {
      console.log("chat left...", data);
    });

    return () => {
      socket.off(SOCKET_EVENTS.CHAT_ROOM_JOINED);
      socket.off(SOCKET_EVENTS.CHAT_ROOM_LEFT);
    };
  }, [socket]);

  return { handleChatClick, currentChat };
};
