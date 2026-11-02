"use client";
import { useSelector } from "react-redux";

import Message from "@/app/all_chats/components/Message";
import MessageInput from "@/app/all_chats/components/MessageInput";
import { useMessages } from "@/hooks/useMessages";
import { getUser } from "@/lib/features/auth/authSlice";

const MessagesSection = () => {
  const user = useSelector(getUser);
  const { messages, receivedMessages, currentChat, messagesContainerRef } =
    useMessages();

  // const foundChat = chats.find((chat) => chat._id === currentChat?._id);

  // if (!foundChat) return <div>No messages</div>;

  if (!currentChat?._id) {
    return (
      <div className="flex flex-col justify-center items-center h-[inherit] gap-2 pb-1 bg-[#f9fbfc]">
        <p>Open some conversation to see the messages</p>
        <p>Messages will appear here....</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-[inherit] gap-2 pb-1 bg-[#f9fbfc]">
        {currentChat?._id && (
          <div className="px-4 py-2 shadow-md">
            <p>{currentChat?.name?.toUpperCase()} </p>
          </div>
        )}
        <div
          className="overflow-y-auto max-h-[calc(100vh-36px)] h-full [scrollbar-width:none] px-4"
          ref={messagesContainerRef}
        >
          {messages?.length <= 0 && (
            <div className="flex flex-col items-center justify-center h-[inherit]">
              <p> No messages! </p>
              <p> Start conversation...</p>
            </div>
          )}

          <ul className="flex flex-col gap-1 ">
            {messages?.map((message, idx) => (
              <Message
                key={message?._id}
                content={message.message}
                senderId={message.senderId}
                userId={user?._id}
              />
            ))}
            {receivedMessages.map((message, index) => (
              <Message
                key={message?._id || index}
                content={message.content}
                senderId={message.senderId}
                userId={user?._id}
              />
            ))}
          </ul>
        </div>
        {currentChat?._id && <MessageInput user={user} />}
      </div>
    </>
  );
};

export default MessagesSection;
