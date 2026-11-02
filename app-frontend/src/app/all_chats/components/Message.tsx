const Message = ({
  content,
  id,
  senderId,
  userId,
}: {
  content: string;
  id?: string;
  senderId: string;
  userId: string;
}) => {
  return (
    <li
      className={`  max-w-96 w-fit px-3 py-2 rounded-xl ${senderId === userId ? "self-end bg-[linear-gradient(45deg,_#7441e9,_#c486ed)] text-white" : "bg-[#e7eff7]"}`}
    >
      {content}
    </li>
  );
};

export default Message;
