import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import { AuthContext } from "../context/AuthContext";
import { updateUser } from "../api/userApi";

const AccountPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const { setIsAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    password: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await updateUser({
        id: user.id,
        userData: formData,
        token: localStorage.getItem("token"),
      });

      if (data?.status) {
        toast.success("User Updated successfully!");
        localStorage.setItem("user", JSON.stringify(data?.data));
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...data?.data,
          password: "",
        }));
        navigate("/my-account");
      } else {
        toast.error(data?.message || "Update failed.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setIsAuthenticated(false);
  };

  const handletoggleIcon = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <div className="bg-primary mob-bg d-none"></div>
      <main className="animate__animated animate__fadeIn dash">
        <div className="d-none mob-block position-relative text-center text-white my-4">
          <h2>My Account</h2>
        </div>
        <div className="grids mt-2">
          <div className="account widItem pt-5 mob-pt-1 pb-5 px-5 mob-px-3 z-3 card-custom">
            <div className="mb-5 mob-mb-3 d-flex mob-flex-col align-items-center gap-3">
              <div className="user-img ">
                <img
                  src="https://dummyimage.com/90x90/00519d/ffffff.jpg"
                  className="img-fluid rounded-pill shadow-lg"
                  alt="User"
                  lazyLoad=""
                />
              </div>

              <div className="user-con">
                <h3 className="m-0">{`${user.firstName} ${user.lastName}`}</h3>
                <h5 className="fw-light">{user.email}</h5>
              </div>
            </div>
            <form
              className="d-flex flex-column gap-3 mb-3"
              onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="col-md-6 col-12">
                  <label htmlFor="firstName" className="form-label fw-semibold">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    aria-label="firstName"
                  />
                </div>
                <div className="col-md-6 col-12 mt-3 mt-md-0">
                  <label htmlFor="lastName" className="form-label fw-semibold">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    aria-label="lastName"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="form-label fw-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-label="email"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="form-label fw-semibold">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  aria-label="phoneNumber"
                />
              </div>

              <label htmlFor="password" className="fw-semibold">
                Password
              </label>
              <div className="input-group flex-nowrap">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
