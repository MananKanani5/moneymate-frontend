import { RiGithubFill, RiLinkedinFill } from "@remixicon/react";
import React from "react";

const Footer = () => {
  return (
    <>
      <section>
        <div className="container gap-3 p-3 d-flex justify-content-between align-items-center flex-column-reverse flex-md-row">
          <div>
            <p>
              Created with &hearts; by
              <a href="https://portfolio.manankanani.in" target="_blank">
                {" "}
                Manan Kanani
              </a>
            </p>
          </div>
          <div className="d-flex gap-3">
            <a href="https://www.linkedin.com/in/manan-kanani/" target="_blank">
              <RiLinkedinFill />
            </a>
            <a href="https://github.com/MananKanani5" target="_blank">
              <RiGithubFill />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
