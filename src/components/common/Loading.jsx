import React from "react";
import icon from "../../assets/icon.png";

const Loading = () => {
  return (
    <>
      <section className="d-flex justify-content-center align-items-center vh-100 animate__animated animate__fadeIn animate__fast">
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
