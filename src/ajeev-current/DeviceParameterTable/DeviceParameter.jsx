// src/components/filter.
import React, { useEffect, useMemo, useState } from "react";
import PropTypes, { func } from "prop-types";

//import components
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from "./TableContainer";
import { Button } from "reactstrap";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import { fetchWithTokenRefresh } from "../../helpers/AuthType/backend";

function DeviceParameter() {
  const base_url = import.meta.env.VITE_BASE_URL;
  const base_url2 = import.meta.env.VITE_BASE_URL2;
  const history = useHistory();
  const location = useLocation();

  const deviceId = location.state.deviceId;
  const deviceMake = location.state.deviceMake;
  const deviceModel = location.state.deviceModel;
  const deviceName = location.state.deviceName;
  // console.log("device parameter table::device id", deviceId);
  // console.log("device parameter table::device make", deviceMake);
  // console.log("device parameter table::device model", deviceModel);
  // console.log("device parameter table::device name", deviceName);
  


  const [data, setData] = useState([]);

  async function getParameterDetails() {
      try {
          const res = await axios.get(`${base_url2}/api/DeviceAttribute/attributes/${deviceId}`);
          const data = res.data;
          setData(data);    
      } catch (error) {
          console.error("Error fetching data: ", error);
      }
  }
  
  useEffect(() => {
      getParameterDetails();
  }, []);
  
  async function handledelete(id) {
      try {
          await axios.delete(`${base_url2}/api/DeviceAttribute?deviceId=${deviceId}&attributeId=${id}`);
          alert("Attribute delete successfully");
  
          // Instead of calling getParameterDetails(), remove the deleted attribute from state
          setData(prevData => prevData.filter(item => item.id !== id)); // Remove deleted attribute from the data
  
      } catch (error) {
          console.error("Error deleting attribute:", error);
          alert("Failed to delete attribute. Please try again.");
      }
  }
  

  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        Cell: ({ row }) => {
          return <div>{row.index + 1}</div>;
        },
      },
    //   {
    //     Header: "Device Name",
    //     accessor: "device_name",
    //     disableFilters: true,
    //   },
    //   {
    //     Header: "Model",
    //     accessor: "model",
    //     disableFilters: true,
    //   },
      {
        Header: "Parameter Name",
        accessor: "name",
        disableFilters: true,
      },
      {
        Header: "Unit",
        accessor: "unit",
        disableFilters: true,
      },
      {
        Header: "Min Value",
        accessor: "min_value",
        disableFilters: true,
      },
      {
        Header: "Max Value",
        accessor: "max_value",
        disableFilters: true,
      },
      {
        Header: "Standard Value",
        accessor: "standard_value",
        disableFilters: true,
      },
      {
        Header: "Remarks",
        accessor: "remarks",
        disableFilters: true,
      },

      {
        Header: "Action",
        display: "action",
        Cell: ({ row }) => (
          <div className="d-flex justify-content-around align-items-center">
            <Button
            className="btn-danger"
            onClick={() => handledelete(row.original.id)}
            style={{ lineHeight: "1" }}
            title="delete"
          >
            <i className="bx bxs-trash" style={{ fontSize: "large" }}></i>
          </Button>
          </div>
        ),
        disableFilters: true,
        disableSortBy: true,
      },
    ],
    []
  );

  //meta title
  document.title =
    "Data Parameter Tables | Ajeevi IOT";

  return (
    <div className="page-content">
      <div className="container-fluid">
        {/* <Breadcrumbs title="Tables" breadcrumbItem="Device Parameter Table" /> */}
        {/* <Table columns={columns} data={data} /> */}
        {data ? (
          <TableContainer
            columns={columns}
            data={data}
            isGlobalFilter={true}
            isAddOptions={true}
            customPageSize={10}
            className="custom-header-css"
            deviceId={deviceId}
            deviceMake={deviceMake}
            deviceModel={deviceModel}
            deviceName={deviceName}
          />
        ) : (
          <TableContainer
            columns={columns}
            data={[]}
            isGlobalFilter={true}
            isAddOptions={true}
            customPageSize={10}
            className="custom-header-css"
            deviceId={deviceId}
            deviceMake={deviceMake}
            deviceModel={deviceModel}
            deviceName={deviceName}
          />
        )}
      </div>
    </div>
  );
}
DeviceParameter.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default DeviceParameter;
// // src/components/filter.
// import React, { useEffect, useMemo, useState } from "react";
// import PropTypes, { func } from "prop-types";

// //import components
// import Breadcrumbs from "../../components/Common/Breadcrumb";
// import TableContainer from "./TableContainer";
// import { Button } from "reactstrap";
// import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
// import axios from "axios";
// import { fetchWithTokenRefresh } from "../../helpers/AuthType/backend";

// function DeviceParameter() {
//   const base_url = import.meta.env.VITE_BASE_URL;
//   const history = useHistory();
//   const location = useLocation();

//   const deviceId = location.state.deviceId;
//   const deviceMake = location.state.deviceMake;
//   const deviceModel = location.state.deviceModel;
//   const deviceName = location.state.deviceName;
//   console.log("device parameter table::device id", deviceId);
//   console.log("device parameter table::device make", deviceMake);
//   console.log("device parameter table::device model", deviceModel);
//   console.log("device parameter table::device name", deviceName);
  


//   const [data, setData] = useState([]);

//   useEffect(() => {
//     async function getParameterDetails(base_url) {
//       const res= await fetchWithTokenRefresh({url: `${base_url}/api/device-attributeDetails/${deviceId}/`})
//       setData(res.data);
//     }
//     getParameterDetails(base_url);
//   }, []);

//   const columns = useMemo(
//     () => [
//       {
//         Header: "S.No",
//         Cell: ({ row }) => {
//           return <div>{row.index + 1}</div>;
//         },
//       },
//     //   {
//     //     Header: "Device Name",
//     //     accessor: "device_name",
//     //     disableFilters: true,
//     //   },
//     //   {
//     //     Header: "Model",
//     //     accessor: "model",
//     //     disableFilters: true,
//     //   },
//       {
//         Header: "Parameter Name",
//         accessor: "name",
//         disableFilters: true,
//       },
//       {
//         Header: "Unit",
//         accessor: "unit",
//         disableFilters: true,
//       },
//       {
//         Header: "Min Value",
//         accessor: "min_value",
//         disableFilters: true,
//       },
//       {
//         Header: "Max Value",
//         accessor: "max_value",
//         disableFilters: true,
//       },
//       {
//         Header: "Standard Value",
//         accessor: "standard_value",
//         disableFilters: true,
//       },
//       {
//         Header: "Remarks",
//         accessor: "remarks",
//         disableFilters: true,
//       },

//       // {
//       //   Header: "Action",
//       //   display: "action",
//       //   Cell: (row) => (
//       //     <div className="d-flex justify-content-around align-items-center">
//       //       {/* <Button
//       //         id={editBtn${row.cell.row.id}}
//       //         //   onClick={handleEdit(row.cell.row)}
//       //         className="btn-warning"
//       //         style={{ lineHeight: "1" }}
//       //         //   onMouseEnter={() =>
//       //         //     toggle(editBtn${row.cell.row.id}, "Edit Pole")
//       //         //   }
//       //         //   onMouseLeave={() => toggle(null, "")}
//       //       >
//       //         <i className="bx bxs-edit" style={{ fontSize: "large" }}></i>
//       //       </Button> */}
//       //       {/* <Button
//       //         id={addBtn${row.cell.row.id}}
//       //         onClick={() => handleParameter(row)}
//       //         className="btn-success m-2"
//       //         style={{ lineHeight: "1" }}
//       //         title="RD details here"
//       //       >
//       //         <iconify-icon icon="uil:user"></iconify-icon>
//       //         Add Parameter
//       //       </Button> */}
//       //     </div>
//       //   ),
//       //   disableFilters: true,
//       //   disableSortBy: true,
//       // },
//     ],
//     []
//   );

//   //meta title
//   document.title =
//     "Data Parameter Tables | Ajeevi IOT";

//   return (
//     <div className="page-content">
//       <div className="container-fluid">
//         {/* <Breadcrumbs title="Tables" breadcrumbItem="Device Parameter Table" /> */}
//         {/* <Table columns={columns} data={data} /> */}
//         {data ? (
//           <TableContainer
//             columns={columns}
//             data={data}
//             isGlobalFilter={true}
//             isAddOptions={true}
//             customPageSize={10}
//             className="custom-header-css"
//             deviceId={deviceId}
//             deviceMake={deviceMake}
//             deviceModel={deviceModel}
//             deviceName={deviceName}
//           />
//         ) : (
//           <TableContainer
//             columns={columns}
//             data={[]}
//             isGlobalFilter={true}
//             isAddOptions={true}
//             customPageSize={10}
//             className="custom-header-css"
//             deviceId={deviceId}
//             deviceMake={deviceMake}
//             deviceModel={deviceModel}
//             deviceName={deviceName}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
// DeviceParameter.propTypes = {
//   preGlobalFilteredRows: PropTypes.any,
// };

// export default DeviceParameter;
