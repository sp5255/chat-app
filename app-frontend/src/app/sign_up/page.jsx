import SignUpForm from "@/components/Auth/SignUpForm";
import React from "react";

const SignUp = () => {
  return <SignUpForm />;
};

export default SignUp;

/* 

TODO: 
* protect /login or /sign-up routes if user is logged in
* user shouldn't access the above routes/pages if already logged in and no invalid token

*/
