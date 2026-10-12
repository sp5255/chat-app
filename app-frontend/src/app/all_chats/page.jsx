import ChatContextProvider from "context/chatContextProvider";
import Chat, { NewChatButton } from "./Chat";
import Messages from "./Messages";
import Toast from "@/components/Toast";
import { cookies } from "next/headers";
// import { Fab } from "@mui/material";
import { IoAddCircle } from "react-icons/io5";
import { LuMessageSquarePlus } from "react-icons/lu";

const getAllConversations = async (a) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  // console.log("token on chats", token);

  const resp = await fetch("http://localhost:5500/conversation/all", {
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });
  const data = await resp.json();

  if (!resp.ok) {
    // if (resp.status === 401) cookieStore.delete("token");
    return { error: data.error, status: resp.status };
  }
  return { response: data };
};
/* 
const chatsArr = [
  {
    name: "Chat 1",
    lastMessage: "hey chat 1",
    lastMessageStatus: "sent",
    lastMessageTimeStamp: "11:02",
    id: Math.random() + new Date(),
  },
  {
    name: "Chat 2",
    lastMessage: "hi chat 2",
    lastMessageStatus: "sent",
    lastMessageTimeStamp: "11:02",
    id: Math.random() + new Date(),
  },
  {
    name: "Chat 3",
    lastMessage: "hello chat 3",
    lastMessageStatus: "sent",
    lastMessageTimeStamp: "11:02",
    id: Math.random() + new Date(),
  },
]; */

const AllChats = async () => {

  const { response: chats, error } = await getAllConversations();

  if (error?.message) {
    return <Toast message={error?.message} />;
  }

  return (
    <ChatContextProvider>
      <div className="flex h-[100vh] ">
        <section className="overflow-y-auto max-h-[100vh] relative bg-[#f9fbfc] scrollbar-hide max-w-md w-full flex flex-col gap-2 px-8 py-4 ">
          {Array.isArray(chats) &&
            chats?.map((chat, Idx) => <Chat chatData={chat} key={chat?._id} />)}

          <NewChatButton />
        </section>
        <section className=" h-[inherit] flex-1">
          <Messages chats={chats} />
        </section>
      </div>
    </ChatContextProvider>
  );
};

export default AllChats;
