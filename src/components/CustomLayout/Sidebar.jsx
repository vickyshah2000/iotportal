import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

import { Link } from "react-router-dom";

import logo from "../../assets/images/shillong.png";
import FerreroLogo from "../../assets/images/Ajeevi-img/logo-fer.jpeg";
import Cookies from "js-cookie";

const Sidebar = (props) => {
  const userCookie = Cookies.get("authUser");
  const role = userCookie ? JSON.parse(userCookie).role : null;
  return (
    <React.Fragment>
      <div className="vertical-menu ">
        <div className="navbar-brand-box">
          {/* <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logo} alt="" />
            </span>
            <span className="logo-lg">
              <img src={logo} alt="" />
            </span>
          </Link> */}

          {role == "Admin" ? (
            <Link
              to="/"
              className="logo logo-light d-flex justify-content-center"
            >
              <span className="logo-sm">
                <img src={logo} alt="" height="50" />
              </span>
              <span className="logo-lg">
                <img src={logo} alt="" height="90" width="180px" />
              </span>
            </Link>
          ) : (
            <Link
              to="/"
              className="logo logo-light d-flex justify-content-center"
            >
              <span className="logo-sm" >
                <img src={FerreroLogo} alt="" height="50"  />
              </span>

              <span className="logo-lg">
                <img
                  className="p-1"
                  src={FerreroLogo}
                  alt=""
                  height="100"
                  width="250"
                  style={{borderRadius:"50%"}}
                />
              </span>
            </Link>
          )}
        </div>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
          {/* <SidebarContent /> */}
        </div>

        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = (state) => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
