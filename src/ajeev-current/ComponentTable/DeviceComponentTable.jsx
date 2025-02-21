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

function DeviceComponentTable() {
  const base_url2 = import.meta.env.VITE_BASE_URL2;

  const [data, setData] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const masterId=location.state.id

  // const handleEdit = (id) => {
  //   console.log(id);
  //   history.push("/question-edit", { question: id,questionnaireId:questionnaireId,questionnaireName:questionnaireName });
  // };
 
  

  useEffect(() => {
    async function getComponentDetails(base_url2) {
      const res = await fetchWithTokenRefresh({url: `${base_url2}/api/Component/Component/${masterId}`})
      setData(res.data);
    }
    getComponentDetails(base_url2);
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        Cell: ({ row }) => {
          return <div>{row.index + 1}</div>;
        },
      },
      {
        Header: "device name",
        accessor: "device_name",
        disableFilters: true,
      },
      {
        Header: "component name",
        accessor: "name",
        disableFilters: true,
      },
      {
        Header: "install date",
        accessor: "installdate",
        disableFilters: true,
      },
      // {
      //   Header: "Action",
      //   display: "action",
      //   Cell: (row) => (
      //     <div className="d-flex justify-content-between">
      //       {/* <Button
      //         className="btn-warning"
      //         onClick={() => handleEdit(row.cell.row.original)}
      //         style={{ lineHeight: "1" }}
      //         title="Edit"
      //       >
      //         <i className="bx bxs-edit" style={{ fontSize: "large" }}></i>
      //       </Button> */}

      //       {/* <Button
      //         id={addBtn${row.cell.row.id}}
      //         onClick={() => handleParameter(row)}
      //         className="btn-success m-2"
      //         style={{ lineHeight: "1" }}
      //         title="RD details here"
      //       >
      //         <iconify-icon icon="uil:user"></iconify-icon>
      //         Add Parameter
      //       </Button> */}
      //     </div>
      //   ),
      //   disableFilters: true,
      //   disableSortBy: true,
      // },
    ],
    []
  );

  //meta title
  document.title =
    "Data Tables | Skote - Vite React Admin & Dashboard Template";

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Tables" breadcrumbItem="Component Table" />
        {/* <Table columns={columns} data={data} /> */}
        {data ? (
          <TableContainer
            columns={columns}
            data={data}
            isGlobalFilter={true}
            isAddOptions={true}
            customPageSize={10}
            className="custom-header-css"
            masterId={masterId}
          />
        ) : (
          <TableContainer
            columns={columns}
            data={[]}
            isGlobalFilter={true}
            isAddOptions={true}
            customPageSize={10}
            className="custom-header-css"
            masterId={masterId}
          />
        )}
      </div>
    </div>
  );
}
DeviceComponentTable.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default DeviceComponentTable;
