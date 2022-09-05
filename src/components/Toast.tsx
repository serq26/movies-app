import React from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

export const Toast = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    const handleCloseAlert = (
        event?: React.SyntheticEvent | Event,
        reason?: string
      ) => {
        if (reason === "clickaway") {
          return;
        }
      };
    return <MuiAlert elevation={6} ref={ref} variant="filled" onClose={handleCloseAlert} {...props} />;
  }
);
