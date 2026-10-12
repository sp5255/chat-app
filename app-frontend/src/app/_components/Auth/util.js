"use server";
import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

const NODE_BASE_URL = "http://localhost:5500";

export const handleSubmitForm = async (prevState, actionPayload) => {
  const { isSignUp, formData } = actionPayload;

  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const url = isSignUp ? "user/sign-up" : "user/sign-in";

    const response = await fetch(`${NODE_BASE_URL}/${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await response.json();
    const { token, user, message } = data || {};

    if (!response.ok) return { isAuthenticated: false, error: data };

    if (!token) {
      return { isAuthenticated: false, message: data?.message };
    }
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      path: "/",
      httpOnly: true,
      secure: true,
      // same as BE token
      maxAge: 60 * 60,
    });

    return { isAuthenticated: true, user, message };
  } catch (e) {
    // console.log("error in login util: ", e);
    return {
      isAuthenticated: false,
      error: e?.data?.error || e?.data || e?.message,
    };
  }
};
