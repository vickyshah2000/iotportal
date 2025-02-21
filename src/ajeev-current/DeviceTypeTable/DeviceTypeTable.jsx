import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from "./TableContainer";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { fetchWithTokenRefresh } from "../../helpers/AuthType/backend";

function DeviceTypeTable() {
  const base_url = import.meta.env.VITE_BASE_URL;
  const base_url2 = import.meta.env.VITE_BASE_URL2;
  const [data, setData] = useState([]);
  const history = useHistory();

  const handleParameter = (row) => {
    // console.log(row);
    // console.log("device id ", row.original.id);
    // Example: Redirect to a parameter table page
    history.push("/device-parameter", {
      deviceId: row.original.id,
      deviceMake: row.original.make,
      deviceModel: row.original.model,
      deviceName: row.original.deviceName,
    });
  };

   //get data
   const fetchData = async () => {
    try {
      // const res = await fetchWithTokenRefresh({url: `${base_url}/api/master-device-type/`})
      const res =await axios.get( `${base_url2}/api/MasterDeviceType`)
      setData(res.data);
      // console.log(res)

    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, such as displaying an error message to the user
    }
  };
useEffect(() => {
  fetchData(); // Call the asynchronous function
}, []);

  function handleEdit(row){
    history.push("/edit-device",{deviceId:row.original.id})
  }
  async function handledelete(id){
    const res=await axios.delete(`${base_url2}/api/MasterDeviceType/${id}`)
    // console.log(res.data,"hfhgjv")
    alert("Delete successfully")
    fetchData()
  }

   // handle component
   const handleComponent=(row)=>{
    // console.log(row.original.id)
    history.push("/component-table",{id:row.original.id})
    }

   

  const columns = useMemo(
    
    () => [
      {
        Header: "S.No",
        Cell: ({ row }) => <div>{row.index + 1}</div>,
      },
      // {
      //   Header: "Image",
      //   Cell: ({ row }) => {
      //     const imageSrc = (row.original.images && row.original.images.length > 0) ? row.original.images[0].image : '';
      //     return (
      //       <div>
      //         <img width={50} src={imageSrc} alt="no image" /> 
      //       </div>
      //     );
      //   },
      // },
      {
        Header: "Device Name",
        accessor: "deviceName",
        disableFilters: true,
      },
      {
        Header: "Make",
        accessor: "make",
        disableFilters: true,
      },

      {
        Header: "Model",
        accessor: "model",
        disableFilters: true,
      },
      {
        Header: "Remarks",
        accessor: "remarks",
        disableFilters: true,
      },
      // {
      //   Header: "Date",
      //   accessor: "",
      //   disableFilters: true,
      // },
      {
        Header: "Action",
        display: "action",
        Cell: ({ row }) => (
          <div className="d-flex justify-content-around align-items-center">
            <Button
            className="btn-warning"
            onClick={() => handleEdit(row)}
            style={{ lineHeight: "1" }}
            title="Edit"
          >
            <i className="bx bxs-edit" style={{ fontSize: "large" }}></i>
          </Button>
            <Button
            className="btn-danger"
            onClick={() => handledelete(row.original.id)}
            style={{ lineHeight: "1" }}
            title="delete"
          >
            <i className="bx bxs-trash" style={{ fontSize: "large" }}></i>
          </Button>
            <Button
              id={`addBtn${row.id}`}
              onClick={() => handleParameter(row)}
              className="btn btn-info m-1"
              // style={{ lineHeight: "1" }}
              title="Show Parameter"
            >
              Show Parameter
            </Button>
            <Button
              id={`addBtn${row.id}`}
              onClick={() => handleComponent(row)}
              className="btn btn-success m-1"
              // style={{ lineHeight: "1" }}
              title="Show Component"
            >
              Show Component
            </Button>
          </div>
        ),
        disableFilters: true,
        disableSortBy: true,
      },
    ],
    []
  );

  return (
    <div className="page-content">
      <div className="container-fluid">
        {/* <Breadcrumbs title="Tables" breadcrumbItem="Device Type Table" /> */}
        {data ? (
          <TableContainer
            columns={columns}
            data={data}
            isGlobalFilter={true}
            isAddOptions={true}
            customPageSize={10}
            className="custom-header-css"
          />
        ) : (
          <TableContainer
            columns={columns}
            data={[]}
            isGlobalFilter={true}
            isAddOptions={true}
            customPageSize={10}
            className="custom-header-css"
          />
        )}
      </div>
    </div>
  );
}

DeviceTypeTable.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default DeviceTypeTable;

// import React, { useEffect, useMemo, useState } from "react";
// import PropTypes from "prop-types";
// import Breadcrumbs from "../../components/Common/Breadcrumb";
// import TableContainer from "./TableContainer";
// import { Button } from "reactstrap";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// import { fetchWithTokenRefresh } from "../../helpers/AuthType/backend";

// function DeviceTypeTable() {
//   const base_url = import.meta.env.VITE_BASE_URL;
//   const [data, setData] = useState([]);
//   const history = useHistory();

//   const handleParameter = (row) => {
//     console.log(row);
//     console.log("device id ", row.original.id);
//     // Example: Redirect to a parameter table page
//     history.push("/device-parameter", {
//       deviceId: row.original.id,
//       deviceMake: row.original.make,
//       deviceModel: row.original.model,
//       deviceName: row.original.name,
//     });
//   };

//   function handleEdit(row){
//     history.push("/edit-device",{deviceId:row.original.id})
//   }

//    // handle component
//    const handleComponent=(row)=>{
//     console.log(row.original.id)
//     history.push("/component-table",{id:row.original.id})
//     }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetchWithTokenRefresh({url: `${base_url}/api/master-device-type/`})
//         setData(res.data);
//         console.log(res.data)

//       } catch (error) {
//         console.error("Error fetching data:", error);
//         // Handle error, such as displaying an error message to the user
//       }
//     };

//     fetchData(); // Call the asynchronous function
//   }, []);
  

//   const columns = useMemo(
    
//     () => [
//       {
//         Header: "S.No",
//         Cell: ({ row }) => <div>{row.index + 1}</div>,
//       },
//       // {
//       //   Header: "Image",
//       //   Cell: ({ row }) => {
//       //     const imageSrc = (row.original.images && row.original.images.length > 0) ? row.original.images[0].image : '';
//       //     return (
//       //       <div>
//       //         <img width={50} src={imageSrc} alt="no image" /> 
//       //       </div>
//       //     );
//       //   },
//       // },
//       {
//         Header: "Device Name",
//         accessor: "name",
//         disableFilters: true,
//       },
//       {
//         Header: "Make",
//         accessor: "make",
//         disableFilters: true,
//       },

//       {
//         Header: "Model",
//         accessor: "model",
//         disableFilters: true,
//       },
//       {
//         Header: "Remarks",
//         accessor: "remarks",
//         disableFilters: true,
//       },
//       // {
//       //   Header: "Date",
//       //   accessor: "",
//       //   disableFilters: true,
//       // },
//       {
//         Header: "Action",
//         display: "action",
//         Cell: ({ row }) => (
//           <div className="d-flex justify-content-around align-items-center">
//             <Button
//             className="btn-warning"
//             onClick={() => handleEdit(row)}
//             style={{ lineHeight: "1" }}
//             title="Edit"
//           >
//             <i className="bx bxs-edit" style={{ fontSize: "large" }}></i>
//           </Button>
//             <Button
//               id={`addBtn${row.id}`}
//               onClick={() => handleParameter(row)}
//               className="btn btn-info m-1"
//               // style={{ lineHeight: "1" }}
//               title="Show Parameter"
//             >
//               Show Parameter
//             </Button>
//             <Button
//               id={`addBtn${row.id}`}
//               onClick={() => handleComponent(row)}
//               className="btn btn-success m-1"
//               // style={{ lineHeight: "1" }}
//               title="Show Component"
//             >
//               Show Component
//             </Button>
//           </div>
//         ),
//         disableFilters: true,
//         disableSortBy: true,
//       },
//     ],
//     []
//   );

//   return (
//     <div className="page-content">
//       <div className="container-fluid">
//         {/* <Breadcrumbs title="Tables" breadcrumbItem="Device Type Table" /> */}
//         {data ? (
//           <TableContainer
//             columns={columns}
//             data={data}
//             isGlobalFilter={true}
//             isAddOptions={true}
//             customPageSize={10}
//             className="custom-header-css"
//           />
//         ) : (
//           <TableContainer
//             columns={columns}
//             data={[]}
//             isGlobalFilter={true}
//             isAddOptions={true}
//             customPageSize={10}
//             className="custom-header-css"
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// DeviceTypeTable.propTypes = {
//   preGlobalFilteredRows: PropTypes.any,
// };

// export default DeviceTypeTable;

