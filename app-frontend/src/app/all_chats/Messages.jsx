"use client";
import { IconButton, Paper } from "@mui/material";
import { getUser } from "lib/features/auth/authSlice";
import { useContext, useEffect, useState } from "react";
import { BsSendFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { /* getChatMessages, */ getUserById } from "./serverActions";
import { useSession } from "next-auth/react";
import { ChatContext } from "@/context/ChatContextProvider";
import { fetchUtil } from "@/lib/fetch-utility";

const MessageInput = () => {
  return (
    <>
      <div className="flex gap-2 py-2  absolute bottom-0  w-[calc(100%-32px)]">
        <div className=" flex-1 bg-[#f9fbfc] px-4 py-2 rounded-2xl text-sm">
          <input
            type="text"
            placeholder="Type a message here..."
            className="outline-none flex-1 bg-inherit w-full"
          />
        </div>
        <IconButton color="white" className="!bg-[#874ff7] max-h-fit">
          <BsSendFill className="fill-white" size={16} />
        </IconButton>
      </div>
    </>
  );
};

const getChatMessages = async (conversationId) => {
  const data = await fetchUtil({
    url: "http://localhost:5500/messages/" + conversationId,
  });

  console.log("data : ", data);
  return data;
};

const Messages = ({ chats }) => {
  const { data: sessionData, status } = useSession();
  const { currentChat } = useContext(ChatContext);
  const user = useSelector(getUser);
  const foundChat = chats.find((chat) => chat._id === currentChat?._id);
  const [messages, setMessages] = useState([]);
  const [chatParticipantUser, setChatParticipantUser] = useState();

  const chatUserId = currentChat?.participants?.find(
    (participant) => participant !== user?._id,
  );

  // TODO: can we use use() function to get the messages here
  // Also can we use getChatMessages without server action.

  // TODO: else have some util/commong function and check if we can move over the below pattern
  useEffect(() => {
    (async () => {
      if (currentChat?._id && sessionData?.backendAccessToken) {
        const data = await getChatMessages(
          currentChat._id,
          sessionData?.backendAccessToken,
        );
        setMessages(data?.messages);
      }
    })();
  }, [currentChat?._id]);

  useEffect(() => {
    (async () => {
      if (chatUserId && sessionData?.backendAccessToken) {
        const data = await getUserById(
          chatUserId,
          sessionData?.backendAccessToken,
        );
        if (!data.error) setChatParticipantUser(data);
      }
    })();
  }, [chatUserId]);
  // if (!foundChat) return <div>No messages</div>;

  return (
    <>
      <div className="relative h-[inherit] px-4">
        {chatParticipantUser && (
          <Paper sx={{ paddingX: 4, py: 2 }}>
            {" "}
            {chatParticipantUser?.name?.toUpperCase()}{" "}
          </Paper>
        )}
        <div>
          chat here.... {foundChat?.lastMessage}
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
          </ul>
        </div>
        <MessageInput />
      </div>
    </>
  );
};

export default Messages;
