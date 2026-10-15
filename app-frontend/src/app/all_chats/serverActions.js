"use server";

import { cookies } from "next/headers";

export const getChatMessages = async (conversationId) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log("cookie : ", token);
  const resp = await fetch("http://localhost:5500/messages/" + conversationId, {
    // body: JSON.stringify({ conversationId }),
    // credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  const data = await resp.json();
  console.log("data : ", data);
  return data;
};

export const getUserById = async (userId) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log("cookie : ", token);
  const resp = await fetch("http://localhost:5500/user?id=" + userId, {
    headers: {
      Authorization: token,
    },
  });
  const data = await resp.json();
  console.log("get user : ", data);
  return data;
};
