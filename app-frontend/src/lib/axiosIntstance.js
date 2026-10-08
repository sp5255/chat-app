import axiosConstructor from "axios";
import { redirect } from "next/navigation";

const axios = axiosConstructor.create({
  baseURL: "http://localhost:5500",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

axios.interceptors.request.use(
  async (config) => {
    // const token = await cookieStore.get("token");
    if (typeof window !== "undefined") {
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
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const { status, data, statusText } = error.response || {};
    // console.log('data : ', data)
    return Promise.reject(data);
  }
);

export default axios;
