import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../api/userApi";
import { AuthContext } from "../context/AuthContext";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
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
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { firstName, lastName, phoneNumber, email, password } = formData;

    try {
      const { data } = await registerUser({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      });

      if (data.status) {
        toast.success(data.message || "Registration successful!");
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          password: "",
        });
        navigate("/login");
      } else {
        toast.error(data.message || "Error registering user.");
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
                <h2 className="fw-bold mb-4 text-center">Register Here</h2>

                <div className="d-flex gap-3 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                  />
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    required
                  />
                </div>
                <div className="mb-3 position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create Password"
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
                  {loading ? "Registering..." : "Register"}
                </button>

                <div className="mt-3">
                  <p className="text-center">
                    Already have an account ?
                    <span>
                      <Link to="/login"> Login Here</Link>
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

export default RegisterPage;
