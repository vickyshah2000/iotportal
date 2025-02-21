import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import Cookies from "js-cookie";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import BelagaviDashboard from "./BelagaviDashboard";
import PuducheryDashboard from "./PuducheryDashboard";
import DefaultDashboard from "./DefaultDashboard";
// import {
//   getTotalDevice,
//   getActiveDevice,
//   getInactiveDevice,
//   getTotalTicket,
//   getOpenTicket,
//   getClosedTicket,
//   getCompliance,
//   getComplianceByZone,
// } from "../../helpers/custom_helper/data/getDeviceDashboardData";
// import LocationMap from "../locationMap/LocationMap";
// import Compliance from "../Compliance";

const EntityDashboard = (props) => {
  const entityId = JSON.parse(Cookies.get("authUser")).entity_id.entity_id;
  // const dispatch = useDispatch();
  // const history = useHistory();

  // const [totalDevices, setTotalDevices] = useState("");
  // const [activeDevice, setActiveDevice] = useState("");
  // const [inActiveDevice, setInActiveDevice] = useState("");
  // const [totalTicket, setTotalTicket] = useState("");
  // const [openTicket, setOpenTicket] = useState("");
  // const [closedTicket, setClosedTicket] = useState("");
  // const [zones, setZones] = useState(["Today"]);
  // const [complianceData, setComplianceData] = useState([]);
  // const [deviceStat, setDeviceStat] = useState({});

  // const fetchAllData = async () => {
  //   const response1 = await getTotalDevice(entityId);
  //   // console.log(response1,'this is ')
  //   setTotalDevices(response1);
  //   const response2 = await getActiveDevice(entityId);
  //   setActiveDevice(response2);
  //   const response3 = await getInactiveDevice(entityId);
  //   setInActiveDevice(response3);
  //   const response4 = await getTotalTicket(entityId);
  //   setTotalTicket(response4);
  //   const response5 = await getOpenTicket(entityId);
  //   setOpenTicket(response5);
  //   const response6 = await getClosedTicket(entityId);
  //   setClosedTicket(response6);
  // };

  // const fetchGraph = async () => {
  //   const newComplianceData = [];
  //   const promises = [];

  //   for (const zone of zones) {
  //     let promise;
  //     if (zone === "Today") {
  //       promise = getCompliance(entityId);
  //     } else {
  //       promise = getComplianceByZone(entityId, zone);
  //     }
  //     promises.push(promise);
  //   }

  //   try {
  //     const responses = await Promise.all(promises);

  //     responses.forEach((response, index) => {
  //       let comp = [];
  //       let nonComp = [];
  //       let dates = [];

  //       if (
  //         Array.isArray(response) &&
  //         response.every((item) => typeof item === "object")
  //       ) {
  //         comp = response.map((item) => item?.Complient);
  //         nonComp = response.map((item) => item?.Non_Complient);
  //         dates = response.map((item) => item?.datecon);
  //       } else {
  //         console.error("Invalid response format for zone:", zones[index]);
  //       }

  //       newComplianceData.push({ zone: zones[index], comp, nonComp, dates });
  //     });

  //     setComplianceData(newComplianceData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // const fetchCompliance = async () => {
  //   const response = await getCompliance(entityId);
  //   setDeviceStat(response[response.length - 1]);
  // };

  // useEffect(() => {
  //   fetchAllData();
  //   fetchCompliance();
  // }, []);

  // useEffect(() => {
  //   fetchGraph();
  // }, [zones]);

  // document.title = "EntityDashboard";

  // const handleZoneChange = (selectedZone) => {
  //   let newZones;

  //   if (selectedZone === "South") {
  //     newZones =
  //       zones.includes("South L") && zones.includes("South U")
  //         ? zones.filter((zone) => zone !== "South L" && zone !== "South U")
  //         : [...zones, "South L", "South U"];
  //   } else if (selectedZone === "ECOMOOH") {
  //     newZones =
  //       zones.includes("ECOM") && zones.includes("OOH")
  //         ? zones.filter((zone) => zone !== "ECOM" && zone !== "OOH")
  //         : [...zones, "ECOM", "OOH"];
  //   } else {
  //     newZones = zones.includes(selectedZone)
  //       ? zones.filter((zone) => zone !== selectedZone)
  //       : [...zones, selectedZone];
  //   }

  //   setZones(newZones);
  // };

  // const renderComplianceCharts = () => {
  //   return complianceData.map((data, index) => (
  //     <Col lg="6" key={index}>
  //       <Card className={"p-2"}>
  //         <CardTitle>{data.zone}</CardTitle>
  //         <Compliance
  //           compliant={data.comp}
  //           nonCompliant={data.nonComp}
  //           dates={data.dates}
  //           zone={data.zone}
  //         />
  //       </Card>
  //     </Col>
  //   ));
  // };

  // const renderZoneButtons = () => {
  //   const zoneOptions = [
  //     "Today",
  //     "Weekly",
  //     "Monthly",
  //     "Yearly",
  //     // "West",
  //     // "MT",
  //     // "ECOMOOH",
  //   ];
  //   return zoneOptions.map((zone) => {
  //     const isActive =
  //       (zone === "South" &&
  //         zones.includes("South L") &&
  //         zones.includes("South U")) ||
  //       (zone === "ECOMOOH" &&
  //         zones.includes("ECOM") &&
  //         zones.includes("OOH")) ||
  //       zones.includes(zone);

  //     return (
  //       <button
  //         key={zone}
  //         className={`btn btn-outline-primary mx-1 ${isActive ? "active" : ""}`}
  //         onClick={() => handleZoneChange(zone)}
  //       >
  //         {zone}
  //       </button>
  //     );
  //   });
  // };

  return (
    <React.Fragment>
      {entityId===1?<BelagaviDashboard/>:entityId===2?<PuducheryDashboard/>:<DefaultDashboard/>}
    </React.Fragment>
  );
};

EntityDashboard.propTypes = {
  t: PropTypes.any,
};

export default withTranslation()(EntityDashboard);
