// Import React, useState, and other necessary components
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { Row, Col, CardBody, Card, Container, Form, Label, Input, FormFeedback, Button } from "reactstrap";

// import images
import profileImg from "../assets/images/profile-img.png";
import logoImg from "../assets/images/logo.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ModalRDS = (props) => {
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [modalContact, setModalContact] = useState(false);

  // Form validation with Formik
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      code: "",
      country: "",
      state: "",
      city: "" // Initialize rdstatus as empty string
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter name"),
      code: Yup.string().required("Please enter code"),
      country: Yup.string().required("Please enter country"),
      state: Yup.string().required("Please enter state"),
      city: Yup.string().required("Please choose city")
    }),
    onSubmit: (values) => {
      console.log(values);
      props.setModal(false)
      // You can perform any action here, such as sending data to the server
    },
  });

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
                        <h5 className="text-primary">RD Details</h5>
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
                          <img src={logoImg} alt="" className="rounded-circle" height="34" />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="mt-4 text-end"></div>
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
                              placeholder="Enter Name"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.name || ""}
                              invalid={validation.touched.name && validation.errors.name}
                            />
                            {validation.touched.name && validation.errors.name && (
                              <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                            )}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">RD Code</Label>
                            <Input
                              id="code"
                              name="code"
                              className="form-control"
                              placeholder="Enter code"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.code || ""}
                              invalid={validation.touched.code && validation.errors.code}
                            />
                            {validation.touched.code && validation.errors.code && (
                              <FormFeedback type="invalid">{validation.errors.code}</FormFeedback>
                            )}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">Country</Label>
                            <Input
                              id="country"
                              name="country"
                              className="form-control"
                              placeholder="Enter country"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.country || ""}
                              invalid={validation.touched.country && validation.errors.country}
                            />
                            {validation.touched.country && validation.errors.country && (
                              <FormFeedback type="invalid">{validation.errors.country}</FormFeedback>
                            )}
                          </Col>
                        </Row>
                        <Row className="my-2">
                          <Col sm={4}>
                            <Label className="form-label">State</Label>
                            <Input
                              id="state"
                              name="state"
                              className="form-control"
                              placeholder="Enter Phone Number"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.state || ""}
                              invalid={validation.touched.state && validation.errors.state}
                            />
                            {validation.touched.state &&
                              validation.errors.state && (
                                <FormFeedback type="invalid">
                                  {validation.errors.state}
                                </FormFeedback>
                              )}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">City</Label>
                            <Input
                              id="city"
                              name="city"
                              className="form-control"
                              placeholder="Enter Phone Number"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.city || ""}
                              invalid={validation.touched.city && validation.errors.city}
                            />
                            {validation.touched.city &&
                              validation.errors.city && (
                                <FormFeedback type="invalid">
                                  {validation.errors.city}
                                </FormFeedback>
                              )}
                          </Col>
                        </Row>
                      </div>

                      <div className="d-flex justify-content-center">
                        <div className="mt-4 mx-2">
                          <Button color="primary" type="submit">
                            Confirm Details
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

export default ModalRDS;