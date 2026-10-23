import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET,
});

export const config = { matcher: ["/all_chats"] };
