import React, { useContext, useEffect } from "react";
import hero from "../assets/hero.png";
import heroMob from "../assets/heroMob.webp";
import aboutImg from "../assets/about_img.webp";
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
      <section>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center pt-5 mt-5 d-flex flex-column align-items-center">
              <h1 className="fw-semibold animate__animated animate__fadeIn animate__fast">
                Take Control of Your Money with MoneyMate
              </h1>
              <p className="fs-5 animate__animated animate__fadeIn animate__fast">
                Effortlessly track your expenses, generate insightful reports,
                and visualize your spending habits—all in one place.
              </p>
              <Link
                to="/login"
                className="btn btn-primary mb-5 mt-4 animate__animated animate__fadeIn animate__fast"
              >
                Get Started
              </Link>
              <picture className="animate__animated animate__fadeIn animate__fast">
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

      <section className="about-section px-3 py-5 position-relative z-3">
        <div className="container">
          <div className="d-flex align-items-center gap-5 flex-column flex-md-row">
            <div className="icon-container animate__animated animate__fadeIn animate__fast">
              <img src={aboutImg} className="w-100" alt="moenyMate_icon" />
            </div>
            <div className="animate__animated animate__fadeIn animate__fast">
              <h2 className="fw-semibold mb-4">A Little About MoneyMate</h2>
              <p>
                <strong> I’m Manan Kanani</strong>, and I’ve lived in a hostel
                for over 10 years. For the past few months, I was searching for
                a simple way to track my expenses—something that could tell me
                how much I’ve spent this month and where my money is going.
                <br />
                <br />I came across a few apps, but they were either too complex
                or cluttered with ads, making them frustrating to use. As a
                developer and someone who loves solving real-world problems, I
                decided to build
                <strong> MoneyMate—a mobile-first expense tracker </strong> that
                focuses on simplicity, usability, and efficiency.
                <br />
                <br />
                <strong>MoneyMate</strong> is designed to make adding and
                retrieving expenses effortless, with a clean and minimal UI that
                keeps things straightforward. No distractions, no unnecessary
                features—just a smart, easy-to-use tool to manage your finances.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
