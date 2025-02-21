// src/components/filter.
import React, { useMemo } from "react";
import PropTypes from "prop-types";

//import components
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from "./TableContainer";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LocationsTable() {
  const location = useLocation();
  const entityId = location.state.entityId;
  console.log("location:",entityId);

const history=useHistory()

function handleContact(id){
  console.log(id)
  history.push("/contact-table", {locationId : id})
}
  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        Cell: ({ row }) => {
          return <div>{row.index + 1}</div>;
        },
      },

      {
        Header: "Location",
        accessor: "location",
        disableFilters: true,
      },
      {
        Header: "State",
        accessor: "state",
        disableFilters: true,
      },
      {
        Header: "City",
        accessor: "city",
        disableFilters: true,
      },
      {
        Header: "Zone",
        accessor: "zone",
        disableFilters: true,
      },
      {
        Header: "Ward",
        accessor: "ward",
        disableFilters: true,
      },
      {
        Header: "image 1",
        accessor: "image_1",
        disableFilters: true,
      },
      {
        Header: "image 2",
        accessor: "image_2",
        disableFilters: true,
      },
      {
        Header: "image 3",
        accessor: "image_3",
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
        Header: "Action",
        display: "action",
        Cell: (row) => (
          <div className="d-flex justify-content-around align-items-center">
            <Button
              id={`editBtn${row.cell.row.id}`}
              //   onClick={handleEdit(row.cell.row)}
              className="btn-warning"
              style={{ lineHeight: "1" }}
              //   onMouseEnter={() =>
              //     toggle(`editBtn${row.cell.row.id}`, "Edit Pole")
              //   }
              //   onMouseLeave={() => toggle(null, "")}
            >
              <i className="bx bxs-edit" style={{ fontSize: "large" }}></i>
            </Button>

            <Button
              id={`addBtn${row.cell.row.id}`}
              onClick={() => handleContact(row.cell.row.original.location)}
              className="btn-success m-2"
              style={{ lineHeight: "1" }}
              //   onMouseEnter={() =>
              //     toggle(`addBtn${row.cell.row.id}`, "Add Component")
              //   }
              //   onMouseLeave={() => toggle(null, "")}
            >
              {/* <i className="bx bxs-location" style={{ fontSize: "large" }}></i> */}
              Add Contact
            </Button>
          </div>
        ),
        disableFilters: true,
        disableSortBy: true,
      },
    ],
    []
  );

  const data = [
    {
      location: "heart-nff6w",
      state: "information-nyp92",
      city: 16,
      zone: 98,
      ward: 40,
      image_1: "complicated",
      image_2: "complicated",
      image_3: "complicated",
      longitude: "complicated",
      latitude: "complicated",
    },
    {
      location: "minute-yri12",
      state: "fairies-iutct",
      city: 7,
      zone: 77,
      ward: 39,
      image_1: "single",
      image_2: "single",
      image_3: "single",
      longitude: "single",
      latitude: "single",
    },
    {
      location: "degree-jx4h0",
      state: "man-u2y40",
      city: 27,
      zone: 54,
      ward: 92,
      image_1: "relationship",
      image_2: "relationship",
      image_3: "relationship",
      longitude: "relationship",
      latitude: "relationship",
    },
    {
      location: "horn-od926",
      state: "selection-gsykp",
      city: 22,
      zone: 20,
      ward: 39,
      image_1: "single",
      image_2: "single",
      image_3: "single",
      longitude: "single",
      latitude: "single",
    },
    {
      location: "heart-nff6w",
      state: "information-nyp92",
      city: 16,
      zone: 98,
      ward: 40,
      image_1: "complicated",
      image_2: "complicated",
      image_3: "complicated",
      longitude: "complicated",
      latitude: "complicated",
    },
    {
      location: "minute-yri12",
      state: "fairies-iutct",
      city: 7,
      zone: 77,
      ward: 39,
      image_1: "single",
      image_2: "single",
      image_3: "single",
      longitude: "single",
      latitude: "single",
    },
  ];

  //meta title
  document.title =
    "Location Table";

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Tables" breadcrumbItem="Location Table" />
        {/* <Table columns={columns} data={data} /> */}
        <TableContainer
          columns={columns}
          data={data}
          isGlobalFilter={true}
          isAddOptions={true}
          customPageSize={10}
          className="custom-header-css"
          entityId={entityId}
        />
      </div>
    </div>
  );
}
LocationsTable.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default LocationsTable;
