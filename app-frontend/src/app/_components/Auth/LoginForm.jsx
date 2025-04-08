"use client";
import { addUser } from "lib/features/auth/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleSubmitForm } from "./util";

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(handleSubmitForm, null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (state?.isAuthenticated && !isPending) {
      dispatch(addUser({ email: state?.email }));
      router.replace("/all_chats");
    }
  }, [state?.isAuthenticated, isPending]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-4xl font-extrabold text-center text-gray-800">
          Chatify
        </h2>
        <p className="text-sm text-center text-gray-500">
          Welcome back! Please login to your account.
        </p>
        <form className="space-y-6" action={formAction}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link
            className="font-medium text-blue-600 hover:underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
