import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

import { Link } from "react-router-dom";

import logo from "../../assets/images/Ajeevi-img/IOTLOGO.png";
import Belagavilogo from "../../assets/images/belagaviLogo.png";
import puduchery from "../../assets/images/pudulogo.png";
import Cookies from "js-cookie";

const Sidebar = (props) => {
  const userCookie = Cookies.get("authUser");
  const role = userCookie ? JSON.parse(userCookie).role : null;
  const entity_id = userCookie ? JSON.parse(userCookie).entity_id.entity_id: null;
  
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
                {/* <img src={logo} alt="" height="30" /> */}
              </span>
              <span className="logo-lg">
                <img
                  className="p-1"
                  src={logo}
                  alt=""
                  height="130"
                  width="250"
                  style={{borderRadius:"50%"}}
                />
              </span>
              {/* <span className="logo-lg">
                <img src={logo} alt="" height="100" width="240" />
              </span> */}
            </Link>
          ) : entity_id==1 ? (
            <Link
              to="/"
              className="logo logo-light d-flex justify-content-center"
            >
              <span className="logo-sm" >
                <img src={Belagavilogo} alt="" height="50"  />
              </span>

              <span className="logo-lg">
                <img
                  className="p-1"
                  src={Belagavilogo}
                  alt=""
                  height="130"
                  width="250"
                  style={{borderRadius:"50%"}}
                />
              </span>
            </Link>
          )
          :
          entity_id==2 ? (
            <Link
              to="/"
              className="logo logo-light d-flex justify-content-center"
            >
              <span className="logo-sm" >
                <img src={puduchery} alt="" height="50"  />
              </span>

              <span className="logo-lg">
                <img
                  className="p-1"
                  src={puduchery}
                  alt=""
                  height="130"
                  width="250"
                  style={{borderRadius:"50%"}}
                />
              </span>
            </Link>
          )
          :null}
        </div>
        <br />
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
