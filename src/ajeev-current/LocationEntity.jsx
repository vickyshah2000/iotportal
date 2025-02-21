import React, { useEffect, useState } from "react";
import axios from "axios";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// Breadcrumb
import Breadcrumbs from "../components/Common/Breadcrumb";

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
  Button,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

//file uploades
import Dropzone from "react-dropzone";

// import images
import profileImg from "../assets/images/profile-img.png";
import logoImg from "../assets/images/logo.svg";
import { fetchWithTokenRefresh } from "../helpers/AuthType/backend";

const URL_STATE = "http://20.244.47.43:8000/filter-api/get-state/";
const URL_CITY = "http://20.244.47.43:8000/filter-api/get-city/";
const URL_WARD = "http://20.244.47.43:8000/filter-api/get-ward/";

const LocationEntity = () => {
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [ward, setWard] = useState([]);
  const [selectedFiles, setselectedFiles] = useState([]); // select files

  //select files function
  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  //meta title
  document.title = "Register";

  //form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      Address1: "",
      Address2: "",
      Address3: "",
      State: "",
      Country: "",
      City: "",
      Zone: "",
      Ward: "",
      Zipcode: "",
      Longitude: "",
      Latitude: "",
    },
    validationSchema: Yup.object({
      Address1: Yup.string().required("Please Enter Your Address"),
      Address2: Yup.string().required("Please Enter Your Address"),
      Address3: Yup.string().required("Please Enter Your Address"),
      State: Yup.string().required("Please Enter Your State"),
      Country: Yup.string().required("Please Enter Your Country"),
      City: Yup.string().required("Please Enter Your City"),
      Zone: Yup.string(),
      Ward: Yup.string().required("Please Enter Your Ward"),
      Zipcode: Yup.string().required("Please Enter Your Zip Code"),
      Longitude: Yup.string().required("Please Enter Your Longitude"),
      Latitude: Yup.string().required("Please Enter Your Latitude"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // Api calls for dropdowns
  async function getState(url) {
    const res = await fetchWithTokenRefresh({url:url})
    setState(res.data);
  }
  async function getCity(url) {
    const res = await fetchWithTokenRefresh({url:url})
    setCity(res.data);
  }
  async function getWard(url) {
    const res = await fetchWithTokenRefresh({url:url})
    setWard(res.data);
  }
  //
  // handle selection of dropdowns
  function handleCountryState(id) {
    getState(URL_STATE + id);
  }
  function handleStateState(id) {
    getCity(URL_CITY + id);
  }
  function handleCityState(id) {
    getWard(URL_WARD + id);
  }
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
                        <h5 className="text-primary">Location Details</h5>
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
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-3">
                        <Row className="mb-3">
                          <Col sm={4}>
                            <Label className="form-label">Location</Label>
                            <Input
                              id="Address1"
                              name="Address1"
                              className="form-control"
                              placeholder="Enter Address line-1"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.Address1 || ""}
                              invalid={
                                validation.touched.Address1 &&
                                validation.errors.Address1
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.Address1 &&
                            validation.errors.Address1 ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Address1}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">State</Label>
                            <Input
                              id="State"
                              name="State"
                              className="form-control"
                              placeholder="Enter State"
                              type="select"
                              onChange={validation.handleChange}
                              onBlur={(e) => {
                                validation.handleBlur;
                                handleStateState(e.target.value);
                              }}
                              value={validation.values.State || ""}
                              invalid={
                                validation.touched.State &&
                                validation.errors.State
                                  ? true
                                  : false
                              }
                            >
                              <option value="default">Choose state</option>
                              <option>Rajasthan</option>
                              {state.map((item, _) => {
                                return (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </Input>
                            {validation.touched.State &&
                            validation.errors.State ? (
                              <FormFeedback type="invalid">
                                {validation.errors.State}
                              </FormFeedback>
                            ) : null}
                          </Col>

                          {/* <Col sm={4}>
                            <Label className="form-label">Country</Label>
                            <Input
                              id="Country"
                              name="Country"
                              className="form-control"
                              placeholder="Enter Country"
                              type="select"
                              onChange={validation.handleChange}
                              onBlur={(e) => {
                                validation.handleBlur;
                                handleCountryState(e.target.value);
                              }}
                              value={validation.values.Country || ""}
                              invalid={
                                validation.touched.Country &&
                                validation.errors.Country
                                  ? true
                                  : false
                              }
                            >
                              <option value="default">Choose country</option>
                              <option value={2}>India</option>
                            </Input>
                            {validation.touched.Country &&
                            validation.errors.Country ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Country}
                              </FormFeedback>
                            ) : null}
                          </Col> */}

                          <Col sm={4}>
                            <Label className="form-label">Zone</Label>
                            <Input
                              id="Zone"
                              name="Zone"
                              className="form-control"
                              placeholder="Enter Zone"
                              type="select"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.Zone || ""}
                              invalid={
                                validation.touched.Zone &&
                                validation.errors.Zone
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.Zone &&
                            validation.errors.Zone ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Zone}
                              </FormFeedback>
                            ) : null}
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          {/* <Col sm={4}>
                            <Label className="form-label">Address Line-2</Label>
                            <Input
                              id="Address2"
                              name="Address2"
                              className="form-control"
                              placeholder="Enter Address line-2"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.Address2 || ""}
                              invalid={
                                validation.touched.Address2 &&
                                validation.errors.Address2
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.Address2 &&
                            validation.errors.Address2 ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Address2}
                              </FormFeedback>
                            ) : null}
                          </Col> */}
                          
                          <Col sm={4}>
                            <Label className="form-label">Ward</Label>
                            <Input
                              id="Ward"
                              name="Ward"
                              className="form-control"
                              placeholder="Enter Ward"
                              type="select"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.Ward || ""}
                              invalid={
                                validation.touched.Ward &&
                                validation.errors.Ward
                                  ? true
                                  : false
                              }
                            >
                              <option value="dfault">Choose ward</option>
                              <option>xyz</option>

                              {ward.map((item, _) => {
                                return (
                                  <option key={item.id}>{item.name}</option>
                                );
                              })}
                            </Input>
                            {validation.touched.Ward &&
                            validation.errors.Ward ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Ward}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">City</Label>
                            <Input
                              id="City"
                              name="City"
                              className="form-control"
                              placeholder="Enter City"
                              type="select"
                              onChange={validation.handleChange}
                              onBlur={(e) => {
                                validation.handleBlur;
                                handleCityState(e.target.value);
                              }}
                              value={validation.values.City || ""}
                              invalid={
                                validation.touched.City &&
                                validation.errors.City
                                  ? true
                                  : false
                              }
                            >
                              <option value="default">Choose City</option>

                              <option>Agra</option>
                              {city.map((item, _) => {
                                return (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </Input>
                            {validation.touched.City &&
                            validation.errors.City ? (
                              <FormFeedback type="invalid">
                                {validation.errors.City}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          {/* <Col sm={4}>
                            <Label className="form-label">Zip code</Label>
                            <Input
                              id="Zipcode"
                              name="Zipcode"
                              className="form-control"
                              placeholder="Enter Zip code"
                              type="number"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.Zipcode || ""}
                              invalid={
                                validation.touched.Zipcode &&
                                validation.errors.Zipcode
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.Zipcode &&
                            validation.errors.Zipcode ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Zipcode}
                              </FormFeedback>
                            ) : null}
                          </Col> */}
                        </Row>
                        <Row className="mb-3">
                          {/* <Col sm={4}>
                            <Label className="form-label">Address Line-3</Label>
                            <Input
                              id="Address3"
                              name="Address3"
                              className="form-control"
                              placeholder="Enter Address line-3"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.Address3 || ""}
                              invalid={
                                validation.touched.Address3 &&
                                validation.errors.Address3
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.Address3 &&
                            validation.errors.Address3 ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Address3}
                              </FormFeedback>
                            ) : null}
                          </Col> */}
                          

                          
                        </Row>
                        <Row className="mb-3">
                          <Col sm={4}>
                            <Label className="form-label">Longitude</Label>
                            <Input
                              id="Longitude"
                              name="Longitude"
                              className="form-control"
                              placeholder="Enter Longitude"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.Longitude || ""}
                              invalid={
                                validation.touched.Longitude &&
                                validation.errors.Longitude
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.Longitude &&
                            validation.errors.Longitude ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Longitude}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">Latitude</Label>
                            <Input
                              id="Latitude"
                              name="Latitude"
                              className="form-control"
                              placeholder="Enter Latitude"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.Latitude || ""}
                              invalid={
                                validation.touched.Latitude &&
                                validation.errors.Latitude
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.Latitude &&
                            validation.errors.Latitude ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Latitude}
                              </FormFeedback>
                            ) : null}
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col sm={12}>
                            <div className="page-content">
                              <Container fluid={true}>
                                <Breadcrumbs
                                  title="Forms"
                                  breadcrumbItem="Upload images"
                                />

                                <Row>
                                  <Col className="col-12">
                                    <Card>
                                      <CardBody>
                                        {/* <CardTitle>Dropzone</CardTitle>
                                        <CardSubtitle className="mb-3">
                                          {" "}
                                          DropzoneJS is an open source library
                                          that provides drag’n’drop file uploads
                                          with image previews.
                                        </CardSubtitle> */}
                                        
                                          <Dropzone
                                            onDrop={(acceptedFiles) => {
                                              handleAcceptedFiles(
                                                acceptedFiles
                                              );
                                            }}
                                          >
                                            {({
                                              getRootProps,
                                              getInputProps,
                                            }) => (
                                              <div className="dropzone">
                                                <div
                                                  className="dz-message needsclick mt-2"
                                                  {...getRootProps()}
                                                >
                                                  <input {...getInputProps()} />
                                                  <div className="mb-3">
                                                    <i className="display-4 text-muted bx bxs-cloud-upload" />
                                                  </div>
                                                  <h4>
                                                    Drop files here or click to
                                                    upload.
                                                  </h4>
                                                </div>
                                              </div>
                                            )}
                                          </Dropzone>
                                          <div
                                            className="dropzone-previews mt-3"
                                            id="file-previews"
                                          >
                                            {selectedFiles.map((f, i) => {
                                              return (
                                                <Card
                                                  className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                  key={i + "-file"}
                                                >
                                                  <div className="p-2">
                                                    <Row className="align-items-center">
                                                      <Col className="col-auto">
                                                        <img
                                                          data-dz-thumbnail=""
                                                          height="80"
                                                          className="avatar-sm rounded bg-light"
                                                          alt={f.name}
                                                          src={f.preview}
                                                        />
                                                      </Col>
                                                      <Col>
                                                        <Link
                                                          to="#"
                                                          className="text-muted font-weight-bold"
                                                        >
                                                          {f.name}
                                                        </Link>
                                                        <p className="mb-0">
                                                          <strong>
                                                            {f.formattedSize}
                                                          </strong>
                                                        </p>
                                                      </Col>
                                                    </Row>
                                                  </div>
                                                </Card>
                                              );
                                            })}
                                          </div>
                                        

                                        <div className="text-center mt-4">
                                          <button
                                            type="button"
                                            className="btn btn-primary "
                                          >
                                            Send Files
                                          </button>
                                        </div>
                                      </CardBody>
                                    </Card>
                                  </Col>
                                </Row>
                              </Container>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <div className="mt-4 text-center">
                        <button
                          className="btn btn-danger btn-block"
                          type="submit"
                        >
                          confirm Address
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

export default LocationEntity;