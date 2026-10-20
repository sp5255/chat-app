// "use server";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";

// import { redirect } from "next/navigation";

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
    if (!res.ok && res.error)
      return { isAuthenticated: false, error: res.error };

    if (res.ok && !res.error) return { isAuthenticated: true };
  } catch (e) {
    console.log("error in submit form: ", e);
    return {
      isAuthenticated: false,
      error: e?.data?.error || e?.data || e?.message,
    };
  }
};

export const getUserProfile = async () => {
  const { backendAccessToken } = (await getServerSession(authOptions)) || {};
  console.log("backedn access token : ", backendAccessToken);

  const resp = await fetch("http://localhost:5500/user/profile", {
    headers: {
      Authorization: backendAccessToken,
    },
  });

  const data = await resp.json();
  return data;
};
