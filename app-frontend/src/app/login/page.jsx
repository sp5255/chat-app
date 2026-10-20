import LoginForm from "@/components/Auth/LoginForm";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Login = async (req) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/all_chats");
  }
  return <LoginForm />;
};

export default Login;
