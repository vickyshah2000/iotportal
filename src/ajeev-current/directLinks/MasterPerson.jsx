import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { Row, Col, CardBody, Card, Container, Form, Label, Input, FormFeedback } from "reactstrap";
import { useHistory } from "react-router-dom";
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";
import { fetchWithTokenRefresh, postWithTokenRefresh } from "../../helpers/AuthType/backend";

const MasterContact = () => {
  // const base_url = import.meta.env.VITE_BASE_URL;
  const base_url3 = import.meta.env.VITE_BASE_URL3;

  const history = useHistory();

  const [contactType, setContactType] = useState([]);
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState('');
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    async function getContactType() {
      try {
        const res = await fetchWithTokenRefresh({ url: `${base_url3}/api/ContactType/GetAll` })
        setContactType(res.data);
      } catch (error) {
        console.error("Failed to fetch contact types:", error);
      }
    }

    async function getEntities() {
      try {
        const res = await fetchWithTokenRefresh({ url: `${base_url3}/api/Entity/GetAllEntities` })
        setEntities(res.data.data);
      } catch (error) {
        console.error("Failed to fetch entities:", error);
      }
    }

    getContactType();
    getEntities();
  }, [base_url3]);

  useEffect(() => {
    async function fetchAddresses() {
      if (selectedEntity) {
        try {
          const res = await fetchWithTokenRefresh({ url: `${base_url3}/api/Entity/GetAddressesByEntityId/${selectedEntity}/` })
          setAddresses(res.data.addresses);
          console.log(res.data.addresses,"this is address")
        } catch (error) {
          console.error("Failed to fetch addresses:", error);
        }
      }
    }

    fetchAddresses();
  }, [selectedEntity, base_url3]);

  const formik = useFormik({
    initialValues: {
      entityName: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      images: "",
      contactType: "",
      alternateNumber: "",
      remarks: "",
      addressId: ""
    },
    validationSchema: Yup.object({
      entityName: Yup.string().required("Please Select Entity"),
      firstName: Yup.string().required("Please Enter Your First Name"),
      email: Yup.string().email("Invalid email address").required("Please Enter Your Email"),
      phone: Yup.string().required("Please Enter Your Phone Number"),
      addressId: Yup.string().required("Please Select Address"),
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
      formData.append("AddressId", values.addressId);
      formData.append("Remarks", values.remarks);
      
      // console.log(values)
      try {
        await postWithTokenRefresh({
          url: `${base_url3}/api/Entity/CreatePerson`, body: formData,  
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        // console.log("API call successful", response);
        history.push("/entity-table");
      } catch (error) {
        console.error("API call failed", error);
      }
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
                          <img src={logoImg} alt="" className="rounded-circle" height="34" />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form className="form-horizontal" onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }}>
                      <Row>
                        <Col sm={4}>
                          <Label className="form-label">Entity Name</Label>
                          <Input
                            id="entityName"
                            name="entityName"
                            type="select"
                            onChange={(e) => {
                              formik.handleChange(e);
                              setSelectedEntity(e.target.value);
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.entityName || ""}
                            invalid={formik.touched.entityName && !!formik.errors.entityName}
                          >
                            <option value="">Select One</option>
                            {entities.map((item,index) => (
                              <option key={index} value={item.entityId}>{item.name}</option>
                            ))}
                          </Input>
                          {formik.touched.entityName && formik.errors.entityName && (
                            <FormFeedback>{formik.errors.entityName}</FormFeedback>
                          )}
                        </Col>
                        <Col sm={4}>
                          <Label className="form-label">Select Address</Label>
                          <Input
                            id="addressId"
                            name="addressId"
                            type="select"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.addressId || ""}
                            invalid={formik.touched.addressId && !!formik.errors.addressId}
                          >
                            <option value="">Select One</option>
                            {addresses.map((address,index) => (
                              <option key={index} value={address.addressId}>{address.addressline1}, {address.cityName}, {address.stateName}, {address.Address_type}</option>
                            ))}
                          </Input>
                          {formik.touched.addressId && formik.errors.addressId && (
                            <FormFeedback>{formik.errors.addressId}</FormFeedback>
                          )}
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col sm={4}>
                          <Label className="form-label">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName || ""}
                            invalid={formik.touched.firstName && !!formik.errors.firstName}
                          />
                          {formik.touched.firstName && formik.errors.firstName && (
                            <FormFeedback>{formik.errors.firstName}</FormFeedback>
                          )}
                        </Col>
                        <Col sm={4}>
                          <Label className="form-label">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName || ""}
                            invalid={formik.touched.lastName && !!formik.errors.lastName}
                          />
                          {formik.touched.lastName && formik.errors.lastName && (
                            <FormFeedback>{formik.errors.lastName}</FormFeedback>
                          )}
                        </Col>
                        <Col sm={4}>
                          <Label className="form-label">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone || ""}
                            invalid={formik.touched.phone && !!formik.errors.phone}
                          />
                          {formik.touched.phone && formik.errors.phone && (
                            <FormFeedback>{formik.errors.phone}</FormFeedback>
                          )}
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col sm={4}>
                          <Label className="form-label">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email || ""}
                            invalid={formik.touched.email && !!formik.errors.email}
                          />
                          {formik.touched.email && formik.errors.email && (
                            <FormFeedback>{formik.errors.email}</FormFeedback>
                          )}
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
                              formik.setFieldValue(
                                "images",
                                selectedFiles);
                            }}
                            onBlur={formik.handleBlur}
                            invalid={
                              formik.touched.images &&
                              formik.errors.images
                            }
                          />
                          {formik.touched.images &&
                            formik.errors.images ? (
                            <FormFeedback type="invalid">
                              {formik.errors.images}
                            </FormFeedback>
                          ) : null}
                        </Col>
                        <Col sm={4}>
                          <Label className="form-label">Contact Type</Label>
                          <Input
                            id="contactType"
                            name="contactType"
                            type="select"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.contactType || ""}
                            invalid={formik.touched.contactType && !!formik.errors.contactType}
                          >
                            <option value="">Choose one</option>
                            {contactType.map((item,index) => (
                              <option key={index} value={item.contactTypeId}>{item.contacttypename}</option>
                            ))}
                          </Input>
                          {formik.touched.contactType && formik.errors.contactType && (
                            <FormFeedback>{formik.errors.contactType}</FormFeedback>
                          )}
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col sm={4}>
                          <Label className="form-label">Alternate Number</Label>
                          <Input
                            id="alternateNumber"
                            name="alternateNumber"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.alternateNumber || ""}
                            invalid={formik.touched.alternateNumber && !!formik.errors.alternateNumber}
                          />
                          {formik.touched.alternateNumber && formik.errors.alternateNumber && (
                            <FormFeedback>{formik.errors.alternateNumber}</FormFeedback>
                          )}
                        </Col>
                        <Col sm={4}>
                          <Label className="form-label">Remarks</Label>
                          <Input
                            id="remarks"
                            name="remarks"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.remarks || ""}
                            invalid={formik.touched.remarks && !!formik.errors.remarks}
                          />
                          {formik.touched.remarks && formik.errors.remarks && (
                            <FormFeedback>{formik.errors.remarks}</FormFeedback>
                          )}
                        </Col>
                      </Row>
                      <div className="mt-4 text-center">
                        <button className="btn btn-danger btn-block" type="submit">Confirm Person Details</button>
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
