import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <section className="bg-body-tertiary p-3">
      <div className="container d-flex align-items-center justify-content-between">
        <Link to={"/"}>
          <img src={logo} className="img-fluid w-75" />
        </Link>

        <div className="" id="navbarNav">
          <ul className="d-flex list-unstyled gap-3">
            <li className="">
              <Link to={"/login"} className="text-black">
                Login
              </Link>
            </li>
            <li className="">
              <Link to={"/register"} className="text-black">
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
