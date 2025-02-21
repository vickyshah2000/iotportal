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

function DeviceTable() {
  const base_url = import.meta.env.VITE_BASE_URL;
  const base_url2 = import.meta.env.VITE_BASE_URL2;
  const [data, setData] = useState([]);
  const location = useLocation();
  // const entityId = location.state?.entityId;
  // console.log("entity id in Device table:- ", entityId);
  // const deviceType = location.state?.deviceType;
  // console.log("Devive type in Device table:- ", deviceType);

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
        const res=await axios.get(`${base_url2}/api/DeviceAssign/unassigned`)
        setData(res.data || []);
      } catch (error) {
        console.error("Error fetching data:",error)
      }
      // try {
      //   if (role == "Admin") {
      //     const res = await fetchWithTokenRefresh({
      //       url: `${base_url}/api/device-details/`,
      //     });
      //     setData(res.data || []);
      //     console.log(res.data);
      //   } else {
      //     const res = await fetchWithTokenRefresh({
      //       url: `${base_url}/api/device-details/${entityId}/`,
      //     });
      //     setData(res.data);
      //     console.log(res.data);
      //   }
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      // }
    };
    fetchData();
  }, [base_url2]);

  const handleAssignDevice = useCallback(
    (row) => {
      console.log("device id ", row);
      history.push("/device-assign", { deviceId: row.original.id });
    },
    [history]
  );

  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        Cell: ({ row }) => <div>{row.index + 1}</div>,
      },
      {
        Header: "Device Type",
        accessor: "device_name",
        disableFilters: true,
      },
      {
        Header: "Unique Device Number",
        accessor: "imie",
        disableFilters: true,
      },
     

      {
        Header: "Action",
        display: "action",
        Cell: ({ row }) => (
          <div className="d-flex">
            <Button
              id={`addBtn${row.id}`}
              onClick={() => handleAssignDevice(row)}
              className="btn btn-info m-2"
              style={{ lineHeight: "1" }}
              title="Show Parameter"
            >
              Assign Device
            </Button>
          </div>
        ),
        disableFilters: true,
        disableSortBy: true,
      },
    ],
    [handleAssignDevice]
  );

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

DeviceTable.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default DeviceTable;
// import React, { useEffect, useMemo, useState, useCallback } from "react";
// import PropTypes from "prop-types";
// import Breadcrumbs from "../../components/Common/Breadcrumb";
// import TableContainer from "./TableContainer";
// import { Button } from "reactstrap";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
// import { fetchWithTokenRefresh } from "../../helpers/AuthType/backend";
// import Cookies from "js-cookie";

// function DeviceTable() {
//   const base_url = import.meta.env.VITE_BASE_URL;
//   const [data, setData] = useState([]);
//   const location = useLocation();
//   // const entityId = location.state?.entityId;
//   // console.log("entity id in Device table:- ", entityId);
//   // const deviceType = location.state?.deviceType;
//   // console.log("Devive type in Device table:- ", deviceType);

//   const history = useHistory();

//   const userCookie = Cookies.get("authUser");
//   const token = userCookie ? JSON.parse(userCookie).access : null;

//   const entityId = userCookie
//     ? JSON.parse(userCookie).entity_id.entity_id
//     : null;
//   const role = userCookie ? JSON.parse(userCookie).role : null;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (role == "Admin") {
//           const res = await fetchWithTokenRefresh({
//             url: `${base_url}/api/device-details/`,
//           });
//           setData(res.data || []);
//           console.log(res.data);
//         } else {
//           const res = await fetchWithTokenRefresh({
//             url: `${base_url}/api/device-details/${entityId}/`,
//           });
//           setData(res.data);
//           console.log(res.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [base_url]);

//   const handleAssignDevice = useCallback(
//     (row) => {
//       console.log("device id ", row);
//       history.push("/device-assign", { deviceId: row.original.id });
//     },
//     [history]
//   );

//   const columns = useMemo(
//     () => [
//       {
//         Header: "S.No",
//         Cell: ({ row }) => <div>{row.index + 1}</div>,
//       },
//       {
//         Header: "Unique Device Number",
//         accessor: "imie",
//         disableFilters: true,
//       },
//       {
//         Header: "Device Type",
//         accessor: `device_name`,
//         disableFilters: true,
//       },

//       {
//         Header: "Action",
//         display: "action",
//         Cell: ({ row }) => (
//           <div className="d-flex">
//             <Button
//               id={`addBtn${row.id}`}
//               onClick={() => handleAssignDevice(row)}
//               className="btn btn-info m-2"
//               style={{ lineHeight: "1" }}
//               title="Show Parameter"
//             >
//               Assign Device
//             </Button>
//           </div>
//         ),
//         disableFilters: true,
//         disableSortBy: true,
//       },
//     ],
//     [handleAssignDevice]
//   );

//   return (
//     <div className="page-content">
//       <div className="container-fluid">
//         {/* <Breadcrumbs title="Tables" breadcrumbItem="Device Table" /> */}
//         <TableContainer
//           columns={columns}
//           data={data}
//           isGlobalFilter={true}
//           isAddOptions={true}
//           customPageSize={10}
//           className="custom-header-css"
//           // entityId={entityId}
//         />
//       </div>
//     </div>
//   );
// }

// DeviceTable.propTypes = {
//   preGlobalFilteredRows: PropTypes.any,
// };

// export default DeviceTable;
