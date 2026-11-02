import { authOptions } from "@/config/nextAuthConfigOptions";

export const fetchUtil = async (
  url: Request | string,
  options?: RequestInit,
) => {
  let token = "";
  try {
    const { body, method = "GET", headers: headerOptions } = options || {};
    // when used in client components
    if (typeof window !== "undefined") {
      const { getSession } = await import("next-auth/react");
      const session: any = await getSession();
      console.log("client session : ", session);
      token = session?.backendAccessToken;
    } else {
      // when used in server components
      const { getServerSession } = await import("next-auth");
      const session: any = await getServerSession(authOptions);
      console.log("server session : ", session);
      token = session?.backendAccessToken;
    }

    const response = await fetch(url, {
      method,
      body,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        ...headerOptions,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (typeof window !== "undefined" && response.status === 401) {
        const toastClientEvent = new CustomEvent("toast-error", {
          detail: { ...data, status: response.status },
        });
        window.dispatchEvent(toastClientEvent);
      }
      return { ...data, status: response.status }; // assuming data.error
    }
    return data;
  } catch (e) {
    return { error: e };
  }
};
