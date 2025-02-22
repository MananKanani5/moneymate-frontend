import React from "react";
import { Link } from "react-router-dom";
import dashIcon from "../../assets/iconWhite.svg";
import homeIcon from "../../assets/icons/home.svg";
import coinIcon from "../../assets/icons/coins.svg";
import userIcon from "../../assets/icons/user.svg";

const Sidebar = () => {
  return (
    <section className="position-fixed bg-primary h-100 mob-height side ">
      <div className="container mt-4 mob-mt-0">
        <Link to={"/dashboard"} className="logo hide-mob">
          <img src={dashIcon} className="img-fluid" />
        </Link>

        <ul className="p-0 mt-5 d-flex flex-column align-items-center gap-3 menu mob-mt-0 mob-flex-row mob-height">
          <li className="list-unstyled" title="home">
            <Link to={"/dashboard"}>
              <img src={homeIcon} className="w-25x" alt="" />
            </Link>
          </li>
          <li className="list-unstyled" title="expenses">
            <Link to={"/expenses"}>
              <img src={coinIcon} className="w-25x" alt="" />
            </Link>
          </li>
          <li
            className="list-unstyled flex-grow-1 mob-grow-0 acc"
            title="my-account"
          >
            <Link to={"/my-account"}>
              <img src={userIcon} className="w-25x" alt="" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Sidebar;
