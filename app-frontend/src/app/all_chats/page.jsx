import axios from "lib/axiosIntstance";
import Chat from "./Chat";
import Messages from "./Messages";
import Toast from "@/components/Toast";

const getAllConversations = async () => {
  try {
    const resp = await axios("/conversation/all", {
      method: "GET",
    });

    return { response: resp.data };
  } catch (err) {
    console.log("api error :", err);
    return { error: err.error };
  }
};

const AllChats = async () => {
  // const chats = new Array(20).fill({
  //   name: "chat 1",
  //   lastMessage: "hello",
  //   lastMessageStatus: "sent",
  //   lastMessageTimeStamp: "11:02",
  // });

  const { response: chats, error } = await getAllConversations();

  if (error) return <Toast message={error.message} />;

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
