import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

import Img404 from "../../images/404.png";

import "./notFound.css";
export const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="landing-page">
          <div className="image-404">
            <img src={Img404} alt="" />
          </div>

          <h1 className="not-found-title"> 404 Error.</h1>
          <p className="not-found-body">
            We can't find the page you're looking for.
          </p>
          <button className="btn-solid">
            <Link to="/">Back to home</Link>
          </button>
        </div>
      </div>
    </>
  );
};
