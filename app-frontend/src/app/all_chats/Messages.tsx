"use client";
import { IconButton, Paper } from "@mui/material";

import { SOCKET_EVENTS } from "@/app/all_chats/constants";
import { ChatContext } from "@/context/ChatContextProvider";
import { useMessages } from "@/hooks/useMessages";
import { getUser } from "@/lib/features/auth/authSlice";
import { useActionState, useCallback, useContext } from "react";
import { BsSendFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { SocketContext } from "@/components/SocketProvider";

const MessageInput = ({ user }: { user: { _id: string } }) => {
  const { currentChat } = useContext<any>(ChatContext);
  const { socket } = useContext<any>(SocketContext);

  const handleSendMessage = useCallback(
    (e, actionPayload: FormData) => {
      console.log("handle send message : ", actionPayload);
      const formData = actionPayload;
      const message = formData.get("message");

      socket.emit(SOCKET_EVENTS.MESSAGE_SENT, {
        content: message,
        chatId: currentChat?._id,
        senderId: user?._id,
      });
    },
    [currentChat?._id, socket, user?._id],
  );

  const [state, formAction, isPending] = useActionState(
    handleSendMessage,
    null,
  );
  return (
    <form action={formAction}>
      <div className="flex gap-2 py-2  absolute bottom-0  w-[calc(100%-32px)]">
        <div className=" flex-1 bg-[#f9fbfc] px-4 py-2 rounded-2xl text-sm">
          <input
            type="text"
            placeholder="Type a message here..."
            className="outline-none flex-1 bg-inherit w-full"
            name="message"
          />
        </div>
        <IconButton
          color="white"
          className="!bg-[#874ff7] max-h-fit"
          type="submit"
        >
          <BsSendFill className="fill-white" size={16} />
        </IconButton>
      </div>
    </form>
  );
};

const Messages = ({ chats }) => {
  const user = useSelector(getUser);
  const { messages, receivedMessages, currentChat } = useMessages();
  // const foundChat = chats.find((chat) => chat._id === currentChat?._id);

  // if (!foundChat) return <div>No messages</div>;

  return (
    <>
      <div className="relative h-[inherit] px-4">
        <Paper sx={{ paddingX: 4, py: 2 }}>
          {currentChat?.name?.toUpperCase()}{" "}
        </Paper>

        <div>
          <h2>Messages....{currentChat?._id} </h2>
          <ul className="flex flex-col">
            {messages?.map((message) => (
              <li
                key={message._id}
                className={message.senderId === user?._id ? "self-end" : ""}
              >
                {message.message}
              </li>
            ))}
            {receivedMessages.map((message, index) => (
              <li
                key={index}
                className={message.senderId === user?._id ? "self-end" : ""}
              >
                {message.content}
              </li>
            ))}
          </ul>
        </div>
        <MessageInput user={user} />
      </div>
    </>
  );
};

export default Messages;
