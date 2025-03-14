import React from "react";
import Chat from "./Chat";
import Messages from "./Messages";

const AllChats = () => {
  const chats = new Array(20).fill({
    name: "chat 1",
    lastMessage: "hello",
    lastMessageStatus: "sent",
    lastMessageTimeStamp: "11:02",
  });
  return (
    <div className="flex">
      <div className="overflow-y-auto max-h-[100vh] scrollbar-hide max-w-72 w-full">
        {chats.map((chat) => (
          <Chat chatData={chat} />
        ))}
      </div>
      <div>
        <Messages />
      </div>
    </div>
  );
};

export default AllChats;
