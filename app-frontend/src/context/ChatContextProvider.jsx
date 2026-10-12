"use client";
import { createContext, useState } from "react";

export const ChatContext = createContext({});

const ChatContextProvider = ({ children }) => {
  const [currentChat, setCurrentChat] = useState();
  return (
    <ChatContext.Provider value={{ currentChat, setCurrentChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
