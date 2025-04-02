"use server";

import { cookies } from "next/headers";

export const handleSubmitForm = async (prevState, formData) => {
  console.log("submitting..");

  try {
    // const loginPath = "/users/sign-in";
    const loginPath = "http://localhost:5500/user/sign-in";
    const response = await fetch(loginPath, {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { token } = await response.json();
    console.log("resp : ", token);

    if (!token) {
      return { isAuthenticate: false };
    }
    const cookieStore = await cookies();
    cookieStore.set("token", token);
  } catch (e) {
    return { isAuthenticate: false };
  }
  // redirect("/all_chats");
  return { isAuthenticate: true, email: formData.get("email") };
};
