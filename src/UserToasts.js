import React from "react";
import "react-toastify/dist/ReactToastify.css"; // Import CSS
import { toast, ToastContainer } from "react-toastify";

const UserToasts = () => {
  return <ToastContainer />;
};

export const showToast = (message, type = "info", options) => {
  const defaultOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const mergedOptions = { ...defaultOptions, ...options };

  switch (type) {
    case "success":
      toast.success(message, mergedOptions);
      break;
    case "error":
      toast.error(message, mergedOptions);
      break;
    case "warning":
      toast.warn(message, mergedOptions);
      break;
    case "info":
    default:
      toast.info(message, mergedOptions);
      break;
  }
};

export default UserToasts;
