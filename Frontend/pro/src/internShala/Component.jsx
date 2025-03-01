import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import I1 from "./image/I1.png";
import I2 from "./image/I2.png";
import I3 from "./image/I3.png";
import I4 from "./image/webdevlopment.png";
import I5 from "./image/digitalmarketing.png";
import I6 from "./image/ml.png";
import I7 from "./image/python.png";
import I8 from "./image/genpact.png";
import I9 from "./image/jio.png";
import I10 from "./image/optum.png";
import I11 from "./image/wellfargo.png";
import I12 from "./image/i12.png";
import I13 from "./image/i13.png";
import I14 from "./image/i14.png";
import I15 from "./image/i15.png";
import I16 from "./image/i16.png";
import connect from "./image/connect.png";
import home from "./image/home.png";
import "./log.css";

export const Header = ({ log }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchParams, setSearchParams] = useState("");
  const navigate = useNavigate();

  const handleLoginToggle = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      navigate("/");
    } else {
      setIsLoggedIn(true);
      navigate("/login");
    }
  };

  const handleInputChange = (e) => {
    setSearchParams(e.target.value);
  };

  const handleSearch = () => {
    navigate("/searchedjobs", { state: { query: searchParams } });
  };

  return (
    <div className="container-fluid pt-0 px-0">
      <h6 className="text-center bg-dark-subtle p-2">
        Sign up now to get a free guide on how to boost your profile.
      </h6>

      <div className="d-flex justify-content-evenly">
        <div className="d-flex justify-content-evenly">
          <div className="img px-2 mx-2">
            <span className="p-2 fs-1 text-center logoCol">CarrierConnect</span>
          </div>
          <ul className="list-unstyled text-center d-flex text-decoration-none">
            <a href="/jobs" style={{ textDecoration: "none", color: "black" }}>
              <li className="p-2 fs-4 text-capitalize" style={{ cursor: "pointer" }}>
                Jobs
              </li>
            </a>
            <a href="/quiz" style={{ textDecoration: "none", color: "black" }}>
              <li className="p-2 fs-4 text-capitalize" style={{ cursor: "pointer" }}>
                Quiz
              </li>
            </a>
          </ul>
        </div>

        <div className="align-content-center text-center">
          <input
            type="search"
            className="fs-5 px-2 rounded-1 border-1"
            placeholder="Search..."
            value={searchParams}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch} className="fs-5 bg-light rounded-2 mx-2 px-1 border-1">
            Search
          </button>
        </div>

        <div className="text-right align-content-center">
          <button
            onClick={handleLoginToggle}
            className="fs-5 bg-info text-white rounded-2 mx-2 px-2 py-1 border-0"
          >
            {isLoggedIn ? "Logout" : "Candidate Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const Slider = () => {
  return (
    <div className="container pb-2">
      <div className="img w-100 h-100">
        <img src={home} className="w-100 h-100" alt="" />
      </div>
      <div className="container d-flex justify-content-evenly pt-3">
        <img src={I1} style={{ cursor: "pointer" }} alt="" />
        <img src={I2} style={{ cursor: "pointer" }} alt="" />
        <img src={I3} style={{ cursor: "pointer" }} alt="" />
      </div>
      <hr />
      <br />
    </div>
  );
};

export const Certification = () => {
  return (
    <div className="container pb-2">
      <h2 className=" text-capitalize text-center gap-2">Certification courses</h2>
      <h5 className="text-center"> Fastest way to Build your CV.</h5>
      <div className="container d-flex justify-content-evenly pt-3">
        <img className="img img-thumbnail" src={I4} style={{ cursor: "pointer" }} alt="" />
        <img className="img img-thumbnail" src={I5} style={{ cursor: "pointer" }} alt="" />
        <img className="img img-thumbnail" src={I6} style={{ cursor: "pointer" }} alt="" />
        <img className="img img-thumbnail" src={I7} style={{ cursor: "pointer" }} alt="" />
      </div>
      <hr />
      <br />
    </div>
  );
};

export const Hiring = () => {
  return (
    <div className="pb-2 container">
      <h2 className=" text-capitalize text-center gap-2">actively hiring</h2>
      <div className="container d-flex justify-content-evenly pt-3">
        <img className="img img-thumbnail" src={I8} style={{ cursor: "pointer" }} alt="" />
        <img className="img img-thumbnail" src={I9} style={{ cursor: "pointer" }} alt="" />
        <img className="img img-thumbnail" src={I10} style={{ cursor: "pointer" }} alt="" />
        <img className="img img-thumbnail" src={I11} style={{ cursor: "pointer" }} alt="" />
      </div>
      <hr />
      <br />
    </div>
  );
};

export const InterShip = () => {
  return (
    <div className="pb-2 container">
      <h2 className=" text-capitalize text-center gap-2">Latest Internship</h2>
      <div className="container d-flex justify-content-evenly pt-3">
        <img className="img img-thumbnail" src={I12} style={{ cursor: "pointer" }} alt="" />
        <img className="img img-thumbnail" src={I13} style={{ cursor: "pointer" }} alt="" />
        <img className="img img-thumbnail" src={I14} style={{ cursor: "pointer" }} alt="" />
        <img className="img img-thumbnail" src={I15} style={{ cursor: "pointer" }} alt="" />
      </div>
      <hr />
      <br />
    </div>
  );
};

export const Footer = () => {
  return (
    <div>
      <div className="container d-flex justify-content-evenly">
        <div className="p-2">
          <div className="m-1 p-1">
            <img src="logo" alt="Logo" width={150} height={80} />
          </div>
          <h5 className="text-capitalize p-1">connect with us</h5>
          <img src={connect} alt="" width={150} height={50} />
        </div>
        <div className="">
          <ul className="list-unstyled text-decoration-none">
            <li className="p-1 fs-5">About Us</li>
            <li className="p-1 fs-5">Careers</li>
            <li className="p-1 fs-5">Employer</li>
            <li className="p-1 fs-5">Credit</li>
            <li className="p-1 fs-5">Sitemap</li>
          </ul>
        </div>
        <div className="">
          <ul className="list-unstyled text-decoration-none">
            <li className="p-1 fs-5">Help Center</li>
            <li className="p-1 fs-5">Privacy Policy</li>
            <li className="p-1 fs-5">T & C</li>
            <li className="p-1 fs-5">Notices</li>
            <li className="p-1 fs-5">Report Issue</li>
          </ul>
        </div>
        <div className="">
          <img src={I16} alt="" width={350} height={200} />
        </div>
      </div>
      <p className="p-1 text-white text-center bg-dark m-0">
        All trademarks are the property of respective owner.
      </p>
      <p className="p-1 text-white text-center bg-dark m-0">
        All rights are reserved &copy; 2024.
      </p>
    </div>
  );
};