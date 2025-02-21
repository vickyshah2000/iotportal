import React, { useMemo, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from "./TableContainer";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { fetchWithTokenRefresh } from "../../helpers/AuthType/backend";

function DeviceInstallTable() {
  const base_url = import.meta.env.VITE_BASE_URL;
  const base_url2 = import.meta.env.VITE_BASE_URL2;
  const history = useHistory();
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loding, setLoading] = useState();

  const location = useLocation();
  const entityId = location.state.entityId;
  // console.log(entityId,"sdfsfs")
  const deviceid = location.state.deviceid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithTokenRefresh({
          url: `${base_url2}/api/DeviceInstallation/DeviceInstallation/${deviceid}`,
        });
        setData(response.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        setError(error); // Set error if there's an error in fetching data
        setLoading(false); // Set loading to false if there's an error
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [base_url2, entityId]);

  const EntityNameCell = ({ value }) => {
    return (
      <div>
        {/* Render the first image */}
        <img src={value.image1} alt="Image 1" style={{ marginRight: "5px" }} />
        {/* Render a vertical line */}
        <span
          style={{
            borderLeft: "1px solid black",
            height: "20px",
            marginRight: "5px",
          }}
        ></span>
        {/* Render the second image */}
        <img src={value.image2} alt="Image 2" style={{ marginRight: "5px" }} />
        {/* Render another vertical line */}
        <span
          style={{
            borderLeft: "1px solid black",
            height: "20px",
            marginRight: "5px",
          }}
        ></span>
        {/* Render the third image */}
        {/* <img src={value.image3} alt="Image 3" style={{ marginRight: "5px" }} /> */}
      </div>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        Cell: ({ row }) => <div>{row.index + 1}</div>,
      },
      {
        Header: "Images",
        accessor: "image_urls", // Assuming "images" property contains the URLs of the three images
        disableFilters: true,
        Cell: ({ row }) => (
          <div>
            {/* Image click handler to open modal */}
            <img
              src={`${base_url2}${row.original.image_urls?.[0] || ''}`}
              alt="no image"
              height={50}
              width={50}
              style={{ cursor: 'pointer' }}
            />
          </div>
        ),
      },

      {
        Header: "Name",
        accessor: "Name",
        disableFilters: true,
      },
      {
        Header: "Status",
        // accessor:"status",
        // disableFilters: true,
        Cell: ({ row }) => <div>Active</div>,
      },
      {
        Header: "Addressline1",
        accessor: "addressline1",
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
        Header: "Date",
        accessor: "installDate",
        disableFilters: true,
      },
    ],
    []
  );

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Tables" breadcrumbItem="Device Install" />
        <TableContainer
          columns={columns}
          data={data || []}
          isGlobalFilter={true}
          isAddOptions={true}
          customPageSize={10}
          className="custom-header-css"
        />
      </div>
    </div>
  );
}

DeviceInstallTable.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default DeviceInstallTable;
