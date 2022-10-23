import React from "react";
import bootstrap from "bootstrap";
import { NavLink } from "react-router-dom";

const Adminnavbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container-fluid">
        <NavLink className="navbar-brand ps-3 d-flex" to={"/"}>Museums</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="d-flex pe-5">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active pe-2">
                <NavLink className="nav-link" to={"/adminprofile"}>Profile</NavLink>
              </li>
              <li className="nav-item pe-2">
                <NavLink className="nav-link" to={"/manageusers"}> Manage Users</NavLink>
              </li>
              <li className="nav-item pe-2">
                <NavLink className="nav-link" to={"/managemuseums"}> Manage Museums</NavLink>
              </li>
              <li className="nav-item pe-2">
                <NavLink className="nav-link" to={"/ManageStaff"}> Manage Staff</NavLink>
              </li>
              <li className="nav-item pe-2">
                <NavLink className="nav-link" to={"/prediction"}>Predictions</NavLink>
              </li>
              <li className="nav-item pe-2">
                <NavLink className="nav-link" to={"/IndividualPrediction"}>Individual Prediction</NavLink>
              </li>
              <li className="nav-item pe-2">
                <NavLink className="nav-link" to={"/logout"}> Logout</NavLink>
              </li>
            </ul>
          </div>
        </div>
        </div>
      </nav>
    </div>
  );
}
export default Adminnavbar;