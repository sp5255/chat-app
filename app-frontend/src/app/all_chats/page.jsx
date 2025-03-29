import { BASE_URL } from "const";
import Chat from "./Chat";
import Messages from "./Messages";
import { cookies } from "next/headers";

const getAllConversations = async () => {
  const cookieStore = await cookies();

  const resp = await fetch(BASE_URL + "/conversation/all", {
    method: "GET",
    headers: {
      Authorization: `${cookieStore.get("token")?.value}`,
      "Content-Type": "application/json", // Opti
    },
  });
  if (resp.ok) {
    const chats = await resp.json();
    return chats;
  }
  return;
};

const AllChats = async () => {
  // const chats = new Array(20).fill({
  //   name: "chat 1",
  //   lastMessage: "hello",
  //   lastMessageStatus: "sent",
  //   lastMessageTimeStamp: "11:02",
  // });

  const chats = await getAllConversations();
  console.log("chats : ", chats);

  if (!Array.isArray(chats)) {
    // render a error popup
  }
  return (
    <div className="flex">
      <div className="overflow-y-auto max-h-[100vh] scrollbar-hide max-w-72 w-full">
        {Array.isArray(chats) && chats?.map((chat) => <Chat chatData={chat} />)}
      </div>
      <div>
        <Messages />
      </div>
    </div>
  );
};

export default AllChats;
