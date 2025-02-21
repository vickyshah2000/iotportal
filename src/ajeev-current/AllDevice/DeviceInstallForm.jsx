import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";
import { fetchWithTokenRefresh, postWithTokenRefresh } from "../../helpers/AuthType/backend";

import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";

function DeviceAssignForm() {
  const [entities, setEntities] = useState([]);
  const [persons, setPersons] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [data, setData] = useState({
    remarks: "",
    MinValue: "",
    MaxValue: "",
    MaxServer: ""
  });
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const base_url = import.meta.env.VITE_BASE_URL;
  const base_url3 = import.meta.env.VITE_BASE_URL3;
  const base_url2 = import.meta.env.VITE_BASE_URL2;
  const history = useHistory();
  const location = useLocation();
  const deviceid = location.state.deviceid;

  useEffect(() => {
    fetchEntities();
  }, []);

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
    if (selectedEntity) {
      fetchEntityDetails(selectedEntity);
    } else {
      setPersons([]);
      setAddresses([]);
    }
  }, [selectedEntity]);

  const fetchEntityDetails = async (entityId) => {
    setIsLoading(true);
    try {
      // Fetch addresses by entity ID
      const addressResponse = await fetchWithTokenRefresh({
        url: `${base_url3}/api/Entity/GetAddressesByEntityId?entityId=${entityId}`,
      });

      if (addressResponse && addressResponse.data && addressResponse.data.addresses) {
        setAddresses(addressResponse.data.addresses);
      } else {
        setAddresses([]);
      }
    } catch (error) {
      console.error("Error fetching entity details:", error);
      alert("Error fetching entity details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchpersonDetails = async (addressId) => {
    try {
      const personResponse = await fetchWithTokenRefresh({
        url: `${base_url3}/api/Entity/GetPersonsByAddressId?addressId=${addressId}`,
      });
      setPersons(personResponse.data);
    } catch (error) {
      console.error("Error fetching person details:", error);
    }
  };

  const handleEntityChange = (event) => {
    setSelectedEntity(event.target.value);
    setSelectedPerson("");
    setSelectedAddress("");
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const fileArray = Array.from(selectedFiles);
    setFiles(fileArray);

    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);

    return () => {
      fileArray.forEach((file) => URL.revokeObjectURL(file));
    };
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("deviceDetails", JSON.stringify({
      DeviceId: deviceid,
      AddressId: parseInt(selectedAddress),
      ApproverPersonId: parseInt(selectedPerson),
      EntityId: parseInt(selectedEntity),
      Remarks: data.remarks,
      MinValue: parseFloat(data.MinValue),
      MaxValue: parseFloat(data.MaxValue),
      MaxServer: parseFloat(data.MaxServer)
    }));
    files.forEach((file) => formData.append("imgData", file));

    try {
      const response = await postWithTokenRefresh({
        url: `${base_url2}/api/DeviceInstallation/SaveInstallationWithImages`,
        body: formData,
        options: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      });
        alert("Data submitted successfully!");
        history.push("/device-install-table", { entityId: selectedEntity, deviceid: deviceid });
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred. Please try again later.");
      history.push("./device-assign-table");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Container className="p-5 bg-white rounded shadow-sm">
        <div className="bg-primary bg-soft">
          <Row>
            <Col className="col-7">
              <div className="text-primary p-4">
                <h5 className="text-primary pt-4">Device Installation</h5>
              </div>
            </Col>
            <Col className="col-5 align-self-end">
              <img src={profileImg} alt="Profile" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <div>
          <div className="avatar-md profile-user-wid mb-4">
            <span className="avatar-title rounded-circle bg-light">
              <img src={logoImg} alt="Logo" className="rounded-circle" height="34" />
            </span>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={4}>
              <FormGroup>
                <Label for="entitySelect">Entity:</Label>
                <Input
                  type="select"
                  id="entitySelect"
                  value={selectedEntity}
                  onChange={handleEntityChange}
                >
                  <option value="">Select an Entity</option>
                  {entities.map((entity,ind) => (
                    <option key={entity.ind} value={entity.entityId}>
                      {entity.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="addressSelect">Installation Address:</Label>
                <Input
                  type="select"
                  id="addressSelect"
                  value={selectedAddress}
                  onChange={(e) => {
                    const addressId = e.target.value;
                    if (addressId) {
                      fetchpersonDetails(addressId).catch((error) => {
                        console.error("Error fetching person details:", error);
                      });
                    }
                    setSelectedAddress(addressId);
                    setSelectedPerson(""); // Reset person selection
                  }}
                  disabled={isLoading}
                >
                  <option value="">Select an Address</option>
                  {isLoading ? (
                    <option>Loading...</option>
                  ) : addresses.length > 0 ? (
                    addresses.map((address,index) => (
                      <option key={address.index} value={address.id}>
                        {address.addressline1}, {address.pincode}, {address.cityName}, {address.stateName}
                      </option>
                    ))
                  ) : (
                    <option disabled>No Address</option>
                  )}
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="personSelect">Contact Person:</Label>
                <Input
                  type="select"
                  id="personSelect"
                  value={selectedPerson}
                  onChange={(e) => setSelectedPerson(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="">Select a Person</option>
                  {persons.length > 0 ? (
                    persons.map((person,index) => (
                      <option key={person.index} value={person.personId}>
                        {person.firstName} ,{person.lastName}, {person.mobileNumber}
                      </option>
                    ))
                  ) : (
                    <option disabled>No persons available</option>
                  )}
                </Input>
              </FormGroup>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <FormGroup>
                <Label for="imageUpload">Upload Images:</Label>
                <Input type="file" id="imageUpload" onChange={handleFileChange} multiple />
                <div className="image-preview-container mt-2">
                  {imagePreviews.map((preview, index) => (
                    <img key={index} src={preview} alt={`Image ${index + 1}`} className="image-preview" />
                  ))}
                </div>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="remarks">Remarks:</Label>
                <Input
                  type="text"
                  id="remarks"
                  name="remarks"
                  value={data.remarks}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <FormGroup>
                <Label for="MinValue">Min Value:</Label>
                <Input
                  type="text"
                  id="MinValue"
                  name="MinValue"
                  value={data.MinValue}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="MaxValue">Max Value:</Label>
                <Input
                  type="text"
                  id="MaxValue"
                  name="MaxValue"
                  value={data.MaxValue}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="MaxServer">Max Server:</Label>
                <Input
                  type="text"
                  id="MaxServer"
                  name="MaxServer"
                  value={data.MaxServer}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row className="mb-3 justify-content-center">
            <Col md={6} className="text-center">
              <Button color="primary" type="submit" disabled={isLoading}>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default DeviceAssignForm;
