import { SOCKET_EVENTS } from "@/app/all_chats/constants";
import { SocketContext } from "@/components/SocketProvider";
import { disconnectSocket } from "@/config/socket";
import { ChatContext } from "@/context/ChatContextProvider";
import { fetchUtil } from "@/lib/fetch-utility";
import { useSession } from "next-auth/react";
import { useCallback, useContext, useEffect, useState } from "react";

const getChatMessages = async (conversationId: string) => {
  const data = await fetchUtil(
    "http://localhost:5500/messages/" + conversationId,
  );

  return data;
};

export const useMessages = () => {
  const { data: sessionData }: { data: any } = useSession();

  const { socket } = useContext<any>(SocketContext);
  const { currentChat } = useContext<any>(ChatContext);

  const [messages, setMessages] = useState<any[]>([]);
  const [receivedMessages, setReceivedMessages] = useState<any[]>([]);

  const messageSentEventHandler = useCallback((message: any) => {
    console.log("received msg : ", message);
    setReceivedMessages((prev) => [...prev, message]);
  }, []);

  const receiveMessageEventHandler = useCallback((data: any) => {
    console.log("roomMessage:receive ...", data);
    setReceivedMessages((prev) => [...prev, data]);
  }, []);

  const authErrorHandler = useCallback((msg: any) => {
    console.log("auth error: socket...Please reload page", msg);
  }, []);

  // TODO: can we use use() function to get the messages here
  // Also can we use getChatMessages without server action.

  // TODO: else have some util/commong function and check if we can move over the below pattern
  useEffect(() => {
    (async () => {
      if (currentChat?._id && sessionData?.backendAccessToken) {
        const data = await getChatMessages(currentChat._id);
        setMessages(data?.messages);
        setReceivedMessages([]);
      }
    })();
  }, [currentChat?._id, sessionData?.backendAccessToken]);

  useEffect(() => {
    if (!sessionData?.backendAccessToken || !socket) return () => {};

    console.log("is connected : ", socket.active, socket.connected);

    socket.on(SOCKET_EVENTS.MESSAGE_SENT, messageSentEventHandler);
    socket.on(SOCKET_EVENTS.MESSAGE_RECEIVED, receiveMessageEventHandler);
    socket.on("error:auth", authErrorHandler);

    return () => {
      console.log("unmounting messages...");
      disconnectSocket(socket);
    };
  }, [
    authErrorHandler,
    messageSentEventHandler,
    receiveMessageEventHandler,
    sessionData,
    socket,
  ]);

  return {
    messages,
    receivedMessages,
    currentChat,
  };
};
