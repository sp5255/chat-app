"use client";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

import { useEffect, useState } from "react";

interface ToastProps{
  message?: string, 
  variant?: AlertColor,
  shouldRedirect?: boolean
}
const hideDuration = 2000;

const Toast = ({ message, variant = "error", shouldRedirect = true }: ToastProps) => {
  const [showToast, setShowToast] = useState<boolean>(Boolean(message && variant));
  const [errorMsg, setErrorMsg] = useState("");

  // useEffect(() => {
  //   const t = setTimeout(() => {
  //     message && variant && shouldRedirect && redirect("/login");
  //   }, hideDuration);
  //   return () => clearTimeout(t);
  // }, []);

  useEffect(() => {
    const handleCustomToastEvent = (e: any) => {
     
      setShowToast(true);
      setErrorMsg(e.detail?.error?.message);

      //logout and will handle redirect to login page automatically 
      if (e.detail?.status === 401) {
        const t = setTimeout(() => {
          clearTimeout(t);
          signOut();
        }, hideDuration);
      }
    };
    window.addEventListener("toast-error", handleCustomToastEvent);
    return () => {
    
      window.removeEventListener("toast-error", handleCustomToastEvent);
    };
  });

  return (message && variant) || errorMsg ? (
    <Snackbar
      open={showToast}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={hideDuration}
      onClose={() => setShowToast(false)}
      // message={response.error?.message}
      // action={action}
    >
      <Alert
        // onClose={handleClose}
        severity={variant}
        // variant="filled"
        sx={{ width: "100%" }}
      >
        {message || errorMsg}
      </Alert>
    </Snackbar>
  ) : (
    <></>
  );
};

// const ToastMessage = ({ message, variant }) => {
//   <Toast message={message} variant={variant} />;
// };

export default Toast;
