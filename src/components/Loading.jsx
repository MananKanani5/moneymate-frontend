import React from "react";
import icon from "../assets/icon.png";

const Loading = () => {
  return (
    <>
      <section className="d-flex justify-content-center align-items-center vh-100 ">
        <img
          src={icon}
          style={{ width: "125px" }}
          className="animate__animated animate__pulse animate__infinite	infinite animate__slow"
        />
      </section>
    </>
  );
};

export default Loading;