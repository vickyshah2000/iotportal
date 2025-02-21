import React, { useMemo, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from "./TableContainer";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { fetchWithTokenRefresh } from "../../helpers/AuthType/backend";
import Cookies from 'js-cookie';

function DeviceAssign() {
  const base_url = import.meta.env.VITE_BASE_URL;
  const base_url3 = import.meta.env.VITE_BASE_URL3;
  const base_url2 = import.meta.env.VITE_BASE_URL2;
  const history = useHistory();
  const location = useLocation();
  const entityId = location.state.entityId;
  const entityName = location.state.entityName;

  const [data, setData] = useState([]);

  //get role****************************
  const role = Cookies.get('authUser') ? JSON.parse(Cookies.get('authUser')).role : '';


  const fetchData = useCallback(async () => {
    try {
      const response = await fetchWithTokenRefresh({
        url: `${base_url2}/api/DeviceAssign/DeviceAssign/${entityId}`,
      });
      setData(response.data); // Assuming response.data is an array of objects
      console.log("get data", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [base_url3]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRD = useCallback(
    (id) => {
      history.push("/RDsTable", { entityId: id.cell.row.original.EntityId });
    },
    [history]
  );

  const handleAddress = useCallback(
    (id) => {
      console.log("entity id  ", id.cell.row.original.entity_id);
      history.push("/address-table", {
        entityId: id.cell.row.original.EntityId,
      });
    },
    [history]
  );

  const handleDevice = useCallback(
    (id) => {
      console.log("entity id for device ", id.cell.row.original.EntityId);
      history.push("/device-table", {
        entityId: id.cell.row.original.EntityId,
      });
    },
    [history]
  );

  const handleViewInstallDetail = useCallback(
    (row) => {
      console.log("installation ", row)
      history.push("/device-install-table", {
        entityId: row.id,
        deviceid: row.deviceid
      });
    },
    [history]
  );
  const handleAddInstallDetail = useCallback(
    (row) => {
      console.log("add install device", row)
      history.push("/device-install", {
        entityId: row.EntityId,
        deviceid: row.deviceid
      });
    },
    [history]
  );

  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        Cell: ({ row }) => <div>{row.index + 1}</div>,
      },

      // {
      //   Header: "Device Name",
      //   accessor: "device_name",
      //   disableFilters: true,
      // },
      {
        Header: "Device Unique Number",
        accessor: "imie",
        disableFilters: true,
      },
      {
        Header: "Assign Address",
        accessor: "address",
        disableFilters: true,
      },
      {
        Header: "Contact Person",
        accessor: "person",
        disableFilters: true,
      },
      {
        Header: "Assigned date",
        // accessor: "installationdatetime",
        disableFilters: true,
        Cell: ({ row }) => {
          const assignedDate = new Date(row.original.installationdatetime);
          const formattedDate = assignedDate.toISOString().split("T")[0];
          return <p>{formattedDate}</p>;
        },
      },
      {
        Header: "Assigned Time",
        // accessor: "installationdatetime",
        disableFilters: true,
        Cell: ({ row }) => {
          const assignedTime = new Date(row.original.installationdatetime);
          const formattedTime = assignedTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          return <p>{formattedTime}</p>;
        },
      },
      {
        Header: "Remarks",
        accessor: "remarks",
        disableFilters: true,
      },
      {
        Header: "Action",
        display: "action",
        Cell: (row) => (
          <div className="d-flex justify-content-around align-items-center">
            {role === "Customer" ? null : <Button
              className="btn btn-warning"
              onClick={() => handleAddInstallDetail(row.cell.row.original)}
              style={{ lineHeight: "1" }}
              title="Add Installation details"
            >
              <i className="bx bx-devices" style={{ fontSize: "large" }}></i>
            </Button>}

            <Button
              className="btn btn-info"
              onClick={() => handleViewInstallDetail(row.cell.row.original)}
              style={{ lineHeight: "1" }}
              title="View Installation details"
            >
              <i className="bx bx-detail" style={{ fontSize: "large" }}></i>
            </Button>
          </div>
        ),
        disableFilters: true,
        disableSortBy: true,
      },
    ],
    [handleViewInstallDetail, handleRD, handleAddress, handleDevice]
  );

  document.title = "Device Install";

  return (
    <div className="page-content">
      <div className="container-fluid">
        {/* <Breadcrumbs title="Tables" breadcrumbItem="Device Assign" /> */}
        <TableContainer
          columns={columns}
          data={data || []}
          isGlobalFilter={true}
          isAddOptions={true}
          customPageSize={10}
          className="custom-header-css"
          entityName={entityName}
        />
      </div>
    </div>
  );
}

DeviceAssign.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default DeviceAssign;
