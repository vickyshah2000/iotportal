

// src/components/filter.
import React, { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";

//import components
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from "./TableContainer";
import { Button } from "reactstrap";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { fetchWithTokenRefresh } from "../../helpers/AuthType/backend";
function AddressTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(''); // State to manage error state

  const [pageNumber, setPageNumber] = useState(1);
  const [customPageSize, setCustomPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0); // Initialize totalCount to 


  const location = useLocation();
  const entityId = location.state.entityId;
  console.log("entity id in address table:- ", entityId);
  const entityName = location.state.entityName;
  console.log("entity name in address table:- ", entityName)

  const history = useHistory();
  const base_url = import.meta.env.VITE_BASE_URL;
  const base_url3 = import.meta.env.VITE_BASE_URL3;

  function handleContact(row) {
    // console.log("to send address id ", row.cell.row.original.entityAddressId);
    history.push("/contact-table", {
      addressId: row.cell.row.original.id,
      entityId: entityId,
      entityName: entityName
    });
  }

  const handleEdit = useCallback(
    (row) => {
      console.log("to send address id ", row.cell.row.original);
      history.push("/edit-address", {
        alldata: row.cell.row.original,
        entityId: entityId,
        entityName: entityName,
      });
    },
    [history]
  );

const fetchData = useCallback(async () => {
  try {
    const response = await fetchWithTokenRefresh({url:`${base_url3}/api/Entity/GetAddressesByEntityId?entityId=${entityId}&pageNumber=${pageNumber}&pageSize=${customPageSize}`,
    })
    // const response = await axios.get(`${base_url3}/api/Entity/GetAddressesByEntityId/${entityId}?pageNumber=${pageNumber}&pageSize=${customPageSize}`);
    setData(response.data.addresses);
    console.log(response,"this is responce");
    setLoading(false); // Set loading to false when data is fetched
    setTotalCount(response.data.totalCount);
  } catch (error) {
    setError(error); // Set error if there's an error in fetching data
    setLoading(false); // Set loading to false if there's an error
    console.error("Error fetching data:", error);
  }
}, [entityId, pageNumber, customPageSize]);  // Dependencies list to ensure the function is recalculated if any of these values change


  useEffect(() => {
    fetchData();
  }, [base_url3, customPageSize, pageNumber, entityId]);
  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        Cell: ({ row }) => (
          <div>{row.index + 1 + (pageNumber - 1) * customPageSize}</div>
        ),
      },  
      {
        Header: "Address line 1",
        accessor: "addressline1",
        disableFilters: true,
      },
      {
        Header: "Address Line 2",
        accessor: "Addressline2",
        disableFilters: true,
      },
      // {
      //   Header: "Country",
      //   accessor: "",
      //   disableFilters: true,
      // },
      {
        Header: "State",
        accessor: "statename",
        disableFilters: true,
      },
      {
        Header: "City",
        accessor: "cityname",
        // accessor: (row) => row.city_info.name,
        disableFilters: true,
      },

      {
        Header: "Ward",
        accessor: "wardname",
        disableFilters: true,
      },
      {
        Header: "Region",
        accessor: "regionname",
        disableFilters: true,
      },
      {
        Header: "Zone",
        accessor:"zonename",
        disableFilters: true,
      },
      {
        Header: "Pin code",
        accessor: "pincode",
        disableFilters: true,
      },
      {
        Header: "Longitude",
        accessor: "longitude",
        disableFilters: true,
      },
      {
        Header: "Latitude",
        accessor: "latitude",
        disableFilters: true,
      },
      {
        Header: "Address Type",
        accessor: "addressType",
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
        Cell: (row) => (
          <div className="d-flex justify-content-around align-items-center">
            <Button
              id={`editBtn${row.cell.row.id}`}
              onClick={() => handleEdit(row)}
              //   onClick={handleEdit(row.cell.row)}
              className="btn-warning"
              style={{ lineHeight: "1" }}
            //   onMouseEnter={() =>
            //     toggle(editBtn${row.cell.row.id}, "Edit Pole")
            //   }
            //   onMouseLeave={() => toggle(null, "")}
            >
              <i className="bx bxs-edit" style={{ fontSize: "large" }}></i>
            </Button>

            <Button
              id={`addBtn${row.cell.row.id}`}
              onClick={() => handleContact(row)}
              className="btn btn-info m-2"
              style={{ lineHeight: "1" }}
              null //   onMouseEnter={() =>
            //     toggle(addBtn${row.cell.row.id}, "Add Component")
            //   }
            //   onMouseLeave={() => toggle(, "")}
            >
              {/* <i className="bx bxs-location" style={{ fontSize: "large" }}></i> */}
              View Contact
            </Button>
          </div>
        ),
        disableFilters: true,
        disableSortBy: true,
      },
    ],
    [
      pageNumber,
      customPageSize,
    ]
  );

  //meta title
  document.title = "Address Table";

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Tables" breadcrumbItem="Address Table" />
        {/* Conditionally render the table based on loading and error states */}
        {data ? (
          // Render only the table header if there's no data
          <TableContainer
            columns={columns}
            data={data}
            isGlobalFilter={true}
            isAddOptions={true}
            className="custom-header-css"
            entityId={entityId}
            entityName={entityName}
            customPageSize={customPageSize}
            setCustomPageSize={setCustomPageSize}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            totalCount={totalCount}
          />
        ) : (
          // Render the table with data
          <TableContainer
            columns={columns}
            data={[]}
            isGlobalFilter={true}
            isAddOptions={true}
            customPageSize={customPageSize}
            setCustomPageSize={setCustomPageSize}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            totalCount={totalCount}
            className="custom-header-css"
            entityId={entityId}
            entityName={entityName}
          />
        )}
      </div>
    </div>
  );
}
AddressTable.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default AddressTable;
