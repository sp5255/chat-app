"use client";
import { IconButton } from "@mui/material";
import { ChatContext } from "context/chatContextProvider";
import { useContext } from "react";
import { BsSendFill } from "react-icons/bs";

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

const Messages = ({ chats }) => {
  
  const { currentChat } = useContext(ChatContext);
  const foundChat = chats.find((chat) => chat.id === currentChat?.id);

  // if (!foundChat) return <div>No messages</div>;

  return (
    <>
      <div className="relative h-[inherit] px-4">
        chat here.... {foundChat?.lastMessage}
        <div></div>
        <MessageInput />
      </div>
    </>
  );
};

export default Messages;
