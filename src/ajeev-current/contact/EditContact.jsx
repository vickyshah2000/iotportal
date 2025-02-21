import React, { useEffect, useState } from "react";

// Formik Validation
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

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchWithTokenRefresh, putWithTokenRefresh } from "../../helpers/AuthType/backend";
import { options } from "toastr";

const EditContact = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const base_url3 = import.meta.env.VITE_BASE_URL3;

  //meta title
  document.title = " Person ";
  const history = useHistory();

  const location = useLocation();
  const personId = location.state.personId;
  const entityName = location.state.entityName;
  console.log("Person id edit contact", personId);

  const addressId = location.state.addressId;

  const [contactType, setContactType] = useState([]);
  const [prevData, setPrevData] = useState([]);
  useEffect(() => {
    async function getContactType(base_url3) {
      const res = await fetchWithTokenRefresh({ url: `${base_url3}/api/ContactType/GetAll` })
      setContactType(res.data);
    }
    async function autoPollulate(personId) {
      const res = await fetchWithTokenRefresh({ url: `${base_url3}/api/Entity/GetPersonById?personId=${personId}` })
      setPrevData(res.data)
    }
    getContactType(base_url3);
    autoPollulate(personId)
  }, []);

  //form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      firstName: prevData.firstName || "",
      lastName: prevData.lastName || "",
      email: prevData.email || "",
      phone: prevData.mobileNumber || "",
      imageURL: null,
      contactType: prevData.contactType || "",
      alternateNumber: prevData.alternateNumber || "",
      remarks: prevData.remarks || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Please Enter Your first Name"),
      lastName: Yup.string(),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please Enter Your Email"),
      phone: Yup.string().required("Please Enter Your Phone Number"),
      imageURL: Yup.mixed().nullable(),
      contactType: Yup.string(),
      alternateNumber: Yup.string(),
      remarks: Yup.string(),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("AddressId", addressId);
      formData.append("Firstname", values.firstName);
      formData.append("Lastname", values.lastName);
      formData.append("Mobilenumber", values.phone);
      formData.append("Email", values.email);
      if (values.imageURL && values.imageURL.length > 0) {
        Array.from(values.imageURL).forEach((file, index) => {
          formData.append(`Images`, file);
        });
      }
      formData.append("Alternatenumber", values.alternateNumber);
      formData.append("Contacttype", values.contactType);
      formData.append("Remarks", values.remarks);
      try {
        const response = await putWithTokenRefresh({
          url: `${base_url3}/api/Entity/UpdatePersonById?personId=${personId}`, body: formData, options: {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        })
        console.log("API call successful", response);
        history.push("/contact-table", { addressId: addressId, entityName: entityName });
      } catch (error) {
        console.error("API call failed", error);
      }
      // axios
      //   .put(`${base_url}/api/person/${personId}/`, {
      //     first_name: values.firstName,
      //     last_name: values.lastName,
      //     mobile_number: values.phone,
      //     email: values.email,
      //     image_url: values.imageURL,
      //     alternate_number: values.alternateNumber,
      //     contact_type: values.contactType,
      //     remarks:values.remarks,
      //   })
      //   .then((response) => {
      //     console.log("API call successful", response);
      //     history.push("/contact-table",{addressId:addressId,entityName:entityName});
      //   })
      //   .catch((error) => {
      //     console.error("API call failed", error);
      //   });
    },
  });


  return (
    <React.Fragment>
      {/* <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div> */}
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={8} xl={12}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Person Details</h5>
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
                        // return false;
                      }}
                    >
                      <Row>
                        <Col sm={4}>
                          <Label className="form-label">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            className="form-control"
                            placeholder="Enter Your firstName"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.firstName || ""}
                            invalid={
                              validation.touched.firstName &&
                                validation.errors.firstName
                                ? true
                                : false
                            }
                          />
                          {validation.touched.firstName &&
                            validation.errors.firstName ? (
                            <FormFeedback type="invalid">
                              {validation.errors.firstName}
                            </FormFeedback>
                          ) : null}
                        </Col>
                        <Col sm={4}>
                          <Label className="form-label">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            className="form-control"
                            placeholder="Enter Your lastName"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.lastName || ""}
                            invalid={
                              validation.touched.lastName &&
                                validation.errors.lastName
                                ? true
                                : false
                            }
                          />
                          {validation.touched.lastName &&
                            validation.errors.lastName ? (
                            <FormFeedback type="invalid">
                              {validation.errors.lastName}
                            </FormFeedback>
                          ) : null}
                        </Col>
                        <Col sm={4}>
                          <Label className="form-label">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            className="form-control"
                            placeholder="Enter Your Phone Number"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.phone || ""}
                            invalid={
                              validation.touched.phone &&
                                validation.errors.phone
                                ? true
                                : false
                            }
                          />
                          {validation.touched.phone &&
                            validation.errors.phone ? (
                            <FormFeedback type="invalid">
                              {validation.errors.phone}
                            </FormFeedback>
                          ) : null}
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col sm={4}>
                          <Label className="form-label">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Your Email"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                                validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                            validation.errors.email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </Col>
                        <Col sm={4}>
                          <Label className="form-label">Image Url</Label>
                          <Input
                            id="imageURL"
                            name="imageURL"
                            className="form-control"
                            type="file"
                            multiple 
                            onChange={(event) => {
                              validation.setFieldValue("imageURL", event.currentTarget.files);
                            }}
                            onBlur={validation.handleBlur}
                            invalid={validation.touched.imageURL && validation.errors.imageURL}
                          />
                          {validation.touched.imageURL &&
                            validation.errors.imageURL ? (
                            <FormFeedback type="invalid">
                              {validation.errors.imageURL}
                            </FormFeedback>
                          ) : null}
                        </Col>
                        <Col sm={4}>
                          <Label className="form-label">Contact Type</Label>
                          <Input
                            id="contactType"
                            name="contactType"
                            className="form-control"
                            type="select"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.contactType || ""}
                            invalid={
                              validation.touched.contactType &&
                                validation.errors.contactType
                                ? true
                                : false
                            }
                          >
                            <option value="default">Choose one</option>
                            {contactType.map((item, _) => (
                              <option
                                value={item.contactTypeId}
                                key={item.contactTypeId}
                              >
                                {item.contacttypename}
                              </option>
                            ))}
                          </Input>
                          {validation.touched.contactType &&
                            validation.errors.contactType ? (
                            <FormFeedback type="invalid">
                              {validation.errors.contactType}
                            </FormFeedback>
                          ) : null}
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col sm={4}>
                          <Label className="form-label">Alternate Number</Label>
                          <Input
                            id="alternateNumber"
                            name="alternateNumber"
                            className="form-control"
                            placeholder="Enter Your alternate number"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.alternateNumber || ""}
                            invalid={
                              validation.touched.alternateNumber &&
                                validation.errors.alternateNumber
                                ? true
                                : false
                            }
                          />
                          {validation.touched.alternateNumber &&
                            validation.errors.alternateNumber ? (
                            <FormFeedback type="invalid">
                              {validation.errors.alternateNumber}
                            </FormFeedback>
                          ) : null}
                        </Col>
                        <Col sm={4}>
                          <Label className="form-label">Remarks</Label>
                          <Input
                            id="remarks"
                            name="remarks"
                            className="form-control"
                            placeholder="Give Remarks"
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
                      <div className="mt-4 text-center">
                        <button
                          className="btn btn-danger btn-block"
                          type="submit"
                        >
                          Confirm Person Details
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

export default EditContact;
