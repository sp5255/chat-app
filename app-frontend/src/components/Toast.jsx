"use client";
import { Alert, Snackbar } from "@mui/material";
import { redirect } from "next/navigation";

import { useEffect, useState } from "react";

const hideDuration = 2000;

const Toast = ({ message, variant = "error", shouldRedirect = true }) => {
  const [showToast, setShowToast] = useState(message && variant);

  // useEffect(() => {
  //   const t = setTimeout(() => {
  //     message && variant && shouldRedirect && redirect("/login");
  //   }, hideDuration);
  //   return () => clearTimeout(t);
  // }, []);

  return message && variant ? (
    <Snackbar
      open={showToast}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={2000}
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
        {message}
      </Alert>
    </Snackbar>
  ) : (
    <></>
  );
};

const ToastMessage = ({ message, variant }) => {
  <Toast message={message} variant={variant} />;
};

export default Toast;
