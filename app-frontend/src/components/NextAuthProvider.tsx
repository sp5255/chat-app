"use client";
import { SessionProvider } from "next-auth/react";
import { ReactElement, ReactNode } from "react";

export const NextAuthProvider   = ({ children } : {children: ReactNode}) => {
  return <SessionProvider>{children}</SessionProvider>;
};
