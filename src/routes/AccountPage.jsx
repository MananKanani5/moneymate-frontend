import React, { useEffect, useContext, useState } from "react";
import AfterNavbar from "../components/AfterNavbar";
import { useNavigate } from "react-router-dom";
import AddExpense from "../components/AddExpense";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  RiEyeLine,
  RiEyeOffLine,
  RiIdCardLine,
  RiKey2Line,
  RiMailLine,
  RiUser3Line,
} from "@remixicon/react";
import { AuthContext } from "../AuthContext";

const AccountPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogout = async () => {
    await axios.get(`${apiUrl}/logout`, {
      withCredentials: true,
    });
    logout();
    navigate("/login");
  };

  const handletoggleIcon = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <AfterNavbar />
      <AddExpense />
      <ToastContainer position="bottom-right" newestOnTop={true} pauseOnHover />
      <div className="bg-primary mob-bg d-none"></div>
      <main className="animate__animated animate__fadeIn dash">
        <div className="d-none mob-block position-relative text-center text-white my-4">
          <h2>My Account</h2>
        </div>
        <div className="grids mt-2">
          <div className="account widItem pt-5 mob-pt-1 pb-5 px-5 mob-px-3 z-3 card-custom">
            <div className="mb-5 mob-mb-3 d-flex mob-flex-col align-items-center gap-3">
              <img
                src="https://dummyimage.com/150x150/00519d/ffffff.jpg"
                className="img-fluid rounded-pill user-img"
                alt="User"
              />
              <div className="user-con">
                <h3 className="m-0">{user.username}</h3>
                <h5 className="fw-light">@{user.username}</h5>
              </div>
            </div>
            <form
              method="POST"
              action="/my-account?_method=PATCH"
              className="d-flex flex-column gap-3 mb-3"
            >
              <div className="input-group flex-nowrap">
                <span className="input-group-text">
                  <RiUser3Line />
                </span>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={user.name}
                  aria-label="name"
                />
              </div>
              <div className="input-group flex-nowrap">
                <span className="input-group-text">
                  <RiIdCardLine />
                </span>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={user.username}
                  aria-label="Username"
                />
              </div>
              <div className="input-group flex-nowrap">
                <span className="input-group-text">
                  <RiMailLine />
                </span>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={user.email}
                  aria-label="email"
                />
              </div>
              <div className="input-group flex-nowrap">
                <span className="input-group-text">
                  <RiKey2Line />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form-control"
                  aria-label="password"
                  placeholder="Change Password"
                />
                <span
                  className="input-group-text toggle-password"
                  onClick={handletoggleIcon}
                >
                  {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
                </span>
              </div>

              <button
                type="submit"
                className="btn btn-primary fw-semibold mt-2"
              >
                {" "}
                Update Details
              </button>
            </form>

            <button
              onClick={handleLogout}
              className="btn btn-danger fw-semibold text-center w-100"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default AccountPage;
