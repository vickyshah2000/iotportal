import React from "react";
import { Redirect } from "react-router-dom";

// // Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import changePassword from "../pages/Authentication/changePassword";
import Cookies from "js-cookie";
// //  // Inner Authentication
// import Login1 from "../pages/AuthenticationInner/Login";
// import Login2 from "../pages/AuthenticationInner/Login2";
import Register1 from "../pages/AuthenticationInner/Register";
import Register2 from "../pages/AuthenticationInner/Register2";
import Recoverpw from "../pages/AuthenticationInner/Recoverpw";
import Recoverpw2 from "../pages/AuthenticationInner/Recoverpw2";
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";
import ForgetPwd2 from "../pages/AuthenticationInner/ForgetPassword2";
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen";
import LockScreen2 from "../pages/AuthenticationInner/auth-lock-screen-2";
import ConfirmMail from "../pages/AuthenticationInner/page-confirm-mail";
import ConfirmMail2 from "../pages/AuthenticationInner/page-confirm-mail-2";
import EmailVerification from "../pages/AuthenticationInner/auth-email-verification";
import EmailVerification2 from "../pages/AuthenticationInner/auth-email-verification-2";
import TwostepVerification from "../pages/AuthenticationInner/auth-two-step-verification";
import TwostepVerification2 from "../pages/AuthenticationInner/auth-two-step-verification-2";

import PagesMaintenance from "../pages/Utility/pages-maintenance";
import PagesComingsoon from "../pages/Utility/pages-comingsoon";
import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";
import Pages401 from "../pages/Utility/page-401";

// custom--03/03/2024
import Register_demo from "../ajeev-current/Register_demo";
import ModalAddress from "../ajeev-current/ModalAddress";
// import ModalContact from "../ajeev-current/ModalContact";
import LocationEntity from "../ajeev-current/LocationEntity";

//Table
import EntityTable from "../ajeev-current/RegisteredEntity/EntityTable";
import LocationsTable from "../ajeev-current/locations/LocationsTable";
import AddressTable from "../ajeev-current/address/AddressTable";
import ContactTable from "../ajeev-current/contact/ContactTable";
import RDsTable from "../ajeev-current/RDs/RDsTable";
import ModalDeviceType from "../ajeev-current/Device Forms/ModalDeviceType ";
import ModalDevice from "../ajeev-current/Device Forms/ModalDevice";
import ModalDeviceReg from "../ajeev-current/Device Forms/ModalDeviceReg";
// import  EntityAddressTable  from "../ajeev-current/testTable/EntityAddressTable";
// import  EntityProductTable  from "../ajeev-current/testTable/EntityProductTable";
// import  EntityServiceTable  from "../ajeev-current/testTable/EntityServiceTable";
// import  EntityContactPerson  from "../ajeev-current/testTable/EntityContactPerson";

import UpdateEntity from "../ajeev-current/UpdateEntity";
import MasterContact from "../ajeev-current/directLinks/MasterContact";
import EditEntity from "../ajeev-current/RegisteredEntity/EditEntity";
import EditAddress from "../ajeev-current/address/EditAddress";
import EditContact from "../ajeev-current/contact/EditContact";
import DeviceTable from "../ajeev-current/DeviceTable/DeviceTable";
import DeviceParameter from "../ajeev-current/DeviceParameterTable/DeviceParameter";
import AddParameters from "../ajeev-current/DeviceParameterTable/AddParameters";
import DeviceInstall from "../ajeev-current/AllDevice/DeviceInstallForm";
import DeviceTypeTable from "../ajeev-current/DeviceTypeTable/DeviceTypeTable";
import DeviceAssign from "../ajeev-current/DeviceAssignTable/DeviceAssign";
import DeviceInstallForm from "../ajeev-current/AllDevice/DeviceInstallForm";
import DeviceAssignForm from "../ajeev-current/AllDevice/DeviceAssignForm";
import DeviceInstallTable from "../ajeev-current/DeviceInstallTable/DeviceInstallTable";
import TicketTable from "../ajeev-current/Ticket/TicketTable";
import AddTicket from "../ajeev-current/Ticket/AddTicket";
import MasterAddress from "../ajeev-current/directLinks/MasterAddress";
import MasterPerson from "../ajeev-current/directLinks/MasterPerson";
import NewRD from "../ajeev-current/RDs/NewRD";
import EditDevice from "../ajeev-current/DeviceTypeTable/EditDevice";
import LocationMap from "../ajeev-current/locationMap/LocationMap";
import EntityDashboard from "../ajeev-current/EntityDashboard/EntityDashboard";
import AllDeviceTable from "../ajeev-current/AllShowDeviceTable/AllDeviceTable";
import ActiveDeviceTable from "../ajeev-current/ActiveDeviceTable/ActiveDeviceTable";
import InactiveDeviceTable from "../ajeev-current/InactiveDeviceTable/InactiveDeviceTable";
import BarChart from "../pages/AllCharts/chartjs/barchart";
import DeviceComponentTable from "../ajeev-current/ComponentTable/DeviceComponentTable";
import ModalComponentForm from "../ajeev-current/ModalComponentForm";
import CompliantDeviceTable from "../ajeev-current/CompliantDeviceTable/CompliantDeviceTable";
import ReportAllDeciceTable from "../ajeev-current/Report/ReportAllDeviceTable"
import LandingDashboard from "../LandingPage/LandingDashboard";
import RFIDTagDetails from "../ajeev-current/RFIDTagDeviceDetails/AllDeviceTable";
import GPSDeviceDetails from "../ajeev-current/GPSDeviceDetails/AllDeviceTable";
import RFIDReaderDetails from "../ajeev-current/RFIDReaderDetails/AllDeviceTable";
import FloodDevice from "../ajeev-current/FloodDeviceDetails/AllDeviceTable";

//*********************************** */

const authProtectedRoutes = [
  //custom urls
  //*********************************************/
  {
    path: "/register-demo",
    component: Register_demo,
  },
  { path: "/add-address", component: ModalAddress },
  // { path: "/add-contact", component: ModalContact },
  {
    path: "/add-location",
    component: LocationEntity,
  },
  { path: "/address-demo", component: AddressTable },
  {
    path: "/update-entity",
    component: UpdateEntity,
  },
  //*****************************   Edit forms  ****/
  { path: "/edit-device", component: EditDevice,roles: ["Admin"] },
  { path: "/edit-entity", component: EditEntity },
  { path: "/edit-address", component: EditAddress },
  { path: "/edit-contact", component: EditContact },
  //*****************************   Device forms  ****/
  { path: "/device-install", component: DeviceInstallForm,roles: ["Admin"],
   },
  { path: "/device-assign", component: DeviceAssignForm,roles: ["Admin"] },
  { path: "/device-install-table", component: DeviceInstallTable },
  { path: "/devicetype-demo", component: ModalDeviceType }, 
  { path: "/device-demo", component: ModalDevice,roles:["Admin"],},
  { path: "/devicereg-demo", component: ModalDeviceReg,roles:["Admin"] },

  { path: "/add-parameter", component: AddParameters,roles: ["Admin"]},
  //*****************************   Device Assign  ****/
  { path: "/device-assign-table", component: DeviceAssign },
  { path: "/device-type", component: DeviceTypeTable ,roles: ["Admin"]},
  { path: "/component-table", component: DeviceComponentTable,roles: ["Admin"] },
  { path: "/component-add", component: ModalComponentForm ,roles: ["Admin"]},
  { path: "/device-table", component: DeviceTable,roles: ["Admin"] },

  //************************************    Tables   ****************/

  { path: "/entity-table", component: EntityTable }, 
  { path: "/location-table", component: LocationsTable },
  { path: "/address-table", component: AddressTable },
  { path: "/contact-table", component: ContactTable },
  { path: "/device-parameter", component: DeviceParameter,roles: ["Admin"] },
  { path: "/show-all-device", component: AllDeviceTable },
  { path: "/show-all-rfid-tag", component: RFIDTagDetails },
  { path: "/show-all-rfid-reader", component: RFIDReaderDetails },
  { path: "/show-all-gps", component: GPSDeviceDetails },
  { path: "/show-all-flood", component: FloodDevice },
  { path: "/show-active-device", component: ActiveDeviceTable },
  { path: "/show-inactive-device", component: InactiveDeviceTable },
  { path: "/show-devices", component: CompliantDeviceTable },
  // { path: "/show-inactive-device", component: InactiveDeviceTable },
  //************************************    Tickets   ****************/
  { path: "/ticket-table", component: TicketTable },
  { path: "/add-ticket", component: AddTicket },
  { path: "/show-all-report", component: ReportAllDeciceTable},
  //************************************    Direct Links   ****************/
  { path: "/master-contact", component: MasterContact },
  { path: "/master-address", component: MasterAddress },
  { path: "/master-person", component: MasterPerson },
  //************************************   RD   ****************/
  { path: "/add-rd", component: NewRD },
  { path: "/distributors", component: RDsTable },
  { path: "/map-location", component: LocationMap },
  { path: "/bar", component: BarChart },
  // ENtity only
  // {
  //   path: "/entity-dashboard",
  //   component: EntityDashboard,
  //   roles: ["Customer"],
  // },

   {
    path: "/iotdashboard",
    component: LandingDashboard,
    roles: ["Customer"],
  },

  {
    path: "/entity-dashboard",
    component: EntityDashboard,
    roles: ["Customer"],
  },
  //***********************************************Testing***********************************************/

  {
    path: "/",
    exact: true,
    component: () =>
      JSON.parse(Cookies.get("authUser")).role === "Admin" ? (
        <Redirect to="/entity-table" />
      ) : (
        <Redirect to="/iotdashboard" />
      ),
  },
];

const publicRoutes = [
  //  custom routes --- 03/04/2024
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/pages-maintenance", component: PagesMaintenance },
  { path: "/pages-comingsoon", component: PagesComingsoon },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-401", component: Pages401 },
  { path: "/pages-500", component: Pages500 },

  //   // Authentication Inner
  // { path: "/pages-login", component: Login1 },
  // { path: "/pages-login-2", component: Login2 },
  { path: "/pages-register", component: Register1 },
  { path: "/pages-register-2", component: Register2 },
  { path: "/page-recoverpw", component: Recoverpw },
  { path: "/page-recoverpw-2", component: Recoverpw2 },
  { path: "/reset-password", component: ForgetPwd1 },
  { path: "/pages-forgot-pwd-2", component: ForgetPwd2 },
  { path: "/auth-lock-screen", component: LockScreen },
  { path: "/auth-lock-screen-2", component: LockScreen2 },
  { path: "/page-confirm-mail", component: ConfirmMail },
  { path: "/page-confirm-mail-2", component: ConfirmMail2 },
  { path: "/auth-email-verification", component: EmailVerification },
  { path: "/auth-email-verification-2", component: EmailVerification2 },
  { path: "/auth-two-step-verification", component: TwostepVerification },
  { path: "/auth-two-step-verification-2", component: TwostepVerification2 },
];

export { authProtectedRoutes, publicRoutes };
