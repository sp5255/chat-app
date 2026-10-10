"use server";

import { BASE_URL } from "const";
import axios from "lib/axiosIntstance";
import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export const handleSubmitForm = async (prevState, formData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    // const { data } = await axios({
    //   method: "POST",
    //   url: name ?  "/user/sign-up" : "/user/sign-in",
    //   data: {
    //     email, password, name
    //   }
    // });
    const response = await fetch("http://localhost:5500/user/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    const { token, user } = data || {};

    if (!response.ok) return { isAuthenticated: false, error: data };

    if (!token) {
      return { isAuthenticated: false };
    }
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      path: "/",
      httpOnly: true,
      secure: true,
      // same as BE token
      maxAge: 30,
    });

    return { isAuthenticated: true, user };
  } catch (e) {
    console.log("error in login util: ", e);
    return { isAuthenticated: false, error: e?.data?.error || e?.data };
  }
};
