"use server";

import { BASE_URL } from "const";
import axios from "lib/axiosIntstance";
import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export const handleSubmitForm = async (prevState, formData) => {
  const email =  formData.get("email") ;
    const password =  formData.get("password");

  try {
    const { data } = await axios({
      method: "POST",
      url: "/user/sign-in",
      data: {
        email, password
      }
    });
    const { token } = data || "";

    if (!token) {
      return { isAuthenticated: false };
    }
    const cookieStore = await cookies();
    cookieStore.set("token", token);
    return { isAuthenticated: true, email: formData.get("email"), token };
  } catch (e) {
    console.log("error in login util: ", e);
    return { isAuthenticated: false, error: e?.data?.error || e?.data };
  }
};
