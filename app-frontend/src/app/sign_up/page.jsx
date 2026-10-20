import SignUpForm from "@/components/Auth/SignUpForm";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const SignUp = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/all_chats");
  }
  return <SignUpForm />;
};

export default SignUp;
