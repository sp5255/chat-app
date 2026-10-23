import { authOptions } from "@/config/nextAuthConfigOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
