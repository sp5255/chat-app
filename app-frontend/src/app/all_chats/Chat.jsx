"use client";
import { ChatContext } from "@/context/ChatContextProvider";
import { Avatar, Box, Fab, Modal, Paper, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { LuMessageSquarePlus } from "react-icons/lu";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0]?.[0]}`,
  };
}

const Chat = ({ chatData }) => {
  const { name, lastMessage, lastMessageTimeStamp, id, lastMessageStatus } =
    chatData;

  const { currentChat, setCurrentChat } = useContext(ChatContext);

  return (
    <Paper
      className="flex gap-2 p-4 w-full items-center hover:bg-secondary-grey hover:cursor-pointer hover:transition-colors "
      elevation={3}
      onClick={() => setCurrentChat(chatData)}
      sx={{
        background: currentChat?.id === id ? "#cccccc63" : "",
        borderRadius: 4,
      }}
    >
      <Avatar {...stringAvatar(name?.toUpperCase())} />
      <div className="flex-1">
        <div className="flex justify-between gap-1">
          <Typography variant="subtitle2" className="uppercase">
            {name}
          </Typography>
          <Typography variant="caption">{lastMessageTimeStamp}</Typography>
        </div>
        <div className="flex justify-between gap-1 ">
          <Typography
            variant="caption"
            className="last-message truncate max-w-72"
          >
            {lastMessage}
          </Typography>
          {/* <p className="message-status">{lastMessageStatus}</p> */}
        </div>
      </div>
    </Paper>
  );
};

export default Chat;

const NewParticipatnModal = ({ open, handleClose }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </div>
      </Modal>
    </>
  );
};

export const NewChatButton = () => {
  const [openParticipantsModal, setParticipantsModal] = useState(false);

  return (
    <>
      <NewParticipatnModal
        open={openParticipantsModal}
        handleClose={() => setParticipantsModal(false)}
      />
      <Fab
        color="secondary"
        aria-label="add"
        sx={{ position: "absolute", bottom: 32, right: 32 }}
        onClick={() => setParticipantsModal(true)}
      >
        <LuMessageSquarePlus size={26} />
      </Fab>
    </>
  );
};
