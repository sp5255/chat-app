import axios from "lib/axiosIntstance";
import Chat from "./Chat";
import Messages from "./Messages";

const getAllConversations = async () => {

  const resp = await axios("/conversation/all", {
    method: "GET",
  });
  return resp.data;
};

const AllChats = async () => {
  // const chats = new Array(20).fill({
  //   name: "chat 1",
  //   lastMessage: "hello",
  //   lastMessageStatus: "sent",
  //   lastMessageTimeStamp: "11:02",
  // });

  const chats = await getAllConversations();

  if (!Array.isArray(chats)) {
    // render a error popup
    return <>Error</>;
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
