import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPassword } from "../api/userApi";
import { AuthContext } from "../context/AuthContext";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email } = formData;

    try {
      const { data } = await forgotPassword(email);

      if (data.status) {
        toast.success(data.message || "otp sent to your email.");
        navigate("/reset-password", { state: { email } });
      } else {
        toast.error(data.message || "Error Sending otp.");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Error Sending otp.");
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
                <h2 className="fw-bold mb-4 text-center">Forgot Password</h2>
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
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
                <div className="mt-3">
                  <p className="text-center">
                    <span>
                      <Link to="/login">Login Here</Link>
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPasswordPage;
