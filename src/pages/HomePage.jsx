import React, { useContext, useEffect } from "react";
import hero from "../assets/hero.png";
import heroMob from "../assets/heroMob.webp";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <section className="pb-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center pt-5 mt-5 d-flex flex-column align-items-center">
              <h1 className="fw-semibold animate__animated animate__fadeIn">
                Take Control of Your Money with MoneyMate
              </h1>
              <p className="fs-5 animate__animated animate__fadeIn">
                Effortlessly track your expenses, generate insightful reports,
                and visualize your spending habits—all in one place.
              </p>
              <Link
                to="/login"
                className="btn btn-primary mb-5 mt-3 animate__animated animate__fadeIn"
              >
                Get Started
              </Link>
              <picture className="animate__animated animate__fadeIn">
                <source srcSet={heroMob} media="(max-width: 768px)" />
                <img
                  src={hero}
                  alt="Hero Section Illustration"
                  className="img-fluid"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
