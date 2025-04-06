import axiosConstructor from "axios";
import { redirect } from "next/navigation";

const axios = axiosConstructor.create({
  baseURL: "http://localhost:5500",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

axios.interceptors.request.use(
  async function (config) {
    if (typeof window !== "undefined") {
      const token = await cookieStore.get("token");
      config.headers.Authorization = token?.value;
    } else {
      /* add token to header for server side */
      const nextCookies = import("next/headers");
      const { cookies } = await nextCookies;
      const cookieStore = await cookies();
      const token = cookieStore.get("token");
      config.headers.Authorization = token?.value;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  async function (response) {
    if (response.status === 401) {
      cookieStore.delete("token");
    }
    return response;
  },
  async function (error) {
    const { status, data } = error.response || {};
    if (status === 401 && typeof window !== "undefined") {
      cookieStore.delete("token");
    } else if (status === 401) {
      // console.log("axios redirect");
      redirect("/login");
    }
    return Promise.reject(error.response);
  }
);

export default axios;
