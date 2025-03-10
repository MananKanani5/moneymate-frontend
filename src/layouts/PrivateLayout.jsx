import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

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
