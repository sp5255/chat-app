"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addUser, getUser } from "@/lib/features/auth/authSlice";
import { getUserProfile } from "@/components/auth/util";
import { useSession } from "next-auth/react";

const UpdateAuthToRedux = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const session = useSession();
  console.log("updating...", session);

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
      if (session?.data && (!user?.isAuthenticated || !user?.email)) {
        const user = await getUserProfile();
        dispatch(addUser({ isAuthenticated: true, ...user }));
      }
    })();
  }, [dispatch, session?.data, user?.email, user?.isAuthenticated]);
  return <></>;
};

export default UpdateAuthToRedux;
