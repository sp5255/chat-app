"use server";

import { fetchUtil } from "@/lib/fetch-utility";
import { cookies } from "next/headers";

export const getChatMessages = async (conversationId: string) => {
  const data = await fetchUtil(
    "http://localhost:5500/messages/" + conversationId,
  );

  console.log("data : ", data);
  return data;
};

export const getUserById = async (userId: string, token: string) => {
  const data = await fetchUtil("http://localhost:5500/user?id=" + userId);

  console.log("get user : ", data);
  return data;
};
