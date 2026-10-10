import axios from "lib/axiosIntstance";
import Chat from "./Chat";
import Messages from "./Messages";
import Toast from "@/components/Toast";
import { cookies } from "next/headers";

const getAllConversations = async (a) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log("token on chats", token);
  const resp = await fetch("http://localhost:5500/conversation/all", {
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });
  const data = await resp.json();
  console.log("response : ", resp, data);

  if (!resp.ok) {
    // if (resp.status === 401) cookieStore.delete("token");
    return { error: data.error, status: resp.status };
  }
  return { response: resp.data };
};

const AllChats = async () => {
  // const chats = new Array(20).fill({
  //   name: "chat 1",
  //   lastMessage: "hello",
  //   lastMessageStatus: "sent",
  //   lastMessageTimeStamp: "11:02",
  // });

  const { response: chats, error } = await getAllConversations();

  if (error?.message) {
    return <Toast message={error?.message} />;
  }

  return (
    <div className="flex">
      <div className="overflow-y-auto max-h-[100vh] scrollbar-hide max-w-72 w-full">
        {Array.isArray(chats) &&
          chats?.map((chat) => <Chat chatData={chat} key={chat?.id} />)}
      </div>
      <div>
        <Messages />
      </div>
    </div>
  );
};

export default AllChats;
