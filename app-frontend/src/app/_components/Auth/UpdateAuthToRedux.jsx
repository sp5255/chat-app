"use client";
import { addUser } from "lib/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const UpdateAuthToRedux = () => {
  const dispatch = useDispatch();
  console.log("updating...");
  useEffect(() => {
    (async () => {
      const token = await cookieStore.get("token");
      if (!token || !token?.value) {
        console.log("dispatching false...");
        dispatch(
          addUser({ isAuthenticated: false, email: "", manual: "dsfjkasd" })
        );
      } else {
        console.log("dispatching true...");
        dispatch(addUser({ isAuthenticated: true, manual: "auth" }));
      }
    })();
  }, [dispatch]);
  return <></>;
};

export default UpdateAuthToRedux;
