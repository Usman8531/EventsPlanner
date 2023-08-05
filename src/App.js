import "./App.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import Routes from "./pages/Routes";
import ScreenLoader from "./components/ScreenLoader";
import { ToastContainer } from "react-toastify";
import { useAuthContext } from "contexts/AuthContext";

// import dotenv from "dotenv";
// require("dotenv").config();

function App() {
  // config({
  //   path: ".env",
  // });
  const { isAppLoading } = useAuthContext();

  if (isAppLoading) return <ScreenLoader />;

  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  );
}

export default App;
