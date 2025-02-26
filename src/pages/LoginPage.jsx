import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../api/userApi";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const { setIsAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate]);

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

      if (data?.status) {
        toast.success("Login successful!");

        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        setIsAuthenticated(true);

        navigate("/dashboard");

        setFormData({ email: "", password: "" });
      } else {
        toast.error(data.data?.message || "Invalid credentials.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="animate__animated animate__fadeIn">
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
                      <Link to="/register">Register Here</Link>
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
