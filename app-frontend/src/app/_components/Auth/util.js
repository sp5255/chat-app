"use server";

import { BASE_URL } from "const";
import axios from "lib/axiosIntstance";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleSubmitForm = async (prevState, formData) => {
  console.log("submitting..");

  try {
    const { data } = await axios({
      method: "POST",
      url: "/user/sign-in",
      data: {
        email: formData.get("email"),
        password: formData.get("password"),
      },
    });
    const { token } = data || "";

    if (!token) {
      return { isAuthenticated: false };
    }
    const cookieStore = await cookies();
    cookieStore.set("token", token);
  } catch (e) {
    console.log("err in login util: ", e);
    return { isAuthenticated: false, error: e.data?.error || e.data };
  }
  return { isAuthenticated: true, email: formData.get("email") };
};
