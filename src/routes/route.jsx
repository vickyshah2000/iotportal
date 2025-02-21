import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import CustomLayout from "../components/CustomLayout";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  roles,
  ...rest
}) => {
  const userCookie = Cookies.get("authUser");
  const user = userCookie ? JSON.parse(userCookie) : null;
  const path =useLocation()

console.log(path.pathname)

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthProtected && !user) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        } else if (roles && roles.length > 0 && user) {
          if (roles.includes(user.role)) {
      if(path.pathname ==="/iotdashboard"){
            return (
              
              <CustomLayout>
                <Component {...props} />
                </CustomLayout>
            );
          }
          else {
            return(
              <Layout>
            <Component {...props} />
        
            </Layout>
            )
          }

          } else {
            return <Redirect to="/pages-401" />;
          }
        } else {
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          );
        }
      }}
    />
  );
};

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default Authmiddleware;
