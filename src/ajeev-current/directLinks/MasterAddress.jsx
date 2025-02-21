import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useHistory, useLocation } from "react-router-dom";
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
import { fetchWithTokenRefresh, postWithTokenRefresh } from "../../helpers/AuthType/backend";

const base_url = import.meta.env.VITE_BASE_URL;
const base_url3 = import.meta.env.VITE_BASE_URL3;

const MasterAddress = () => {
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [zone, setZone] = useState([]);
  const [ward, setWard] = useState([]);
  const [region, setRegion] = useState([]);
  const [Type, setType] = useState([]);
  const [entity, setentity] = useState([]);

  const location = useLocation();
  const history = useHistory();

  const config = { headers: { "Content-Type": "application/json" } };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      address1: "",
      address2: "",
      pincode: "",
      state: "",
      city: "",
      ward: "",
      region: "",
      zone: "",
      longitude: "",
      latitude: "",
      Country: "",
      addressType: "",
      remarks: "",
      entityName: "",
    },
    validationSchema: Yup.object({
      address1: Yup.string().required("Please Enter Your Address"),
      address2: Yup.string().required("Please Enter Your Address"),
      state: Yup.string().required("Please select a state"),
      Country: Yup.string().required("Please select a country"),
      city: Yup.string().required("Please select a city"),
      zone: Yup.string().required("Please select a zone"),
      region: Yup.string().required("Please select a region"),
      ward: Yup.string().required("Please select a ward"),
      pincode: Yup.string(),
      longitude: Yup.string(),
      latitude: Yup.string(),
      addressType: Yup.string().required("Please select an address type"),
      entityName: Yup.string().required("Please select Entity Name"),
      remarks: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        await postWithTokenRefresh({
          url:  `${base_url3}/api/Entity/CreateAddressForEntity`,
          body: {
            entityId: parseInt(values.entityName),
            "addresses": [{
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
              remarks: values.remarks,
            }]
          },
        });
        history.push("/entity-table");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const fetchState = async () => {
    try {
      const response = await fetchWithTokenRefresh({
        url: `${base_url3}/api/State/GetStatesByCountryId?countryId=1`,
      });
      setState(response.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCityAndWard = async (stateId) => {
    try {
      const [cityResponse, wardResponse] = await Promise.all([
        fetchWithTokenRefresh({ url: `${base_url3}/api/City/GetCitiesByStateId?stateId=${stateId}` }),
        fetchWithTokenRefresh({ url: `${base_url3}/api/Ward/GetWardsByStateId?stateId=${stateId}` }),
      ]);
      setCity(cityResponse.data);
      setWard(wardResponse.data);
    } catch (error) {
      console.error("Error fetching city and ward:", error);
    }
  };

  const fetchZoneAndRegion = async () => {
    try {
      const [entityName, zoneResponse, regionResponse, TypeResponse] =
        await Promise.all([
          fetchWithTokenRefresh({
            url: `${base_url3}/api/Entity/GetAllEntities`,
          }),
          fetchWithTokenRefresh({ url: `${base_url3}/api/Zone/GetAllZones` }),
          fetchWithTokenRefresh({ url: `${base_url3}/api/Region/GetAllRegions` }),
          fetchWithTokenRefresh({ url: `${base_url3}/api/AddressType/GetAllAddressTypes` }),
        ]);
      setZone(zoneResponse.data);
      setRegion(regionResponse.data);
      setType(TypeResponse.data);
      setentity(entityName.data.data);
    } catch (error) {
      console.error("Error fetching zone and region:", error);
    }
  };

  useEffect(() => {
    fetchState();
    fetchZoneAndRegion();
  }, []);

  useEffect(() => {
    if (validation.values.state) {
      fetchCityAndWard(validation.values.state);
    }
  }, [validation.values.state]);

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
                              id="entityName"
                              name="entityName"
                              className="form-control"
                              type="select"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.entityName}
                              invalid={
                                validation.touched.entityName &&
                                !!validation.errors.entityName
                              }
                            >
                              <option value="default">Choose one</option>
                              {entity.map((item) => (
                                <option
                                  key={item.entityId}
                                  value={item.entityId}
                                >
                                  {item.name}
                                </option>
                              ))}
                            </Input>
                            <FormFeedback>
                              {validation.errors.state}
                            </FormFeedback>
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
                              value={validation.values.address1}
                              invalid={
                                validation.touched.address1 &&
                                !!validation.errors.address1
                              }
                            />
                            <FormFeedback>
                              {validation.errors.address1}
                            </FormFeedback>
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
                              onBlur={validation.handleBlur}
                              value={validation.values.Country}
                              invalid={
                                validation.touched.Country &&
                                !!validation.errors.Country
                              }
                            >
                              <option value="">Choose Country</option>
                              <option value="1">India</option>
                            </Input>
                            <FormFeedback>
                              {validation.errors.Country}
                            </FormFeedback>
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
                              value={validation.values.pincode}
                              invalid={
                                validation.touched.pincode &&
                                !!validation.errors.pincode
                              }
                            />
                            <FormFeedback>
                              {validation.errors.pincode}
                            </FormFeedback>
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
                              value={validation.values.address2}
                              invalid={
                                validation.touched.address2 &&
                                !!validation.errors.address2
                              }
                            />
                            <FormFeedback>
                              {validation.errors.address2}
                            </FormFeedback>
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">State</Label>
                            <Input
                              id="state"
                              name="state"
                              className="form-control"
                              placeholder="Enter state"
                              type="select"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.state}
                              invalid={
                                validation.touched.state &&
                                !!validation.errors.state
                              }
                            >
                              <option value="">Choose State</option>
                              {state.map((item) => (
                                <option
                                  key={item.stateId}
                                  value={item.stateId}
                                >
                                  {item.statename}
                                </option>
                              ))}
                            </Input>
                            <FormFeedback>
                              {validation.errors.state}
                            </FormFeedback>
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
                              value={validation.values.zone}
                              invalid={
                                validation.touched.zone &&
                                !!validation.errors.zone
                              }
                            >
                              <option value="">Choose Zone</option>
                              {zone.map((item) => (
                                <option key={item.zoneId} value={item.zoneId}>
                                  {item.zonename}
                                </option>
                              ))}
                            </Input>
                            <FormFeedback>
                              {validation.errors.zone}
                            </FormFeedback>
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
                              value={validation.values.ward}
                              invalid={
                                validation.touched.ward &&
                                !!validation.errors.ward
                              }
                            >
                              <option value="">Choose Ward</option>
                              {ward.map((item) => (
                                <option key={item.wardId} value={item.wardId}>
                                  {item.wardname}
                                </option>
                              ))}
                            </Input>
                            <FormFeedback>
                              {validation.errors.ward}
                            </FormFeedback>
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
                              value={validation.values.city}
                              invalid={
                                validation.touched.city &&
                                !!validation.errors.city
                              }
                            >
                              <option value="">Choose City</option>
                              {city.map((item) => (
                                <option key={item.cityId} value={item.cityId}>
                                  {item.cityname}
                                </option>
                              ))}
                            </Input>
                            <FormFeedback>
                              {validation.errors.city}
                            </FormFeedback>
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
                              value={validation.values.latitude}
                              invalid={
                                validation.touched.latitude &&
                                !!validation.errors.latitude
                              }
                            />
                            <FormFeedback>
                              {validation.errors.latitude}
                            </FormFeedback>
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
                              value={validation.values.longitude}
                              invalid={
                                validation.touched.longitude &&
                                !!validation.errors.longitude
                              }
                            />
                            <FormFeedback>
                              {validation.errors.longitude}
                            </FormFeedback>
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
                              value={validation.values.region}
                              invalid={
                                validation.touched.region &&
                                !!validation.errors.region
                              }
                            >
                              <option value="">Choose Region</option>
                              {region.map((item) => (
                                <option
                                  key={item.regionId}
                                  value={item.regionId}
                                >
                                  {item.regionname}
                                </option>
                              ))}
                            </Input>
                            <FormFeedback>
                              {validation.errors.region}
                            </FormFeedback>
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">Address Type</Label>
                            <Input
                              id="entityName"
                              name="addressType"
                              className="form-control"
                              type="select"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.addressType}
                              invalid={
                                validation.touched.addressType &&
                                !!validation.errors.addressType
                              }
                            >
                              <option value="">Choose Address Type</option>
                              {Type.map((item) => (
                                <option
                                  key={item.id}
                                  value={item.id}
                                >
                                  {item.name}
                                </option>
                              ))}
                            </Input>
                            <FormFeedback>
                              {validation.errors.addressType}
                            </FormFeedback>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col sm={4}>
                            <Label className="form-label">Remarks</Label>
                            <Input
                              id="remarks"
                              name="remarks"
                              className="form-control"
                              placeholder="Enter remarks"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.remarks}
                              invalid={
                                validation.touched.remarks &&
                                !!validation.errors.remarks
                              }
                            />
                            <FormFeedback>
                              {validation.errors.remarks}
                            </FormFeedback>
                          </Col>
                        </Row>
                      </div>
                      <div className="mt-4 text-center">
                        <button
                          className="btn btn-danger btn-block"
                          type="submit"
                          disabled={
                            !validation.isValid || validation.isSubmitting
                          }
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

export default MasterAddress;
