import React from "react";
import { NavLink } from "react-router-dom";
import Globe from "../../Assets/Globe.svg";
import "./LeftSidebar.css";

function LeftSidebar(show) {
  return (
    <div className="left-sidebar">
      <nav className="side-nav">
        <NavLink
          to="/"
          className="side-nav-links"
          activeclassname="active"
          onClick={show}
        >
          <p>Home</p>
        </NavLink>
        <div className="side-nav-div">
          <div>
            <p>PUBLIC</p>
          </div>
          <NavLink
            to="/questions"
            className="side-nav-links"
            activeclassname="active"
            onClick={show}
          >
            <img src={Globe} alt="Globe" />
            <p style={{ paddingLeft: "10px" }}>Questions </p>
          </NavLink>
          <NavLink
            to="/tags"
            className="side-nav-links"
            activeclassname="active"
            style={{ paddingLeft: "40px" }}
            onClick={show}
          >
            <p>Tags</p>
          </NavLink>
          <NavLink
            to="/users"
            className="side-nav-links"
            activeclassname="active"
            style={{ paddingLeft: "40px" }}
            onClick={show}
          >
            <p>Users</p>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default LeftSidebar;
