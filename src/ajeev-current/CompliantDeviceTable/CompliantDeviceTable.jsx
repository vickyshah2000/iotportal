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

function CompliantDeviceTable(props) {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [data, setData] = useState([]);
  const { Type } = props.location.state;

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
        const response = await fetchWithTokenRefresh({
          url: `${base_url}/api/complaint-device/2/`,
        });
        const compliantData = response.data.filter(
          (item) => item.compliance_status === "Compliant"
        );
        const nonCompliantData = response.data.filter(
          (item) => item.compliance_status === "Not Compliant"
        );
        if (Type === "Compliant") {
          setData(compliantData);
        } else {
          setData(nonCompliantData);
        }
        console.log(compliantData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [base_url]);

  const columns = useMemo(() => [
    {
      Header: "S.No",
      Cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      Header: "Image",
      Cell: ({ row }) => <img src={""} alt="no image" />,
    },
    {
      Header: "Date/Time",
      accessor: `lastreportingtime`,
      disableFilters: true,
    },
    {
      Header: "Temperature",
      accessor: "temperature",
      disableFilters: true,
    },
    {
      Header: "InstallDate",
      accessor: `InstallDate`,
      disableFilters: true,
    },
    {
      Header: "DB Code",
      accessor: "DBCode",
      disableFilters: true,
    },
    {
      Header: "DB Name",
      accessor: "DBName",
      disableFilters: true,
    },
    {
      Header: "Region",
      accessor: "regionname",
      disableFilters: true,
    },
    {
      Header: "Zone",
      accessor: "zonename",
      disableFilters: true,
    },
    {
      Header: "ASM Name",
      accessor: "ASM",
      disableFilters: true,
    },
    {
      Header: "SO Name",
      accessor: "SO",
      disableFilters: true,
    },
    {
      Header: "Unique Device Number",
      accessor: "imie",
      disableFilters: true,
    },
    {
      Header: "Charging",
      accessor: "ischarging",
      Cell: ({ value }) => (
        <div className="d-flex align-items-center">
          <div
            className={value == "1" ? "indicator-green" : "indicator-red"}
          ></div>
          <div className="ps-4">
            {value == "1" ? "Charging" : "Not-Charging"}
          </div>
        </div>
      ),
      disableFilters: true,
      disableSortBy: true,
    },
    {
      Header: "Remarks",
      accessor: "Remarks",
      disableFilters: true,
    },
  ]);
  return (
    <div className="page-content">
      <div className="container-fluid">
        {/* <Breadcrumbs title="Tables" breadcrumbItem="Device Table" /> */}
        <TableContainer
          columns={columns}
          data={data}
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

CompliantDeviceTable.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default CompliantDeviceTable;
