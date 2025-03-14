"use client";
import { LiaUserCircleSolid } from "react-icons/lia";

const Chat = ({ chatData }) => {
  const { name, lastMessage, lastMessageTimeStamp, lastMessageStatus } =
    chatData;
  return (
    <div className="flex gap-2 p-4 border-t-[1px] border-secondary-grey w-full items-center hover:bg-secondary-grey hover:cursor-pointer hover:transition-colors">
      <LiaUserCircleSolid size={30} />
      <div className="flex-1">
        <div className="flex justify-between gap-1">
          <p className="chat-name truncate max-w-72">{name}</p>
          <p className="time">{lastMessageTimeStamp}</p>
        </div>
        <div className="flex justify-between gap-1 ">
          <p className="last-message truncate max-w-72">{lastMessage}</p>
          <p className="message-status">{lastMessageStatus}</p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
