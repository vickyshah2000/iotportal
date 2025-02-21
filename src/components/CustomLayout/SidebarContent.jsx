import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import Cookies from "js-cookie";
// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = (props) => {
  const ref = useRef();

  //cookie set
  const userCookie = Cookies.get("authUser");
  const role = userCookie ? JSON.parse(userCookie).role : null;

  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  return (
    <React.Fragment>
      <SimpleBar
        className="h-100"
        ref={ref}
        style={{ backgroundColor: "#304669" }}
      >
        <div id="sidebar-menu" style={{ backgroundColor: "#304669" }}>
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("")} </li>
            {/* ******************* Master ************************* */}
            <li>
              <>
                <Link to="/#" className="">
                  <i className="bx bx-home-circle"></i>
                  <span className="badge rounded-pill bg-info float-end"></span>
                  <span>{props.t("Master")}</span>
                </Link>

                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/distributors">{props.t("Entity")}</Link>
                  </li>
                  <li>
                    <Link to="/entity-table">{props.t("Self")}</Link>
                  </li>
                  {role == "Admin" ? (
                    <>
                      <li>
                        <Link to="/master-address">
                          {props.t("Add Address")}
                        </Link>
                      </li>
                      <li>
                        <Link to="/master-person">{props.t("Add Person")}</Link>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link to="/entity-dashboard">{props.t("Dashboard")}</Link>
                    </li>
                  )}

                  {/* <li>
                    <Link to="/RDsTable">{props.t("RD")}</Link>
                  </li> */}
                </ul>
              </>
            </li>

            {/* ******************** Form ************** */}
            <li>
              <Link to="/#" className="">
                <i className="bx bxl-react"></i>
                <span className="badge rounded-pill bg-info float-end"></span>
                <span>{props.t("Device")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/device-demo">{props.t("Device Form")}</Link>
                </li>
                <li>
                  <Link to="/device-type">{props.t("Device Type")}</Link>
                </li>
                <li>
                  <Link to="/device-table">{props.t("Device Table")}</Link>
                </li>
                {/* <li>
                  <Link to="/devicetype-demo">
                    {props.t("Device Type Form")}
                  </Link>
                </li> */}
              </ul>
            </li>
            {/* ********************** Ticket **** */}
            <li>
              <Link to="/#" className="">
                <i className="bx bxl-react"></i>
                <span className="badge rounded-pill bg-info float-end"></span>
                <span>{props.t("Ticket")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link
                    to={{
                      pathname: "/ticket-table",
                      state: { Status: "All" }, // Replace with your actual prop and value
                    }}
                  >
                    {props.t("Ticket Table")}
                  </Link>
                </li>
              </ul>
            </li>

            {/* ******************* Report ************************* */}
            {role == "Admin" ? (
              <></>):(
                <>
            <li>
              <Link to="/#" className="">
                <i className="bx bxl-react"></i>
                <span className="badge rounded-pill bg-info float-end"></span>
                <span>{props.t("Report")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/show-all-report">{props.t("Device Report")}</Link>
                </li>
                {/* <li>
                  <Link to="#">{props.t("Report Analysis")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Graph Analysis")}</Link>
                </li> */}
               
              </ul>
            </li>
            </>)}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));


// import PropTypes from "prop-types";
// import React, { useEffect, useRef } from "react";
// import Cookies from "js-cookie";
// // //Import Scrollbar
// import SimpleBar from "simplebar-react";

// // MetisMenu
// import MetisMenu from "metismenujs";
// import { withRouter } from "react-router-dom";
// import { Link } from "react-router-dom";

// //i18n
// import { withTranslation } from "react-i18next";

// const SidebarContent = (props) => {
//   const ref = useRef();

//   //cookie set
//   const userCookie = Cookies.get("authUser");
//   const role = userCookie ? JSON.parse(userCookie).role : null;

//   useEffect(() => {
//     const pathName = props.location.pathname;

//     const initMenu = () => {
//       new MetisMenu("#side-menu");
//       let matchingMenuItem = null;
//       const ul = document.getElementById("side-menu");
//       const items = ul.getElementsByTagName("a");
//       for (let i = 0; i < items.length; ++i) {
//         if (pathName === items[i].pathname) {
//           matchingMenuItem = items[i];
//           break;
//         }
//       }
//       if (matchingMenuItem) {
//         activateParentDropdown(matchingMenuItem);
//       }
//     };
//     initMenu();
//   }, [props.location.pathname]);

//   useEffect(() => {
//     ref.current.recalculate();
//   });

//   function scrollElement(item) {
//     if (item) {
//       const currentPosition = item.offsetTop;
//       if (currentPosition > window.innerHeight) {
//         ref.current.getScrollElement().scrollTop = currentPosition - 300;
//       }
//     }
//   }

//   function activateParentDropdown(item) {
//     item.classList.add("active");
//     const parent = item.parentElement;
//     const parent2El = parent.childNodes[1];
//     if (parent2El && parent2El.id !== "side-menu") {
//       parent2El.classList.add("mm-show");
//     }

//     if (parent) {
//       parent.classList.add("mm-active");
//       const parent2 = parent.parentElement;

//       if (parent2) {
//         parent2.classList.add("mm-show"); // ul tag

//         const parent3 = parent2.parentElement; // li tag

//         if (parent3) {
//           parent3.classList.add("mm-active"); // li
//           parent3.childNodes[0].classList.add("mm-active"); //a
//           const parent4 = parent3.parentElement; // ul
//           if (parent4) {
//             parent4.classList.add("mm-show"); // ul
//             const parent5 = parent4.parentElement;
//             if (parent5) {
//               parent5.classList.add("mm-show"); // li
//               parent5.childNodes[0].classList.add("mm-active"); // a tag
//             }
//           }
//         }
//       }
//       scrollElement(item);
//       return false;
//     }
//     scrollElement(item);
//     return false;
//   }

//   return (
//     <React.Fragment>
//       <SimpleBar
//         className="h-100 bg-dark"
//         ref={ref}
//       >
//         <div id="sidebar-menu" className="bg-dark">
//           <ul className="metismenu list-unstyled" id="side-menu">
//             <li className="menu-title">{props.t("")} </li>
//             {/* ******************* Master ************************* */}
//             <li>
//               <>
//                 <Link to="/#" className="">
//                   <i className="bx bx-home-circle"></i>
//                   <span className="badge rounded-pill bg-info float-end"></span>
//                   <span>{props.t("Master")}</span>
//                 </Link>

//                 <ul className="sub-menu" aria-expanded="false">
                  
//                   {role == "Admin" ? (
//                     <>
//                       <li>
//                         <Link to="/master-address">
//                           {props.t("Add Address")}
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/master-person">{props.t("Add Person")}</Link>
//                       </li>
//                     </>
//                   ) : (
//                     <li>
//                       <Link to="/entity-dashboard">{props.t("Dashboard")}</Link>
//                     </li>
//                   )}
//                   <li>
//                     <Link to="/distributors">{props.t("Entity")}</Link>
//                   </li>
//                   <li>
//                     <Link to="/entity-table">{props.t("Self")}</Link>
//                   </li>

//                   {/* <li>
//                     <Link to="/RDsTable">{props.t("RD")}</Link>
//                   </li> */}
//                 </ul>
//               </>
//             </li>

//             {/* ******************** Form ************** */}
//             <li>
//               <Link to="/#" className="">
//                 <i className="bx bxl-react"></i>
//                 <span className="badge rounded-pill bg-info float-end"></span>
//                 <span>{props.t("Device")}</span>
//               </Link>
//               <ul className="sub-menu" aria-expanded="false">
//                 <li>
//                   <Link to="/device-demo">{props.t("Device Form")}</Link>
//                 </li>
//                 <li>
//                   <Link to="/device-type">{props.t("Device Type")}</Link>
//                 </li>
//                 <li>
//                   <Link to="/device-table">{props.t("Device Table")}</Link>
//                 </li>
//                 {/* <li>
//                   <Link to="/devicetype-demo">
//                     {props.t("Device Type Form")}
//                   </Link>
//                 </li> */}
//               </ul>
//             </li>
//             {/* ********************** Ticket **** */}
//             <li>
//               <Link to="/#" className="">
//                 <i className="bx bxl-react"></i>
//                 <span className="badge rounded-pill bg-info float-end"></span>
//                 <span>{props.t("Ticket")}</span>
//               </Link>
//               <ul className="sub-menu" aria-expanded="false">
//                 <li>
//                   <Link
//                     to={{
//                       pathname: "/ticket-table",
//                       state: { Status: "All" }, // Replace with your actual prop and value
//                     }}
//                   >
//                     {props.t("Ticket Table")}
//                   </Link>
//                 </li>
//               </ul>
//             </li>
//           </ul>
//         </div>
//       </SimpleBar>
//     </React.Fragment>
//   );
// };

// SidebarContent.propTypes = {
//   location: PropTypes.object,
//   t: PropTypes.any,
// };

// export default withRouter(withTranslation()(SidebarContent));
