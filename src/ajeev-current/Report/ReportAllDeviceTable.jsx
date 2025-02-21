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

function AllDeviceTableReport() {
  const base_url = import.meta.env.VITE_BASE_URL;
  const base_url2 = import.meta.env.VITE_BASE_URL2;
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

  const handleGraph = (row) => {
    console.log("Clicked row:", row);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchWithTokenRefresh({
          url: `${base_url2}/api/DeviceInstallation/Puducherry/${entityId}/?page=${pageNumber}&pageSize=${customPageSize}`,
        });
        setData(res.data.data || []);
        setTotalCount(res.data.totalItems);
        console.log(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [base_url2, entityId, pageNumber, customPageSize]);

  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        Cell: ({ row }) => (
          <div>{row.index + 1 + (pageNumber - 1) * customPageSize}</div>
        ),
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
        accessor: "contact_person",
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
    ],
    [
      pageNumber,
      customPageSize,
    ]
  );
  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Tables" breadcrumbItem="Device Report" />
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

AllDeviceTableReport.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default AllDeviceTableReport;
