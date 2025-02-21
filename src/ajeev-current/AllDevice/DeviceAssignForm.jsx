import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "./DeviceAssignForm.css"; // Import custom CSS for additional styling
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { values } from "lodash";
import {
  fetchWithTokenRefresh,
  postWithTokenRefresh,
} from "../../helpers/AuthType/backend";

function DeviceAssignForm() {
  const [entities, setEntities] = useState([]);
  const [persons, setPersons] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const base_url = import.meta.env.VITE_BASE_URL;
  const base_url2 = import.meta.env.VITE_BASE_URL2;
  const base_url3 = import.meta.env.VITE_BASE_URL3;
  const history = useHistory();
  const location = useLocation();
  const deviceId = location.state.deviceId;


  const fetchEntities = async () => {
    try {
      const response = await fetchWithTokenRefresh({
        url: `${base_url3}/api/Entity/GetAllEntities`,
      });

      const data = response.data.data;
      setEntities(data);
    } catch (error) {
      console.error("Error fetching entities:", error);
    }
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntityDetails = async (entityId) => {
    setIsLoading(true);
    try {
      // Make an API call to fetch addresses by entity ID
      const addressResponse = await fetchWithTokenRefresh({
        url: `${base_url3}/api/Entity/GetAddressesByEntityId?entityId=${entityId}`,
      });

      // Check if response data is valid before using it
      if (addressResponse && addressResponse.data && addressResponse.data.addresses) {
        const addressData = addressResponse.data.addresses;
        setAddresses(addressData); // Store addresses in state
      } else {
        console.error("No addresses found in the response.");
        setAddresses([]); // If no addresses found, set empty array
      }
    } catch (error) {
      console.error("Error fetching entity details:", error);
      // Optionally show an alert or message to the user about the error
      alert("No addresses found");
    } finally {
      setIsLoading(false); // Always stop the loading spinner, even in case of error
    }
  };

  const fetchpersonDetails = async (addressId) => {
    try {
      // Make an API call to fetch addresses by entity ID
      const contect = await fetchWithTokenRefresh({
        url: `${base_url3}/api/Entity/GetPersonsByAddressId?addressId=${addressId}`,
      });
      setPersons(contect.data); // Store addresses in state
    }
    catch (error) {
      console.error("Error fetching entity details:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    entity: Yup.string().required("Entity is required"),
    address: Yup.string().required("Address is required"),
    person: Yup.string().required("Contact person is required"),
    remarks: Yup.string(),
  });

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(`${base_url2}/api/DeviceAssign`, {
        deviceid: Number(deviceId),
        addressId: Number(values.address),
        approverpersonid: Number(values.person),
        entityId: Number(values.entity),
        remarks: values.remarks,
      })
      if (res.status === 200) {
        alert("Data submitted successfully!");
        history.push("./device-table");
      } else {
        alert("Failed to submit data. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Container className="p-5 bg-white rounded shadow-sm">
        {/* <h1 className="mt-5 mb-4 text-center">Device Assign Details</h1> */}
        <div className="bg-primary bg-soft">
          <Row>
            <Col className="col-7">
              <div className="text-primary p-4">
                <h5 className="text-primary pt-4">Device Assign</h5>
              </div>
            </Col>
            <Col className="col-5 align-self-end">
              <img src={profileImg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <div>
          <div className="avatar-md profile-user-wid mb-4">
            <span className="avatar-title rounded-circle bg-light">
              <img
                src={logoImg}
                alt=""
                className="rounded-circle"
                height="34"
              />
            </span>
          </div>
        </div>
        <Formik
          initialValues={{
            entity: "",
            address: "",
            person: "",
            remarks: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={4} className="ps-0 pe-2">
                  <FormGroup>
                    <Label for="entitySelect">Entity:</Label>
                    <Input
                      type="select"
                      id="entitySelect"
                      name="entity"
                      value={values.entity}
                      onChange={(e) => {
                        handleChange(e);
                        const entityId = e.target.value;
                        if (entityId) {
                          fetchEntityDetails(entityId);
                        }
                        setFieldValue("entity", entityId);
                        setFieldValue("person", "");
                        setFieldValue("address", "");
                      }}
                      onBlur={handleBlur}
                      invalid={touched.entity && !!errors.entity}
                    >
                      <option value="">Select an Entity</option>
                      {entities.map((entity) => (
                        <option key={entity.entityId} value={entity.entityId}>
                          {entity.name}
                        </option>
                      ))}
                    </Input>
                    <FormFeedback>{errors.entity}</FormFeedback>
                  </FormGroup>
                </Col>

                <Col md={4} className="ps-0 pe-2">
                  <FormGroup>
                    <Label for="addressSelect">Assign Address:</Label>
                    <Input
                      type="select"
                      id="addressSelect"
                      name="address"
                      value={values.address}
                      onChange={(e) => {
                        handleChange(e);
                        const addressId = e.target.value;
                        if (addressId) { 
                          fetchpersonDetails(addressId);
                        }
                        setFieldValue("address", addressId);
                        setFieldValue("person", "");
                      }}
                      onBlur={handleBlur}
                      invalid={touched.address && !!errors.address}
                      disabled={isLoading}
                    >
                      <option value="">Select an Address</option>
                      {addresses.length > 0 ? (
                        addresses.map((address,index) => (
                          <option key={address.index} value={address.id}>
                            {address.addressline1}, {address.pincode}, {address.cityName}, {address.stateName}, {address.latitude}, {address.longitude}
                          </option>
                        ))
                      ) : (
                        <option>No Address</option>
                      )}
                    </Input>
                    <FormFeedback>{errors.address}</FormFeedback>
                  </FormGroup>
                </Col>

                <Col md={4} className="ps-0 pe-2">
                  <FormGroup>
                    <Label for="personSelect">Contact Person:</Label>
                    <Input
                      type="select"
                      id="personSelect"
                      name="person"
                      value={values.person}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={touched.person && !!errors.person}
                      disabled={isLoading}
                    >
                      <option value="default">Select a Person</option>
                      {persons.length > 0 ? (
                        persons.map((person) => (
                          <option key={person.personId} value={person.personId}>
                            {person.firstName} {person.lastName}
                          </option>
                        ))
                      ) : (
                        <option>No Person</option>
                      )}
                    </Input>
                    <FormFeedback>{errors.person}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <FormGroup>
                    <Label for="remarks">Remarks:</Label>
                    <Input
                      type="text"
                      id="remarks"
                      name="remarks"
                      placeholder="Add remarks..."
                      value={values.remarks}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={touched.remarks && !!errors.remarks}
                    />
                    <FormFeedback>{errors.remarks}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>

              <div className="text-center">
                <Button color="primary" className="mb-3" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}

export default DeviceAssignForm;
// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Button,
//   FormFeedback,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from "reactstrap";
// import "./DeviceAssignForm.css"; // Import custom CSS for additional styling
// import profileImg from "../../assets/images/profile-img.png";
// import logoImg from "../../assets/images/logo.svg";
// import {
//   useHistory,
//   useLocation,
// } from "react-router-dom/cjs/react-router-dom.min";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { values } from "lodash";
// import {
//   fetchWithTokenRefresh,
//   postWithTokenRefresh,
// } from "../../helpers/AuthType/backend";

// function DeviceAssignForm() {
//   const [entities, setEntities] = useState([]);
//   const [persons, setPersons] = useState([]);
//   const [addresses, setAddresses] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [modal, setModal] = useState(false);
//   const [state, setState] = useState([]);
//   const [city, setCity] = useState([]);
//   const [zone, setZone] = useState([]);
//   const [ward, setWard] = useState([]);
//   const [region, setRegion] = useState([]);
//   const [Type, setType] = useState([]);
//   const [entity, setEntity] = useState([]);
//   const [newAddress, setNewAddress] = useState({
//     entityName: "",
//     address1: "",
//     Country: "",
//     pincode: "",
//     address2: "",
//     state: "",
//     zone: "",
//     ward: "",
//     city: "",
//     latitude: "",
//     longitude: "",
//     region: "",
//     addressType: "",
//     remarks: "",
//   });

//   const base_url = import.meta.env.VITE_BASE_URL;
//   const history = useHistory();
//   const location = useLocation();
//   const deviceId = location.state.deviceId;

//   useEffect(() => {
//     fetchEntities();
//     fetchState();
//     fetchZoneAndRegion();
//   }, []);

//   useEffect(() => {
//     if (newAddress.state) {
//       fetchCityAndWard(newAddress.state);
//     }
//   }, [newAddress.state]);

//   const fetchEntities = async () => {
//     try {
//       const response = await fetchWithTokenRefresh({
//         url: `${base_url}/api/entity/?names_only=True`,
//       });

//       const data = response.data;
//       setEntities(data);
//     } catch (error) {
//       console.error("Error fetching entities:", error);
//     }
//   };

//   const fetchEntityDetails = async (entityId) => {
//     setIsLoading(true);
//     try {
//       const [addressResponse, personResponse] = await Promise.all([
//         fetchWithTokenRefresh({
//           url: `${base_url}/api/entity-address/${entityId}/`,
//         }),
//         fetchWithTokenRefresh({
//           url: `${base_url}/api/person-list/${entityId}/`,
//         }),
//       ]);

//       const addressData = addressResponse.data;
//       const personData = personResponse.data;

//       setAddresses(addressData);
//       setPersons(personData);
//     } catch (error) {
//       console.error("Error fetching entity details:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchState = async () => {
//     try {
//       const response = await fetchWithTokenRefresh({
//         url: `${base_url}/api/get-state/1/`,
//       });
//       setState(response.data);
//     } catch (error) {
//       console.error("Error fetching states:", error);
//     }
//   };

//   const fetchCityAndWard = async (stateId) => {
//     try {
//       const [cityResponse, wardResponse] = await Promise.all([
//         fetchWithTokenRefresh({ url: `${base_url}/api/get-city/${stateId}/` }),
//         fetchWithTokenRefresh({ url: `${base_url}/api/get-ward/${stateId}/` }),
//       ]);
//       setCity(cityResponse.data);
//       setWard(wardResponse.data);
//     } catch (error) {
//       console.error("Error fetching city and ward:", error);
//     }
//   };

//   const fetchZoneAndRegion = async () => {
//     try {
//       const [entityName, zoneResponse, regionResponse, TypeResponse] =
//         await Promise.all([
//           fetchWithTokenRefresh({
//             url: `${base_url}/api/entity/`,
//           }),
//           fetchWithTokenRefresh({
//             url: `${base_url}/api/zone/`,
//           }),
//           fetchWithTokenRefresh({
//             url: `${base_url}/api/region/`,
//           }),
//           fetchWithTokenRefresh({
//             url: `${base_url}/api/address-type/`,
//           }),
//         ]);
//       setZone(zoneResponse.data);
//       setRegion(regionResponse.data);
//       setType(TypeResponse.data);
//       setEntity(entityName.data);
//     } catch (error) {
//       console.error("Error fetching zone and region:", error);
//     }
//   };

//   const validationSchema = Yup.object().shape({
//     entity: Yup.string().required("Entity is required"),
//     address: Yup.string().required("Address is required"),
//     person: Yup.string().required("Contact person is required"),
//     remarks: Yup.string(),
//   });

//   const handleSubmit = async (values) => {
//     try {
//       const response = await postWithTokenRefresh({
//         url: `${base_url}/api/device-installation/`,
//         body: {
//           device_id: Number(deviceId),
//           address_id: Number(values.address),
//           approve_person_id: Number(values.person),
//           entity_id: Number(values.entity),
//           remarks: values.remarks,
//         },
//       });
//       console.log(response);
//       if (response.status === 201) {
//         alert("Data submitted successfully!");
//         history.push("./device-table");
//       } else {
//         alert("Failed to submit data. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       alert("An error occurred. Please try again later.");
//     }
//   };

//   const toggleModal = () => {
//     setModal(!modal);
//   };

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setNewAddress({ ...newAddress, [name]: value });
//   };

//   const handleAddNewAddress = async () => {
//     try {
//       await postWithTokenRefresh({
//         url: `${base_url}/api/address/`,
//         body: {
//           address_line_1: newAddress.address1,
//           address_line_2: newAddress.address2,
//           pincode: newAddress.pincode,
//           latitude: newAddress.latitude,
//           longitude: newAddress.longitude,
//           country_id: parseInt(newAddress.Country),
//           city_id: parseInt(newAddress.city),
//           state_id: parseInt(newAddress.state),
//           ward_id: parseInt(newAddress.ward),
//           region_id: parseInt(newAddress.region),
//           zone_id: parseInt(newAddress.zone),
//           entityId: parseInt(newAddress.entityName),
//           addressTypeId: parseInt(newAddress.addressType),
//           remarks: newAddress.remarks,
//         },
//       });
//       fetchEntityDetails(newAddress.entityName);
//       toggleModal();
//     } catch (error) {
//       console.error("Error adding address:", error);
//       alert("An error occurred. Please try again later.");
//     }

//     console.log(newAddress);
//   };

//   return (
//     <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
//       <Container className="p-5 bg-white rounded shadow-sm">
//         {/* <h1 className="mt-5 mb-4 text-center">Device Assign Details</h1> */}
//         <div className="bg-primary bg-soft">
//           <Row>
//             <Col className="col-7">
//               <div className="text-primary p-4">
//                 <h5 className="text-primary pt-4">Device Assign</h5>
//               </div>
//             </Col>
//             <Col className="col-5 align-self-end">
//               <img src={profileImg} alt="" className="img-fluid" />
//             </Col>
//           </Row>
//         </div>
//         <div>
//           <div className="avatar-md profile-user-wid mb-4">
//             <span className="avatar-title rounded-circle bg-light">
//               <img
//                 src={logoImg}
//                 alt=""
//                 className="rounded-circle"
//                 height="34"
//               />
//             </span>
//           </div>
//         </div>
//         <Formik
//           initialValues={{
//             entity: "",
//             address: "",
//             person: "",
//             remarks: "",
//           }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({
//             values,
//             errors,
//             touched,
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             isSubmitting,
//             setFieldValue,
//           }) => (
//             <Form onSubmit={handleSubmit}>
//               <Row className="mb-3">
//                 <Col md={4} className="ms-4">
//                   <FormGroup>
//                     <Label for="entitySelect">Entity:</Label>
//                     <Input
//                       type="select"
//                       id="entitySelect"
//                       name="entity"
//                       value={values.entity}
//                       onChange={(e) => {
//                         handleChange(e);
//                         const entityId = e.target.value;
//                         if (entityId) {
//                           fetchEntityDetails(entityId);
//                         }
//                         setFieldValue("entity", entityId);
//                         setFieldValue("person", "");
//                         setFieldValue("address", "");
//                       }}
//                       onBlur={handleBlur}
//                       invalid={touched.entity && !!errors.entity}
//                     >
//                       <option value="">Select an Entity</option>
//                       {entities.map((entity) => (
//                         <option key={entity.entity_id} value={entity.entity_id}>
//                           {entity.name}
//                         </option>
//                       ))}
//                     </Input>
//                     <FormFeedback>{errors.entity}</FormFeedback>
//                   </FormGroup>
//                 </Col>
//                 <Col md={4}>
//                   <FormGroup>
//                     <Label for="addressSelect">Assign Address:</Label>
//                     <Input
//                       type="select"
//                       id="addressSelect"
//                       name="address"
//                       value={values.address}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       invalid={touched.address && !!errors.address}
//                       disabled={isLoading}
//                     >
//                       <option value="">Select an Address</option>
//                       {addresses.length > 0 ? (
//                         addresses.map((address) => (
//                           <option key={address.id} value={address.id}>
//                             {address.addressline1}, {address.pincode},{" "}
//                             {address.cityname}, {address.statename},{" "}
//                             {address.Address_type}
//                           </option>
//                         ))
//                       ) : (
//                         <option>No Address</option>
//                       )}
//                     </Input>
//                     <FormFeedback>{errors.address}</FormFeedback>
//                   </FormGroup>
//                 </Col>
//                 <Col md={3} className="d-flex align-items-end mb-3">
//                   <Button color="primary" onClick={toggleModal}>
//                     Add Address
//                   </Button>
//                 </Col>
//               </Row>

//               <Row className="mb-3">
//                 <Col md={4} className="ms-4">
//                   <FormGroup>
//                     <Label for="personSelect">Contact Person:</Label>
//                     <Input
//                       type="select"
//                       id="personSelect"
//                       name="person"
//                       value={values.person}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       invalid={touched.person && !!errors.person}
//                       disabled={isLoading}
//                     >
//                       <option value="default">Select a Person</option>
//                       {persons.length > 0 ? (
//                         persons.map((person) => (
//                           <option key={person.id} value={person.id}>
//                             {person.firstname} {person.lastname}
//                           </option>
//                         ))
//                       ) : (
//                         <option>No Person</option>
//                       )}
//                     </Input>
//                     <FormFeedback>{errors.person}</FormFeedback>
//                   </FormGroup>
//                 </Col>
//                 <Col md={4}>
//                   <FormGroup>
//                     <Label for="remarks">Remarks:</Label>
//                     <Input
//                       type="text"
//                       id="remarks"
//                       name="remarks"
//                       placeholder="Add remarks..."
//                       value={values.remarks}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       invalid={touched.remarks && !!errors.remarks}
//                     />
//                     <FormFeedback>{errors.remarks}</FormFeedback>
//                   </FormGroup>
//                 </Col>
//               </Row>

//               <div className="text-center">
//                 <Button color="primary" className="mb-3" type="submit" disabled={isSubmitting}>
//                   Submit
//                 </Button>
//               </div>
//             </Form>
//           )}
//         </Formik>

//         <Modal isOpen={modal} toggle={toggleModal}>
//           <ModalHeader toggle={toggleModal}>Add New Address</ModalHeader>
//           <ModalBody>
//             <Form>
//               <div className="mb-3">
//                 <Row className="mb-3">
//                   <Col sm={6}>
//                     <Label className="form-label">Entity Name</Label>
//                     <Input
//                       id="entityName"
//                       name="entityName"
//                       className="form-control"
//                       type="select"
//                       value={newAddress.entityName}
//                       onChange={handleAddressChange}
//                     >
//                       <option value="default">Choose one</option>
//                       {entities.map((item) => (
//                         <option key={item.entity_id} value={item.entity_id}>
//                           {item.name}
//                         </option>
//                       ))}
//                     </Input>
//                   </Col>
//                 </Row>
//                 <Row className="mb-3">
//                   <Col sm={6}>
//                     <Label className="form-label">Address Line-1</Label>
//                     <Input
//                       id="address1"
//                       name="address1"
//                       className="form-control"
//                       placeholder="Enter Address line-1"
//                       type="text"
//                       value={newAddress.address1}
//                       onChange={handleAddressChange}
//                     />
//                   </Col>
//                   <Col sm={6}>
//                     <Label className="form-label">Country</Label>
//                     <Input
//                       id="Country"
//                       name="Country"
//                       className="form-control"
//                       type="select"
//                       value={newAddress.Country}
//                       onChange={handleAddressChange}
//                     >
//                       <option value="">Choose Country</option>
//                       <option value="1">India</option>
//                     </Input>
//                   </Col>
//                 </Row>
//                 <Row className="mb-3">
//                   <Col sm={6}>
//                     <Label className="form-label">PinCode</Label>
//                     <Input
//                       id="pincode"
//                       name="pincode"
//                       className="form-control"
//                       placeholder="Enter Pincode"
//                       type="text"
//                       value={newAddress.pincode}
//                       onChange={handleAddressChange}
//                     />
//                   </Col>
//                   <Col sm={6}>
//                     <Label className="form-label">Address Line-2</Label>
//                     <Input
//                       id="address2"
//                       name="address2"
//                       className="form-control"
//                       placeholder="Enter Address line-2"
//                       type="text"
//                       value={newAddress.address2}
//                       onChange={handleAddressChange}
//                     />
//                   </Col>
//                 </Row>
//                 <Row className="mb-3">
//                   <Col sm={6}>
//                     <Label className="form-label">State</Label>
//                     <Input
//                       id="state"
//                       name="state"
//                       className="form-control"
//                       type="select"
//                       value={newAddress.state}
//                       onChange={handleAddressChange}
//                     >
//                       <option value="">Choose State</option>
//                       {state.map((item) => (
//                         <option key={item.State_Id} value={item.State_Id}>
//                           {item.name}
//                         </option>
//                       ))}
//                     </Input>
//                   </Col>
//                   <Col sm={6}>
//                     <Label className="form-label">Zone</Label>
//                     <Input
//                       id="zone"
//                       name="zone"
//                       className="form-control"
//                       type="select"
//                       value={newAddress.zone}
//                       onChange={handleAddressChange}
//                     >
//                       <option value="">Choose Zone</option>
//                       {zone.map((item) => (
//                         <option key={item.Zone_Id} value={item.Zone_Id}>
//                           {item.name}
//                         </option>
//                       ))}
//                     </Input>
//                   </Col>
//                 </Row>
//                 <Row className="mb-3">
//                   <Col sm={6}>
//                     <Label className="form-label">Ward</Label>
//                     <Input
//                       id="ward"
//                       name="ward"
//                       className="form-control"
//                       type="select"
//                       value={newAddress.ward}
//                       onChange={handleAddressChange}
//                     >
//                       <option value="">Choose Ward</option>
//                       {ward.map((item) => (
//                         <option key={item.Ward_Id} value={item.Ward_Id}>
//                           {item.name}
//                         </option>
//                       ))}
//                     </Input>
//                   </Col>
//                   <Col sm={6}>
//                     <Label className="form-label">City</Label>
//                     <Input
//                       id="city"
//                       name="city"
//                       className="form-control"
//                       type="select"
//                       value={newAddress.city}
//                       onChange={handleAddressChange}
//                     >
//                       <option value="">Choose City</option>
//                       {city.map((item) => (
//                         <option key={item.City_Id} value={item.City_Id}>
//                           {item.name}
//                         </option>
//                       ))}
//                     </Input>
//                   </Col>
//                 </Row>
//                 <Row className="mb-3">
//                   <Col sm={6}>
//                     <Label className="form-label">Latitude</Label>
//                     <Input
//                       id="latitude"
//                       name="latitude"
//                       className="form-control"
//                       placeholder="Enter Latitude"
//                       type="text"
//                       value={newAddress.latitude}
//                       onChange={handleAddressChange}
//                     />
//                   </Col>
//                   <Col sm={6}>
//                     <Label className="form-label">Longitude</Label>
//                     <Input
//                       id="longitude"
//                       name="longitude"
//                       className="form-control"
//                       placeholder="Enter Longitude"
//                       type="text"
//                       value={newAddress.longitude}
//                       onChange={handleAddressChange}
//                     />
//                   </Col>
//                 </Row>
//                 <Row className="mb-3">
//                   <Col sm={6}>
//                     <Label className="form-label">Region</Label>
//                     <Input
//                       id="region"
//                       name="region"
//                       className="form-control"
//                       type="select"
//                       value={newAddress.region}
//                       onChange={handleAddressChange}
//                     >
//                       <option value="">Choose Region</option>
//                       {region.map((item) => (
//                         <option key={item.Region_Id} value={item.Region_Id}>
//                           {item.name}
//                         </option>
//                       ))}
//                     </Input>
//                   </Col>
//                   <Col sm={6}>
//                     <Label className="form-label">Address Type</Label>
//                     <Input
//                       id="addressType"
//                       name="addressType"
//                       className="form-control"
//                       type="select"
//                       value={newAddress.addressType}
//                       onChange={handleAddressChange}
//                     >
//                       <option value="">Choose Address Type</option>
//                       {Type.map((item) => (
//                         <option
//                           key={item.contact_type_id}
//                           value={item.contact_type_id}
//                         >
//                           {item.contact_type_name}
//                         </option>
//                       ))}
//                     </Input>
//                   </Col>
//                 </Row>
//                 <Row className="mb-3">
//                   <Col sm={12}>
//                     <Label className="form-label">Remarks</Label>
//                     <Input
//                       id="remarks"
//                       name="remarks"
//                       className="form-control"
//                       placeholder="Enter Remarks"
//                       type="textarea"
//                       value={newAddress.remarks}
//                       onChange={handleAddressChange}
//                     />
//                   </Col>
//                 </Row>
//               </div>
//             </Form>
//           </ModalBody>
//           <ModalFooter>
//             <Button color="primary" onClick={handleAddNewAddress}>
//               Add Address
//             </Button>{" "}
//             <Button color="secondary" onClick={toggleModal}>
//               Cancel
//             </Button>
//           </ModalFooter>
//         </Modal>
//       </Container>
//     </div>
//   );
// }

// export default DeviceAssignForm;
