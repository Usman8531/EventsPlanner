import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

window.appName = "Event Lab"
window.getRandomId = () => Math.random().toString(36).slice(2);


window.toastify = (msg, type) => {
  switch (type) {
    case "success":
      toast.success(msg);
      break;
    case "error":
      toast.error(msg);
      break;
    case "warning":
      toast.warning(msg);
      break;
    default:
      toast.info(msg);
      break;
  }
  <ToastContainer />;
};
