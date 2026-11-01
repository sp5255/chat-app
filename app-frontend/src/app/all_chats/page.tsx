import Toast from "@/components/Toast";
import ChatContextProvider from "@/context/ChatContextProvider";
import { fetchUtil } from "@/lib/fetch-utility";
import Chat, { NewChatButton } from "./Chat";
import Messages from "./Messages";
import { SocketProvider } from "@/components/SocketProvider";

const getAllConversations = async () => {
  const data = await fetchUtil("http://localhost:5500/conversation/all");

  if (data.error) {
    return { ...data, error: data.error };
  }
  return { response: data };
};
const AllChats = async () => {
  const { response: chats, error } = await getAllConversations();

  if (error?.message) {
    return <Toast message={error?.message} />;
  }

  return (
    <SocketProvider>
      <ChatContextProvider>
        <div className="flex h-[100vh] ">
          <section className="overflow-y-auto max-h-[100vh] relative bg-[#f9fbfc] scrollbar-hide max-w-md w-full flex flex-col gap-2 px-8 py-4 ">
            {Array.isArray(chats) &&
              chats?.map((chat, Idx) => (
                <Chat chatData={chat} key={chat?._id} />
              ))}

            <NewChatButton />
          </section>
          <section className=" h-[inherit] flex-1">
            <Messages chats={chats} />
          </section>
        </div>
      </ChatContextProvider>
    </SocketProvider>
  );
};

export default AllChats;
