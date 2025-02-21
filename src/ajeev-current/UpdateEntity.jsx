import React, { useEffect, useState } from "react";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { Link, useHistory } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

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
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// import images
import profileImg from "../assets/images/profile-img.png";
import logoImg from "../assets/images/logo.svg";
import TableContainer from "./RegisteredEntity/TableContainer";
import axios from "axios";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { fetchWithTokenRefresh } from "../helpers/AuthType/backend";

const UpdateEntity = () => {
  const base_url = import.meta.env.VITE_BASE_URL
  console.log(base_url)
  const history = useHistory();
  const location = useLocation();
  const entityId = location.state.entityId;
  console.log(entityId);
  //meta title
  document.title = "Register Your Store";

  const [role, setRole] = useState([]);
  const [type, setType] = useState([]);
  
  useEffect(() => {
    async function handleRole() {
      const res = await fetchWithTokenRefresh({url:`${base_url}/api/entity-role/`}) 
      console.log(res);
      setRole(res.data);
    }
    async function handleType() {
      const res = await fetchWithTokenRefresh({url:`${base_url}/api/entity-type/`})
      console.log(res);
      setType(res.data);
    }
    handleRole();
    handleType();
  }, []);
  //form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      shortName: "",
      longName: "",
      role: "",
      type: "",
      tradeName: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter name"),
      shortName: Yup.string().required("Please Enter Short name"),
      longName: Yup.string().required("Please Enter Long name"),
      tradeName: Yup.string().required("Please Enter Trade name"),
      role: Yup.string().required("Please Choose role"),
      type: Yup.string().required("Please Choose type"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        await axios.put(`${base_url}/api/entity/${entityId}/`, {
          name: values.name,
          short_name: values.shortName,
          long_name: values.longName,
          trade_name: values.tradeName,
          role_id: values.role,
          type_id: values.type,
        });
        console.log("done");
        // props.setModal(false);
        history.push("/entity-table");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <React.Fragment>
      {/* <Modal isOpen={modal} size={"lg"} toggle={toggle}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalAddress />
      </Modal>
      <Modal isOpen={modalContact} size={"lg"} toggle={toggleContact}>
        <ModalHeader toggle={toggleContact}></ModalHeader>
        <ModalContact />
      </Modal> */}
      <div className="home-btn d-none d-sm-block"></div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={8} xl={12}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Register</h5>
                        <p className="text-danger fs-3">
                          Get your account now.
                        </p>
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
                  <div className="mt-4 text-end">
                    {/* <button className="btn btn-danger btn-block" type="submit">
                      Save Store
                    </button> */}
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
                        <Row className="my-2">
                          <Col sm={4}>
                            <Label className="form-label">Name</Label>
                            <Input
                              id="name"
                              name="name"
                              className="form-control"
                              placeholder="Enter Store Name"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.name || ""}
                              invalid={
                                validation.touched.name &&
                                validation.errors.name
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.name &&
                            validation.errors.name ? (
                              <FormFeedback type="invalid">
                                {validation.errors.name}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">Short name</Label>
                            <Input
                              id="shortName"
                              name="shortName"
                              className="form-control"
                              placeholder="Enter Short Name"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.shortName || ""}
                              invalid={
                                validation.touched.shortName &&
                                validation.errors.shortName
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.shortName &&
                            validation.errors.shortName ? (
                              <FormFeedback type="invalid">
                                {validation.errors.shortName}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">long name</Label>
                            <Input
                              id="longName"
                              name="longName"
                              className="form-control"
                              placeholder="Enter Long Name"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.longName || ""}
                              invalid={
                                validation.touched.longName &&
                                validation.errors.longName
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.longName &&
                            validation.errors.longName ? (
                              <FormFeedback type="invalid">
                                {validation.errors.longName}
                              </FormFeedback>
                            ) : null}
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={4}>
                            <Label className="form-label">Trade name</Label>
                            <Input
                              id="tradeName"
                              name="tradeName"
                              className="form-control"
                              placeholder="Enter Trade name"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.tradeName || ""}
                              invalid={
                                validation.touched.tradeName &&
                                validation.errors.tradeName
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.tradeName &&
                            validation.errors.tradeName ? (
                              <FormFeedback type="invalid">
                                {validation.errors.tradeName}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">Role</Label>
                            <Input
                              id="role"
                              name="role"
                              className="form-control"
                              type="select"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.role || ""}
                              invalid={
                                validation.touched.role &&
                                validation.errors.role
                                  ? true
                                  : false
                              }
                            >
                              <option value="default">Choose one</option>

                              {role &&
                                role.map((item, idx) => (
                                  <option
                                    key={item.role_id}
                                    value={item.role_id}
                                  >
                                    {item.role_name}
                                  </option>
                                ))}
                            </Input>
                            {validation.touched.role &&
                            validation.errors.role ? (
                              <FormFeedback type="invalid">
                                {validation.errors.role}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">Type</Label>
                            <Input
                              id="type"
                              name="type"
                              className="form-control"
                              type="select"
                              onChange={validation.handleChange}
                              onBlur={(e) => {
                                validation.handleBlur;
                              }}
                              value={validation.values.type || ""}
                              invalid={
                                validation.touched.type &&
                                validation.errors.type
                                  ? true
                                  : false
                              }
                            >
                              <option value="default">Choose one</option>

                              {type &&
                                type.map((item, idx) => (
                                  <option
                                    key={item.type_id}
                                    value={item.type_id}
                                  >
                                    {item.name}
                                  </option>
                                ))}
                            </Input>
                            {validation.touched.role &&
                            validation.errors.role ? (
                              <FormFeedback type="invalid">
                                {validation.errors.role}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          {/* <Col sm={4}>
                            <Label className="form-label">Pan Number</Label>
                            <Input
                              id="panNumber"
                              name="panNumber"
                              className="form-control"
                              placeholder="Enter PAN Number"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.panNumber || ""}
                              invalid={
                                validation.touched.panNumber &&
                                validation.errors.panNumber
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.panNumber &&
                            validation.errors.panNumber ? (
                              <FormFeedback type="invalid">
                                {validation.errors.panNumber}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">GST</Label>
                            <Input
                              id="gst"
                              name="gst"
                              className="form-control"
                              placeholder="Enter GST Number"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.gst || ""}
                              invalid={
                                validation.touched.gst && validation.errors.gst
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.gst && validation.errors.gst ? (
                              <FormFeedback type="invalid">
                                {validation.errors.gst}
                              </FormFeedback>
                            ) : null}
                          </Col> */}
                        </Row>
                      </div>

                      <div className="d-flex justify-content-center">
                        {/* <div className="mt-4 mx-2">
                          <Button color="primary" onClick={moveToAddress}>
                            Add Location
                          </Button>
                        </div>
                        <div className="mt-4 mx-2">
                          <Button color="primary" onClick={moveToContact}>
                            Add Contact
                          </Button>
                        </div> */}
                        <div className="mt-4 mx-2">
                          <Button color="primary" type="submit">
                            Register
                          </Button>
                        </div>
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

export default UpdateEntity;
