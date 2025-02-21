import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  CardBody,
  Card,
  Container,
  Form,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import {
  fetchWithTokenRefresh,
  putWithTokenRefresh,
} from "../../helpers/AuthType/backend";

// const base_url = import.meta.env.VITE_BASE_URL;
const base_url3 = import.meta.env.VITE_BASE_URL3;

const URL_STATE = `${base_url3}/api/State/GetStatesByCountryId?countryId=1`;
const URL_CITY = `${base_url3}/api/City/GetCitiesByStateId?stateId=`;
const URL_WARD = `${base_url3}/api/Ward/GetWardsByStateId?stateId=`;
const URL_TYPE = `${base_url3}/api/AddressType/GetAllAddressTypes`;
const URL_REGION = `${base_url3}/api/Region/GetAllRegions`;
const URL_Zone = `${base_url3}/api/Zone/GetAllZones`;

const EditAddress = () => {
  const [addressTypeData, setAddressTypeData] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [zone, setZone] = useState([]);
  const [ward, setWard] = useState([]);
  const [region, setRegion] = useState([]);
  const [prevData, setPrevdata] = useState([]);

  const location = useLocation();
  const addressId = location.state.alldata.id;
  const cityId = location.state.alldata.City_Id;
  const regionId = location.state.alldata.Region_Id;
  const stateId = location.state.alldata.stateId;
  const wardId = location.state.alldata.Ward_Id;
  const zoneId = location.state.alldata.Zone_Id;
  const addressTypeId = location.state.alldata.addressTypeId;
  const addressline1 = location.state.alldata.addressline1;
  const addressline2 = location.state.alldata.Addressline2;
  const countryId = location.state.alldata.countryId;
  const latitude = location.state.alldata.latitude;
  const longitude = location.state.alldata.longitude;
  const pincode = location.state.alldata.pincode;
  const remarks = location.state.alldata.remarks;
  // console.log("edit address id", cityId);
  const entityId = location.state.entityId;
  const entityName = location.state.entityName;
  //   console.log("edit ke andar entity",entityId)

  const history = useHistory();

  const config = { headers: { "Content-Type": "application/json" } };

  document.title = "Edit Address";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetchWithTokenRefresh({
  //         url: `${base_url}/api/address/${addressId}/`,
  //       });

  //       setPrevdata(response.data);
  //       console.log(response.data);

  //       // setLoading(false); // Set loading to false when data is fetched
  //     } catch (error) {
  //       // setError(error); // Set error if there's an error in fetching data
  //       // setLoading(false); // Set loading to false if there's an error
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      address1: addressline1 || "",
      address2: addressline2 || "",
      pincode: pincode || "",
      state:stateId || "",
      city: cityId || "",
      ward: wardId || "",
      region: regionId || "",
      zone: zoneId || "",
      longitude:longitude || "",
      latitude: latitude || "",
      Country:countryId || "",
      addressType: addressTypeId || "",
      remarks: remarks || "",
    },
    validationSchema: Yup.object({
      address1: Yup.string().required("Please Enter Your Address"),
      address2: Yup.string().required("Please Enter Your Address"),
      state: Yup.string().required("Please Enter Your State"),
      Country: Yup.string().required("Please Enter Your Country"),
      city: Yup.string().required("Please Enter Your City"),
      zone: Yup.string().required("Please Enter Your Zone"),
      region: Yup.string().required("Please Enter Your Region"),
      // ward: Yup.string().required("Please Enter Your Ward"),
      pincode: Yup.string(),
      longitude: Yup.string(),
      latitude: Yup.string(),
      addressType: Yup.string().required("Please Enter Your Address"),
      remarks: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        await putWithTokenRefresh({
          url: `${base_url3}/api/Entity/UpdateAddressForEntity/${addressId}`,
          body: {
            entityId:entityId,
            "addresses":[{
            addressline1: values.address1,
            addressline2: values.address2,
            pincode: values.pincode,
            latitude: values.latitude,
            longitude: values.longitude,
            countryId: parseInt(values.Country),
            cityId: parseInt(values.city),
            stateId: parseInt(values.state),
            wardId: parseInt(values.ward),
            regionId: parseInt(values.region),
            zoneId: parseInt(values.zone),
            addressType: parseInt(values.addressType),
            remarks: values.remarks
          }]
          },
        });
        console.log("post done");
        history.push("/address-table", {
          entityId: entityId,
          entityName: entityName,
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  async function getState(url) {
    const res = await fetchWithTokenRefresh({ url: url });
    setState(res.data);
  }
  async function getCity(url) {
    const res = await fetchWithTokenRefresh({ url: url });
    setCity(res.data);
  }
  async function getWard(url) {
    const res = await fetchWithTokenRefresh({ url: url });
    setWard(res.data);
  }

  function handleCountryState() {
    console.log("Country");
    getState(URL_STATE);
  }
  function handleStateState(id) {
    getCity(`${URL_CITY}${id}`);
    getWard(`${URL_WARD}${id}`);
  }

  useEffect(() => {
    async function getType() {
      const res = await fetchWithTokenRefresh({ url: URL_TYPE });
      setAddressTypeData(res.data);
    }
    async function getRegion() {
      const res = await fetchWithTokenRefresh({ url: URL_REGION });
      setRegion(res.data);
    }
    async function getZone() {
      const res = await fetchWithTokenRefresh({ url: URL_Zone });
      setZone(res.data);
    }
    getType();
    getRegion();
    getZone();
  }, []);

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={8} xl={12}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Address Details</h5>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
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
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={validation.handleSubmit}
                    >
                      <div className="mb-3">
                        <Row className="mb-3">
                          <Col sm={4}>
                            <Label className="form-label">Entity Name</Label>
                            <Input
                              className="form-control"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={entityName}
                              readOnly
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col sm={4}>
                            <Label className="form-label">Address Line-1</Label>
                            <Input
                              id="address1"
                              name="address1"
                              className="form-control"
                              placeholder="Enter Address line-1"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.address1 || ""}
                              invalid={
                                validation.touched.address1 &&
                                validation.errors.address1
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.address1 &&
                            validation.errors.address1 ? (
                              <FormFeedback type="invalid">
                                {validation.errors.address1}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">Country</Label>
                            <Input
                              id="Country"
                              name="Country"
                              className="form-control"
                              placeholder="Enter Country"
                              type="select"
                              onChange={validation.handleChange}
                              onBlur={(e) => {
                                validation.handleBlur(e);
                                handleCountryState();
                              }}
                              value={validation.values.Country || ""}
                              invalid={
                                validation.touched.Country &&
                                validation.errors.Country
                                  ? true
                                  : false
                              }
                            >
                              <option value="default">Choose Country</option>
                              <option value="1">India</option>
                            </Input>
                            {validation.touched.Country &&
                            validation.errors.Country ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Country}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">PinCode</Label>
                            <Input
                              id="pincode"
                              name="pincode"
                              className="form-control"
                              placeholder="Enter Pincode"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.pincode || ""}
                              invalid={
                                validation.touched.pincode &&
                                validation.errors.pincode
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.pincode &&
                            validation.errors.pincode ? (
                              <FormFeedback type="invalid">
                                {validation.errors.pincode}
                              </FormFeedback>
                            ) : null}
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col sm={4}>
                            <Label className="form-label">Address Line-2</Label>
                            <Input
                              id="address2"
                              name="address2"
                              className="form-control"
                              placeholder="Enter Address line-2"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.address2 || ""}
                              invalid={
                                validation.touched.address2 &&
                                validation.errors.address2
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.address2 &&
                            validation.errors.address2 ? (
                              <FormFeedback type="invalid">
                                {validation.errors.address2}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">State</Label>
                            <Input
                              id="state"
                              name="state"
                              className="form-control"
                              placeholder="Enter state"
                              type="select"
                              value={validation.values.state || ""}
                              onChange={validation.handleChange}
                              onBlur={(e) => {
                                validation.handleBlur(e);
                                handleStateState(e.target.value);
                              }}
                              invalid={
                                validation.touched.state &&
                                validation.errors.state
                                  ? true
                                  : false
                              }
                            >
                              <option value="default">Choose State</option>
                              {state.map((item) => (
                                <option
                                  key={item.stateId}
                                  value={item.stateId}
                                >
                                  {item.statename}
                                </option>
                              ))}
                            </Input>
                            {validation.touched.state &&
                            validation.errors.state ? (
                              <FormFeedback type="invalid">
                                {validation.errors.state}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">Zone</Label>
                            <Input
                              id="zone"
                              name="zone"
                              className="form-control"
                              placeholder="Enter zone"
                              type="select"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.zone || ""}
                              invalid={
                                validation.touched.zone &&
                                validation.errors.zone
                                  ? true
                                  : false
                              }
                            >
                              <option value="default">Choose one</option>
                              {zone.map((item, _) => (
                                <option key={item.zoneId} value={item.zoneId}>
                                  {item.zonename}
                                </option>
                              ))}
                            </Input>
                            {validation.touched.zone &&
                            validation.errors.zone ? (
                              <FormFeedback type="invalid">
                                {validation.errors.zone}
                              </FormFeedback>
                            ) : null}
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col sm={4}>
                            <Label className="form-label">Ward</Label>
                            <Input
                              id="ward"
                              name="ward"
                              className="form-control"
                              placeholder="Enter ward"
                              type="select"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.ward || ""}
                              invalid={
                                validation.touched.ward &&
                                validation.errors.ward
                                  ? true
                                  : false
                              }
                            >
                              <option value="dfault">Choose ward</option>
                              {ward.map((item) => (
                                <option key={item.wardId} value={item.wardId}>
                                  {item.wardname}
                                </option>
                              ))}
                            </Input>
                            {validation.touched.ward &&
                            validation.errors.ward ? (
                              <FormFeedback type="invalid">
                                {validation.errors.ward}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">City</Label>
                            <Input
                              id="city"
                              name="city"
                              className="form-control"
                              placeholder="Enter city"
                              type="select"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.city || ""}
                              invalid={
                                validation.touched.city &&
                                validation.errors.city
                                  ? true
                                  : false
                              }
                            >
                              <option value="default">Choose city</option>
                              {city.map((item) => (
                                <option key={item.cityId} value={item.cityId}>
                                  {item.cityname}
                                </option>
                              ))}
                            </Input>
                            {validation.touched.city &&
                            validation.errors.city ? (
                              <FormFeedback type="invalid">
                                {validation.errors.city}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">Latitude</Label>
                            <Input
                              id="latitude"
                              name="latitude"
                              className="form-control"
                              placeholder="Enter Latitude"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.latitude || ""}
                              invalid={
                                validation.touched.latitude &&
                                validation.errors.latitude
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.latitude &&
                            validation.errors.latitude ? (
                              <FormFeedback type="invalid">
                                {validation.errors.latitude}
                              </FormFeedback>
                            ) : null}
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col sm={4}>
                            <Label className="form-label">Longitude</Label>
                            <Input
                              id="longitude"
                              name="longitude"
                              className="form-control"
                              placeholder="Enter Longitude"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.longitude || ""}
                              invalid={
                                validation.touched.longitude &&
                                validation.errors.longitude
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.longitude &&
                            validation.errors.longitude ? (
                              <FormFeedback type="invalid">
                                {validation.errors.longitude}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">Region</Label>
                            <Input
                              id="region"
                              name="region"
                              className="form-control"
                              placeholder="Enter region"
                              type="select"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.region || ""}
                              invalid={
                                validation.touched.region &&
                                validation.errors.region
                                  ? true
                                  : false
                              }
                            >
                              <option value="default">Choose Region</option>
                              {region.map((item) => (
                                <option
                                  key={item.regionId}
                                  value={item.regionId}
                                >
                                  {item.regionname}
                                </option>
                              ))}
                            </Input>
                            {validation.touched.region &&
                            validation.errors.region ? (
                              <FormFeedback type="invalid">
                                {validation.errors.region}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">Address Type</Label>
                            <Input
                              id="addressType"
                              name="addressType"
                              className="form-control"
                              type="select"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.addressType || ""}
                              invalid={
                                validation.touched.addressType &&
                                validation.errors.addressType
                                  ? true
                                  : false
                              }
                            >
                              <option value="default">
                                Choose Address Type
                              </option>
                              {addressTypeData.map((item) => (
                                <option
                                  key={item.id}
                                  value={item.id}
                                >
                                  {item.name}
                                </option>
                              ))}
                            </Input>
                            {validation.touched.addressType &&
                            validation.errors.addressType ? (
                              <FormFeedback type="invalid">
                                {validation.errors.addressType}
                              </FormFeedback>
                            ) : null}
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col sm={4}>
                            <Label className="form-label">Remarks</Label>
                            <Input
                              id="remarks"
                              name="remarks"
                              className="form-control"
                              placeholder="Remarks"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.remarks || ""}
                              invalid={
                                validation.touched.remarks &&
                                validation.errors.remarks
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.remarks &&
                            validation.errors.remarks ? (
                              <FormFeedback type="invalid">
                                {validation.errors.remarks}
                              </FormFeedback>
                            ) : null}
                          </Col>
                        </Row>
                      </div>
                      <div className="mt-4 text-center">
                        <button
                          className="btn btn-danger btn-block"
                          type="submit"
                        >
                          Confirm Address
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EditAddress;
