"use client";
import { addUser, getUser } from "lib/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./util";

const UpdateAuthToRedux = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  // console.log("updating...");

  // useEffect(() => {
  //   (async () => {
  //     const token = await cookieStore.get("token");
  //     if (!token || !token?.value) {
  //       console.log("dispatching false...");
  //       dispatch(
  //         addUser({ isAuthenticated: false, email: "", manual: "dsfjkasd" })
  //       );
  //     } else {
  //       console.log("dispatching true...");
  //       dispatch(addUser({ isAuthenticated: true, manual: "auth" }));
  //     }
  //   })();
  // }, [dispatch]);

  useEffect(() => {
    (async () => {
      if (!user?.isAuthenticated) {
        const user = await getUserProfile();
        dispatch(addUser({ isAuthenticated: true, ...user }));
      }
    })();
  }, []);
  return <></>;
};

export default UpdateAuthToRedux;
