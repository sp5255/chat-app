import { authOptions } from "@/config/nextAuthConfigOptions";
import { fetchUtil } from "@/lib/fetch-utility";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";

const NODE_BASE_URL = "http://localhost:5500";

export const handleSubmitForm = async (prevState, actionPayload) => {
  const { isSignUp, formData } = actionPayload;

  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      email,
      password,
      name,
      isSignUp,
      redirect: false,
    });
    console.log("response : ", res);
    if (!res) throw new Error("No response recieved");
    if (!res.ok && res.error)
      return { isAuthenticated: false, error: res.error };

    if (res.ok && !res.error) return { isAuthenticated: true };
  } catch (e: any) {
    console.log("error in submit form: ", e);
    return {
      isAuthenticated: false,
      error: e?.data?.error || e?.data || e?.message,
    };
  }
};

export const getUserProfile = async () => {
  const data = await fetchUtil("http://localhost:5500/user/profile");
  return data;
};
