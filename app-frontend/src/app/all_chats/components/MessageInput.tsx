import { SOCKET_EVENTS } from "@/app/all_chats/constants";
import { SocketContext } from "@/components/SocketProvider";
import { ChatContext } from "@/context/ChatContextProvider";
import { IconButton } from "@mui/material";
import { useActionState, useCallback, useContext } from "react";
import { BsSendFill } from "react-icons/bs";

const MessageInput = ({ user }: { user: { _id: string } }) => {
  const { currentChat } = useContext<any>(ChatContext);
  const { socket } = useContext<any>(SocketContext);

  const handleSendMessage = useCallback(
    (_, actionPayload: FormData) => {
      console.log("handle send message : ", actionPayload);
      const formData = actionPayload;
      const message: string = formData.get("message") as string;
      if (message?.length <= 0) return;
      socket.emit(SOCKET_EVENTS.MESSAGE_SENT, {
        content: message,
        chatId: currentChat?._id,
        senderId: user?._id,
      });
    },
    [currentChat?._id, socket, user?._id],
  );

  const [state, formAction, isPending] = useActionState(
    handleSendMessage,
    null,
  );
  return (
    <form action={formAction}>
      <div className="flex gap-2 px-4">
        <div className="flex-1 bg-white px-4 py-2 rounded-2xl text-sm">
          <input
            type="text"
            placeholder="Type a message here..."
            className="outline-none flex-1 bg-inherit w-full"
            name="message"
          />
        </div>
        <IconButton
          //   color="white"
          className="!bg-[#874ff7] max-h-fit"
          type="submit"
        >
          <BsSendFill className="fill-white" size={16} />
        </IconButton>
      </div>
    </form>
  );
};

export default MessageInput;
