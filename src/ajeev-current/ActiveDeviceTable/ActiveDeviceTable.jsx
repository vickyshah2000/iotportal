import React, { useEffect, useMemo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from "./TableContainer";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { fetchWithTokenRefresh } from "../../helpers/AuthType/backend";
import Cookies from "js-cookie";

function ActiveDeviceTable() {
  const base_url = import.meta.env.VITE_BASE_URL;
  const base_url4 = import.meta.env.VITE_BASE_URL4;
  const [floodData, setFloodData] = useState([]);

  const history = useHistory();

  const userCookie = Cookies.get("authUser");
  const token = userCookie ? JSON.parse(userCookie).access : null;

  const entityId = userCookie
    ? JSON.parse(userCookie).entity_id.entity_id
    : null;
  const role = userCookie ? JSON.parse(userCookie).role : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchWithTokenRefresh({
          url: `${base_url4}/api/FloodSensor/deviceDetails/inactive?entityId=${entityId}`,
        });
        setFloodData(res.data || []);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [base_url4]);

  const columns = [
    {
      Header: "S.No",
      Cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      Header: "Image",
      Cell: ({ row }) => <img src={""} alt="no image" />,
    },
    {
      Header: "Asset Id",
      accessor: "Remarks",
      disableFilters: true,
    },
    {
      Header: "Device Name",
      accessor: "device_name",
      disableFilters: true,
    },
    {
      Header: "IMEI",
      accessor: "imie",
      disableFilters: true,
    },
    {
      Header: "Address",
      accessor: "addressline1",
      disableFilters: true,
    },
    {
      Header: "State",
      accessor: "statename",
      disableFilters: true,
    },
    {
      Header: "Zone",
      accessor: "zonename",
      disableFilters: true,
    },
    {
      Header: "Ward",
      accessor: "wardname",
      disableFilters: true,
    },
    {
      Header: "Person",
      accessor: "contect_person",
      disableFilters: true,
    },
    {
      Header: "InstallDate",
      accessor: "installDate",
      disableFilters: true,
    },
    {
      Header: "Status",
      accessor: "Status",
      disableFilters: true,
    },
  ];
  return (
    <div className="page-content">
      <div className="container-fluid">
        {/* <Breadcrumbs title="Tables" breadcrumbItem="Device Table" /> */}
        <TableContainer
          columns={columns}
          data={floodData}
          isGlobalFilter={true}
          isAddOptions={true}
          customPageSize={10}
          className="custom-header-css"
          // entityId={entityId}
        />
      </div>
    </div>
  );
}

ActiveDeviceTable.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default ActiveDeviceTable;
