import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NotFound = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <section className="vh-100 d-flex flex-column justify-content-center align-items-center px-2">
      <h1 className="fw-bold text-center" style={{ fontSize: "120px" }}>
        404
      </h1>
      <h2 className="fw-semibold text-center">Page Not Found</h2>
      <p className="fw-medium text-center fs-6">
        The link you followed probably broken or the page has been removed.
      </p>
      <Link
        className="btn btn-primary mt-4"
        to={isAuthenticated ? "/dashboard" : "/"}
      >
        Go to Home
      </Link>
    </section>
  );
};

export default NotFound;
