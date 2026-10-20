import { authOptions } from "@/config/nextAuthConfigOptions";
import SignUpForm from "@/components/auth/SignUpForm";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignUp = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/all_chats");
  }
  return <SignUpForm />;
};

export default SignUp;
