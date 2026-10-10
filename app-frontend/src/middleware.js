import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside

export async function middleware(request) {
  const protectedRoutes = ["/about", "/all_chats"]; //["/check"];
  // const reCook = request?.cookies.get("token");
  // console.log("re cook : ", reCook);
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  console.log("request : ", token);

  // we can rely on it because the maxAge property removed the token itself from the cookie after the given duration
  if (["/login", "/sign_up"].includes(request.nextUrl.pathname) && token?.value)
    return NextResponse.redirect(new URL("/all_chats", request.url));

  if (protectedRoutes.includes(request.nextUrl.pathname) && !token?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/login",
// };
