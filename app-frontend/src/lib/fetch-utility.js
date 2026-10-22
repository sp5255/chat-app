import { authOptions } from "@/config/nextAuthConfigOptions";

export const fetchUtil = async ({ url, body, method = "GET", options }) => {
  let token = "";
  try {
    // when used in client components
    if (typeof window !== "undefined") {
      const { getSession } = await import("next-auth/react");
      const session = await getSession();
      console.log("client session : ", session);
      token = session.backendAccessToken;
    } else {
      // when used in server components
      const { getServerSession } = await import("next-auth");
      const session = await getServerSession(authOptions);
      console.log("server session : ", session);
      token = session.backendAccessToken;
    }

    const response = await fetch(url, {
      method,
      body,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        ...options,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { ...data, status: response.status }; // assuming data.error
    }
    return data;
  } catch (e) {
    return { error: e };
  }
};
