import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import { ToastContainer } from "react-toastify";

const PrivateLayout = () => {
  return (
    <div className="private-container">
      <Sidebar />
      <div className="private-content">
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateLayout;
