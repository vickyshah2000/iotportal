import React, { useMemo, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useHistory } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from "./TableContainer";
import Cookies from "js-cookie";
import { fetchWithTokenRefresh } from "../../helpers/AuthType/backend";

function EntityTable() {
  const base_url = import.meta.env.VITE_BASE_URL;
  const base_url3 = import.meta.env.VITE_BASE_URL3;
  const history = useHistory();
  const [data, setData] = useState([]);
  const [customPageSize, setCustomPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [totalCount, setTotalCount] = useState(0); // Initialize totalCount to 

  //Modal State ******************
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  // Function to handle opening the modal
  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl); // Store the selected image URL
    setIsModalOpen(true); // Open the modal
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedImage(null); // Clear the selected image
  };
  //modal end************************************************************

  //all image show in model
  const images = selectedImage ? selectedImage.split(",") : [];
  //****** */

  const userCookie = Cookies.get("authUser");
  const token = userCookie ? JSON.parse(userCookie).access : null;
  const entityId = userCookie
    ? JSON.parse(userCookie).entity_id.entity_id
    : null;
  const role = userCookie ? JSON.parse(userCookie).role : null;

  const fetchData = useCallback(async () => {
    try {
      let response;
      if (role === "Admin") {
        response = await fetchWithTokenRefresh({
          url: `${base_url3}/api/Entity/GetAllEntities?${searchText ? `search=${searchText}&` : ""
            }pageNumber=${pageNumber}&pageSize=${customPageSize}`,
        });
        console.log(response.data.data)
        setData(response.data.data);
        setTotalCount(Number(response?.data.totalCount)); // Update totalCount here
      } else {
        response = await fetchWithTokenRefresh({
          url: `${base_url3}/api/Entity/GetEntityById?entityId=${entityId}`,
        });
        setData([response?.data]);
        setTotalCount(1); // If fetching single entity, set totalCount to 1
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [base_url3, customPageSize, pageNumber, role, entityId]);

  useEffect(() => {
    fetchData();
  }, [fetchData, customPageSize, pageNumber]);

  const handleNavigation = useCallback(
    (path, params) => {
      history.push(path, params);
    },
    [history]
  );

  const handleEdit = useCallback(
    (row) =>
      handleNavigation("/edit-entity", {
        entityId: row.cell.row.original.entityId,
        entityName: row.cell.row.original.name,
      }),
    [handleNavigation]
  );

  const handleRD = useCallback(
    (row) =>
      handleNavigation("/distributors", {
        entityId: row.cell.row.original.entityId,
      }),
    [handleNavigation]
  );

  const handleAddress = useCallback(
    (row) =>
      handleNavigation("/address-table", {
        entityId: row.cell.row.original.entityId,
        entityName: row.cell.row.original.name,
      }),
    [handleNavigation]
  );

  const handleDevice = useCallback(
    (row) =>
      handleNavigation("/device-assign-table", {
        entityId: row.cell.row.original.entityId,
        entityName: row.cell.row.original.name,
      }),
    [handleNavigation]
  );

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
        Cell: ({ row }) => (
          <div>
            {/* Image click handler to open modal */}
            <img
              src={`${base_url3}${row.original.imageUrl?.split(",")[0] || ''}`}
              alt="no image"
              height={50}
              width={50}
              style={{ cursor: 'pointer' }}
              onClick={() => openModal(row.original.imageUrl || '')} // Handle cases where imageUrl is empty or undefined
            />
          </div>
        ),
        disableFilters: true,
      },
      {
        Header: "Entity Name",
        accessor: "name",
        disableFilters: true,
      },
      {
        Header: "Short Name",
        accessor: "shortName",
        disableFilters: true,
      },
      {
        Header: "Long Name",
        accessor: "longName",
        disableFilters: true,
      },
      {
        Header: "Trade Name",
        accessor: "tradeName",
        disableFilters: true,
      },
      {
        Header: "Type",
        accessor: "entityTypeName",
        disableFilters: true,
      },
      {
        Header: "Role",
        accessor: "roleName",
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
              className="btn-warning"
              onClick={() => handleEdit(row)}
              style={{ lineHeight: "1" }}
              title="Edit"
            >
              <i className="bx bxs-edit" style={{ fontSize: "large" }}></i>
            </Button>
            <Button
              onClick={() => handleRD(row)}
              className="btn-success m-2"
              style={{ lineHeight: "1" }}
              title="Entity Relation details"
            >
              <i className="bx bxs-devices"></i>
            </Button>
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
    [
      handleEdit,
      handleRD,
      handleAddress,
      handleDevice,
      pageNumber,
      customPageSize,
    ]
  );

  document.title = "Entity Table";

  return (
    <div className="page-content">
      <Modal isOpen={isModalOpen} toggle={closeModal} size="lg">
        <ModalHeader toggle={closeModal}>Entity Image</ModalHeader>
        <ModalBody>
          <div className="d-flex flex-wrap"> {/* Flexbox container with wrapping */}
            {images.length > 0 ? (
              images.map((image, index) => (
                <img
                  className="d-flex"
                  key={index}
                  src={`${base_url3}${image}`} // Concatenate base URL with each image path
                  alt={`Image ${index + 1}`}
                  style={{ width: "30%", marginBottom: "10px", marginRight: "10px" }} // Adjust size and spacing
                />
              ))
            ) : (
              <p>No images available.</p> // Show a message if no images are available
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeModal}>Close</Button>
        </ModalFooter>
      </Modal>
      <div className="container-fluid">
        <Breadcrumbs title="Tables" breadcrumbItem="Entity Table" />
        <TableContainer
          columns={columns}
          data={data}
          isGlobalFilter={true}
          isAddOptions={role === "Admin" ? true : false}
          customPageSize={customPageSize}
          setCustomPageSize={setCustomPageSize}
          searchText={searchText}
          setSearchText={setSearchText}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          totalCount={totalCount}
          className="custom-header-css"
        />
      </div>
    </div>
  );
}

EntityTable.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default EntityTable;
