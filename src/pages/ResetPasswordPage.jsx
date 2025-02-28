import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassword } from "../api/userApi";
import { AuthContext } from "../context/AuthContext";

const ResetPasswordPage = () => {
  const location = useLocation();
  const userEmail = location.state?.email || "";

  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: userEmail,
    otp: "",
    newPassword: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (userEmail) {
      setFormData((prev) => ({ ...prev, email: userEmail }));
    }
  }, [userEmail]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, otp, newPassword } = formData;

    try {
      const { data } = await resetPassword({ email, otp, newPassword });

      if (data.status) {
        toast.success(data.message || "Password reset successful.");
        navigate("/login");
      } else {
        toast.error(data.message || "Error resetting password.");
      }
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="animate__animated animate__fadeIn">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-xs-12 loginForm mx-auto mt-5 p-md-5 p-4 rounded-4 bg-white">
              <form onSubmit={handleSubmit}>
                <h2 className="fw-bold mb-4 text-center">Reset Password</h2>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="example@gmail.com"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-label="email"
                    required
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="form-control"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    aria-label="otp"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    placeholder="New Password"
                    className="form-control"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    aria-label="newPassword"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPasswordPage;
