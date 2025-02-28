import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { ToastContainer } from "react-toastify";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
