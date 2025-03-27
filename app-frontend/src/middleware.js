import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside

export async function middleware(request) {
  const protectedRoutes = ["/about", "/all_chats"]; //["/check"];
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  // console.log("request : ", token);

  if (protectedRoutes.includes(request.nextUrl.pathname) && !token?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/login",
// };
