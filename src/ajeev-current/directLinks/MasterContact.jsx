import React, { useEffect, useState } from "react";
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
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchWithTokenRefresh, postWithTokenRefresh } from "../../helpers/AuthType/backend";

const MasterContact = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const base_url3 = import.meta.env.VITE_BASE_URL3;
  document.title = " Person ";
  const history = useHistory();
  const location = useLocation();
  const addressId = location.state.addressId;
  const entityAddressId = location.state.entityAddressId;
  // console.log(entityAddressId,"this entityAddressId")
  // console.log(addressId,"this addressid")
  const entityName = location.state.entityName;
  const entityId = location.state.entityId;

  const [contactType, setContactType] = useState([]);
  useEffect(() => {
    async function getContactType() {
      const res = await fetchWithTokenRefresh({url: `${base_url3}/api/ContactType/GetAll`})
      setContactType(res.data);
    }
    getContactType();
  }, [base_url3]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      images: null,
      contactType: "",
      alternateNumber: "",
      remarks: "",
      entityId: entityId,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Please Enter Your first Name"),
      lastName: Yup.string(),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please Enter Your Email"),
      phone: Yup.string().required("Please Enter Your Phone Number"),
      contactType: Yup.string().required("Please Choose Contact type"),
      alternateNumber: Yup.string(),
      remarks: Yup.string(),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("Firstname", values.firstName);
      formData.append("Lastname", values.lastName);
      formData.append("Mobilenumber", values.phone);
      formData.append("Email", values.email);
      if (values.images && values.images.length > 0 ) {
        for(let i=0; i < values.images.length; i++){
          formData.append("Images", values.images[i]);
        }
      }
      formData.append("Alternatenumber", values.alternateNumber);
      formData.append("Contacttype", values.contactType);
      formData.append("AddressId", addressId);
      formData.append("Remarks", values.remarks);
      
      console.log(values)
    
      try {
        const response =await postWithTokenRefresh({url:`${base_url3}/api/Entity/CreatePerson`,
          body:formData, 
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
       
        console.log("API call successful", response);
        history.push("/contact-table", {
          addressId: addressId,
          entityName: entityName,
        });
      } catch (error) {
        console.error("API call failed", error);
      }
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
                        <h5 className="text-primary">Add Person Details</h5>
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
                          <Label className="form-label">Image</Label>
                          <Input
                            id="images"
                            name="images"
                            className="form-control"
                            type="file"
                            multiple
                            onChange={(event) => {
                              const selectedFiles = Array.from(event.target.files);
                              validation.setFieldValue(
                                "images",
                                selectedFiles);
                            }}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.images &&
                              validation.errors.images
                            }
                          />
                          {validation.touched.images &&
                          validation.errors.images ? (
                            <FormFeedback type="invalid">
                              {validation.errors.images}
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

export default MasterContact;
