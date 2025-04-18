import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../api/userApi";
import { AuthContext } from "../context/AuthContext";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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
    const { email, password } = formData;

    try {
      const { data } = await loginUser({ email, password });

      if (data.status) {
        toast.success(data.message || "Login successful!");

        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        setIsAuthenticated(true);

        navigate("/dashboard");

        setFormData({ email: "", password: "" });
      } else {
        toast.error(data.message || "Invalid credentials.");
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
      <section className="animate__animated animate__fadeIn animate__fast">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-xs-12 loginForm mx-auto mt-5 p-md-5 p-4 rounded-4 bg-white">
              <form onSubmit={handleSubmit}>
                <h2 className="fw-bold mb-4 text-center">Login Here</h2>
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
                <div className="mb-3 position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    aria-label="Password"
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute end-0 me-2 top-50 translate-middle-y text-decoration-none"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      padding: "0.375rem",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {showPassword ? (
                      <RiEyeOffLine size={18} className="text-secondary" />
                    ) : (
                      <RiEyeLine size={18} className="text-secondary" />
                    )}
                  </button>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                <div className="mt-3">
                  <p className="d-flex flex-column flex-md-row justify-content-md-between align-items-center text-center text-md-start gap-3">
                    <span>
                      <Link to="/register"> Create New Account</Link>
                    </span>
                    <span>
                      <Link to="/forgot-password"> Forgot Password?</Link>
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

export default LoginPage;
