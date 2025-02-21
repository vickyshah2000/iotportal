import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from "./TableContainer";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { fetchWithTokenRefresh } from "../../helpers/AuthType/backend";
import Cookies from "js-cookie";

function FloodDevice() {
  const base_url = import.meta.env.VITE_BASE_URL;
  const base_url4 = import.meta.env.VITE_BASE_URL4;
  const [data, setData] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [customPageSize, setCustomPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0); // Initialize totalCount to 


  const history = useHistory();

  const userCookie = Cookies.get("authUser");
  const token = userCookie ? JSON.parse(userCookie).access : null;

  const entityId = userCookie
    ? JSON.parse(userCookie).entity_id.entity_id
    : null;
  const role = userCookie ? JSON.parse(userCookie).role : null;

  const deviceTypeId=entityId===2?9:8

  const handleGraph = (row) => {
    console.log("Clicked row:", row);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchWithTokenRefresh({
          url: `${base_url4}/api/Device/get-all-device-info?entityId=${entityId}&deviceTypeId=9&pageNumber=${pageNumber}&pageSize=${customPageSize}`,
        });
        setData(res.data.addresses || []);
        setTotalCount(res.data.totalCount);
        console.log(res.data.addresses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [base_url4, entityId, pageNumber, customPageSize]);

  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        Cell: ({ row }) => (
          <div>{row.index + 1 + (pageNumber - 1) * customPageSize}</div>
        ),
      },  
      // {
      //   Header: "Image",
      //   Cell: ({ row }) => <img src={""} alt="no image" />,
      // },
      {
        Header: "Addressline1",
        accessor: "Addressline1",
        disableFilters: true,
      },
      // {
      //   Header: "Addressline2",
      //   accessor: "addressline2",
      //   disableFilters: true,
      // },
      {
        Header: "IMEI",
        accessor: "imie",
        disableFilters: true,
      },
      {
        Header: "Ward",
        accessor: "Ward_Name",
        disableFilters: true,
      },
      // {
      //   Header: "zone",
      //   accessor: "zonename",
      //   disableFilters: true,
      // },
      {
        Header: "Person",
        accessor: "person",
        disableFilters: true,
      },
      {
        Header: "Installation Date",
        accessor: "InstallationDate",
        disableFilters: true,
      },
    ],
    [
      pageNumber,
      customPageSize,
    ]
  );
  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Tables" breadcrumbItem="Total Flood Sensor" />
        <TableContainer
          columns={columns}
          data={data}
          isGlobalFilter={true}
          isAddOptions={true}
          customPageSize={customPageSize}
          setCustomPageSize={setCustomPageSize}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          totalCount={totalCount}
          className="custom-header-css"
        />
      </div>
    </div>
  );
}

FloodDevice.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default FloodDevice;
