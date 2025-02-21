import React, { useEffect, useMemo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from "./TableContainer";
import Cookies from "js-cookie";
import { fetchWithTokenRefresh } from "../../helpers/AuthType/backend";

function RDsTable() {
  document.title = " Entity Relation Table";

  const history = useHistory();
  const userCookie = Cookies.get("authUser");
  const token = userCookie ? JSON.parse(userCookie).access : null;
  const base_url = import.meta.env.VITE_BASE_URL;
  const base_url3 = import.meta.env.VITE_BASE_URL3;
  const entityId = userCookie
    ? JSON.parse(userCookie).entity_id.entity_id
    : null;
  const role = userCookie ? JSON.parse(userCookie).role : null;

  const [data, setData] = useState([]);

  
  const fetchData = useCallback(async () => {
    try {
      const response = await fetchWithTokenRefresh({
        url: `${base_url3}/api/Entity/GetEntityRelationshipByEntityId?entityId=${entityId}`,
      });
      console.log(response);
      // Assuming response.data is an array of objects
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [base_url3, entityId]); // Add entityId to the dependency array if it is expected to change

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEdit = (row) => {
    // console.log(row.original.relationshipId,"abcd");
    history.push("/edit-entity", {
      entityId: row.original.relationshipId,
      role:row.original.entityRoleName
    });
  };

  const handleAddress = (row) => {
    history.push("/address-table", { entityId: row.original.relationshipId,entityName:row.original.name  });
  };
  const handleDevice = (row) => {
    history.push("/device-assign-table", { entityId: row.original.relationshipId});
  };

  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        Cell: ({ row }) => <div>{row.index + 1}</div>,
      },
      {
        Header: "Name",
        accessor: "name",
        disableFilters: true,
      },
      {
        Header: "Short name",
        accessor: "shortName",
        disableFilters: true,
      },
      {
        Header: "Long Name",
        accessor: row => row.longName || "N/A",
        disableFilters: true,
      },      
      {
        Header: "Trade Name",
        accessor: row => row.tradeName || "N/A",
        disableFilters: true,
      },      
      {
        Header: "Role",
        accessor: "roleName",
        disableFilters: true,
      },
      {
        Header: "Type",
        accessor: "entityTypeName",
        disableFilters: true,
      },
      {
        Header: "Remarks",
        accessor: "EntityEmail",
        disableFilters: true,
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="d-flex justify-content-around align-items-center">
            <Button
              className="btn-warning"
              onClick={() => {
                handleEdit(row);
              }}
              style={{ lineHeight: "1" }}
              title="Edit"
            >
              <i className="bx bxs-edit" style={{ fontSize: "large" }}></i>
            </Button>
            {/* <Button
              onClick={() => handleRD(row)}
              className="btn-success m-2"
              style={{ lineHeight: "1" }}
              title="Entity Relation details"
            >
              <i className="bx bxs-devices"></i>
            </Button> */}
            <Button
              onClick={() => handleAddress(row)}
              className="btn btn-primary m-2"
              style={{ lineHeight: "1" }}
              title="Address details here"
            >
              <i className="bx bx-home-alt-2"></i>
            </Button>
            <Button
              onClick={() => handleDevice(row)}
              className="btn btn-info m-2"
              style={{ lineHeight: "1" }}
              title="Device details here"
            >
              <i className="bx bxs-devices"></i>
            </Button>
          </div>
        ),
        disableFilters: true,
        disableSortBy: true,
      },
    ],
    []
  );

  // const data1 = [
  //   {
  //     name: "heart-nff6w",
  //     id: "information-nyp92",
  //     short_name: 16,
  //     long_name: 98,
  //     trade_name: 40,
  //   },
  //   {
  //     name: "minute-yri12",
  //     id: "fairies-iutct",
  //     short_name: 7,
  //     long_name: 77,
  //     trade_name: 39,
  //   },
  //   {
  //     name: "degree-jx4h0",
  //     id: "man-u2y40",
  //     short_name: 27,
  //     long_name: 54,
  //     trade_name: 92,
  //   },
  //   {
  //     name: "horn-od926",
  //     id: "selection-gsykp",
  //     short_name: 22,
  //     long_name: 20,
  //     trade_name: 39,
  //   },
  //   {
  //     name: "heart-nff6w",
  //     id: "information-nyp92",
  //     short_name: 16,
  //     long_name: 98,
  //     trade_name: 40,
  //   },
  //   {
  //     name: "minute-yri12",
  //     id: "fairies-iutct",
  //     short_name: 7,
  //     long_name: 77,
  //     trade_name: 39,
  //   },
  //   {
  //     name: "degree-jx4h0",
  //     id: "man-u2y40",
  //     short_name: 27,
  //     long_name: 54,
  //     trade_name: 92,
  //   },
  //   {
  //     name: "horn-od926",
  //     id: "selection-gsykp",
  //     short_name: 22,
  //     long_name: 20,
  //     trade_name: 39,
  //   },
  //   {
  //     name: "heart-nff6w",
  //     id: "information-nyp92",
  //     short_name: 16,
  //     long_name: 98,
  //     trade_name: 40,
  //   },
  //   {
  //     name: "minute-yri12",
  //     id: "fairies-iutct",
  //     short_name: 7,
  //     long_name: 77,
  //     trade_name: 39,
  //   },
  //   {
  //     name: "degree-jx4h0",
  //     id: "man-u2y40",
  //     short_name: 27,
  //     long_name: 54,
  //     trade_name: 92,
  //   },
  //   {
  //     name: "horn-od926",
  //     id: "selection-gsykp",
  //     short_name: 22,
  //     long_name: 20,
  //     trade_name: 39,
  //   },
  // ];

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Tables" breadcrumbItem="Entity Organisation Table" />
        <TableContainer
          columns={columns}
          data={data || []}
          isGlobalFilter
          isAddOptions
          customPageSize={10}
          className="custom-header-css"
        />
      </div>
    </div>
  );
}

RDsTable.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default RDsTable;
