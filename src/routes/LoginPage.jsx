import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const LoginPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      toast.error("Both fields are required!");
      return;
    }
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await axios.post(
        `${apiUrl}/login`,
        { username, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        login(response.data.user);
        toast.success(response.data.message || "Login successful!");
        navigate("/dashboard");
      } else {
        toast.error(response.data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="bottom-right" newestOnTop pauseOnHover />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-xs-12 loginForm mx-auto mt-5 p-md-5 p-4 rounded-4 bg-white">
              <form onSubmit={handleSubmit}>
                <h2 className="fw-bold mb-4 text-center">Login Here</h2>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    aria-label="Username"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    aria-label="Password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
                <div className="mt-3">
                  <p className="text-center">
                    Don't have an account?
                    <span>
                      <Link to="/register"> Register Here</Link>
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
