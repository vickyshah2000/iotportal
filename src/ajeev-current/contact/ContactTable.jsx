import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
// Import components
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from "./TableContainer";
import LoginModal from "./LoginModal"; // Import the LoginModal component
import { fetchWithTokenRefresh } from "../../helpers/AuthType/backend";

/**
 * ContactTable component fetches contact data from API and renders a table.
 */
function ContactTable() {
  const base_url = import.meta.env.VITE_BASE_URL;
  const base_url3 = import.meta.env.VITE_BASE_URL3;
  const history = useHistory();

  // Get addressId from location state or set default
  const location = useLocation();
  const addressId = location.state.addressId;
  // console.log(addressId,"this is address id")
  const entityName = location.state.entityName;
  const entityId = location.state.entityId;

  const [data, setData] = useState([]); // State to manage contact data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state
  const [modal, setModal] = useState(false); // For modal visibility
  const [activeImage, setActiveImage] = useState(""); // To store the active image URL
  const [loginModal, setLoginModal] = useState(false); // For login modal visibility

  const [activeUser, setActiveUser] = useState({
    userId: "",
    userImage: "",
    firstName: "",
    lastName: "",
    mobile:""
  });

  const toggleModal = () => setModal(!modal);
  const toggleLoginModal = () => setLoginModal(!loginModal);
  //get role****************************
  const role = Cookies.get('authUser') ? JSON.parse(Cookies.get('authUser')).role : '';

  console.log(role, "get role")
  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithTokenRefresh({
          url: `${base_url3}/api/Entity/GetPersonsByAddressId?addressId=${addressId}`,
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
  }, [base_url3, addressId]);


  function handleEdit(row) {
    history.push("/edit-contact", {
      personId: row.cell.row.original.personId,
      addressId: addressId,
      entityName: entityName,
    });
  }
  function handleLogin(row) {
    console.log(row.cell.row.original);
    const {
      email,
      firstName,
      lastName,
      imageurl,
      Alternate_no,
      mobileNumber,
      contacttypename,
    } = row.cell.row.original;
    setActiveUser({
      userId: email,
      firstName: firstName,
      lastName: lastName,
      altenateNumber: Alternate_no,
      email: email,
      mobile: mobileNumber,
      contactType: contacttypename,
      userImage: `${base_url}/media/${imageurl}`,
    });
    toggleLoginModal();
  }

  // Define table columns
  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        Cell: ({ row }) => <div>{row.index + 1}</div>,
      },
      {
        Header: "Image",
        disableFilters: true,
        Cell: ({ row }) => (
          <img
            width={50}
            style={{ cursor: "pointer" }}
            src={`${base_url3}/${row.original.imageUrl}`}
            alt="Profile"
            onClick={() => {
              setActiveImage(`${base_url3}/${row.original.imageUrl}`);
              toggleModal();
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "../src/assets/images/Ajeevi-img/no-image.png";
            }} // Fallback image
          />
        ),
      },
      {
        Header: "First name",
        accessor: "firstName",
        disableFilters: true,
      },
      {
        Header: "Last name",
        accessor: "lastName",
        disableFilters: true,
      },
      {
        Header: "Email",
        accessor: "email",
        disableFilters: true,
      },
      {
        Header: "Phone Number",
        accessor: "mobileNumber",
        disableFilters: true,
      },
      {
        Header: "Alternate Number",
        accessor: "alternateNumber",
        disableFilters: true,
      },

      {
        Header: "Contact Type",
        accessor: "contactTypeName",
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
              onClick={() => {
                handleEdit(row);
              }}
              className="btn btn-warning"
              style={{ lineHeight: "1" }}
              title="Edit"
            >
              <i className="bx bxs-edit" style={{ fontSize: "large" }}></i>
            </Button>
            {role === "Customer" ? (
              null
            ) : <Button
              id={`loginBtn${row.cell.row.id}`}
              onClick={() => {
                handleLogin(row);
              }}
              className="btn btn-info"
              style={{ lineHeight: "1" }}
              title="Create login"
            >
              <i className="bx bx-user-plus" style={{ fontSize: "large" }}></i>
            </Button>}

          </div>
        ),
        disableFilters: true,
        disableSortBy: true,
      },
    ],
    []
  );

  // Set document title
  document.title = "Person Details";

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Tables" breadcrumbItem="CONTACT TABLES" />
        {/* Conditionally render table container with table header */}
        <TableContainer
          columns={columns}
          data={data || []} // Ensure data is always an array
          isGlobalFilter={true}
          isAddOptions={true}
          customPageSize={10}
          className="custom-header-css"
          addressId={addressId}
          entityName={entityName}
          entityId={entityId}
        />
        {/* Conditionally render loading or error messages */}
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Image Preview</ModalHeader>
          <ModalBody>
            <img src={activeImage} alt="Profile" style={{ width: "100%" }} />
          </ModalBody>
        </Modal>
        <LoginModal
          isOpen={loginModal}
          toggle={toggleLoginModal}
          userId={activeUser.userId}
          userImage={activeUser.userImage}
          firstName={activeUser.firstName}
          lastName={activeUser.lastName}
          entityId={entityId}
          mobileNumber={activeUser.mobile}
          alternateNumber={activeUser.Alternate_no}
          email={activeUser.email}
        />
      </div>
    </div>
  );
}

// Prop types validation
ContactTable.propTypes = {
  preGlobalFilteredRows: PropTypes.array,
};

export default ContactTable;
