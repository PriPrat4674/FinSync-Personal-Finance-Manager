import "react-toastify/dist/ReactToastify.css"; // Import CSS
import { toast } from "react-toastify";

function Toasts(message, type = "info", options) {
  const defaultOptions = {
    position: "top-right",
    autoClose: 3000,
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
}

export default Toasts;
