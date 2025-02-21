import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  Button,
} from "reactstrap";
import axios from "axios";
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";
import { set } from "lodash";
import {
  fetchWithTokenRefresh,
  postWithTokenRefresh,
  putWithTokenRefresh,
} from "../../helpers/AuthType/backend";

const validationSchema = Yup.object({
  name: Yup.string().required("Please Enter name"),
  shortName: Yup.string(),
  longName: Yup.string(),
  tradeName: Yup.string(),
  role: Yup.string(),
  type: Yup.string().required("Please Choose type"),
  remarks: Yup.string(),
});

const EditEntity = React.memo(() => {
  const location = useLocation();
  const entityId = location.state.entityId;
  const role = location.state.role;
  // console.log(role,"this is role")
  // console.log(entityId,"this is entity id");
  const entityName = location.state.entityName;
  console.log("name", entityName);
  const history = useHistory();
  const base_url = import.meta.env.VITE_BASE_URL;
  const base_url3 = import.meta.env.VITE_BASE_URL3;

  // const [data, setData] = useState([]);
  useEffect(() => {
    document.title = "Edit Entity";
  }, []);

  const [fieldData, setFieldData] = useState(null);
  const [roles, setRoles] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetchWithTokenRefresh({
          url: `${base_url3}/api/EntityRole/GetAllEntityRoles`,
        });
        setRoles(response.data); // assuming response.data contains the roles
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    };
    const fetchTypes = async () => {
      try {
        const response = await fetchWithTokenRefresh({
          url: `${base_url3}/api/EntityType/GetAllEntityTypes`,
        });
        setTypes(response.data); // assuming response.data contains the roles
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    };

    fetchRoles();
    fetchTypes();
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithTokenRefresh({
          url: `${base_url3}/api/Entity/GetEntityById?entityId=${entityId}`,
        });
        setFieldData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [entityId]);

  const formik = useFormik({
    initialValues: {
      name: "",
      shortName: "",
      longName: "",
      tradeName: "",
      role: "",
      type: "",
      remarks: "",
      upload_images: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const data = new FormData();
      data.append('Name', values.name);
      data.append("ShortName", values.shortName);
      data.append("LongName", values.longName);
      data.append("TradeName", values.tradeName);
      data.append("EntityRoleId", values.role);
      data.append("EntityTypeId", values.type);
      data.append("Remarks", values.remarks);
      if (values.upload_images && values.upload_images.length > 0) {
        for (let i = 0; i < values.upload_images.length; i++) {
          data.append("Images", values.upload_images[i]);
        }
      }
      try {
        await putWithTokenRefresh({
          url: `${base_url3}/api/Entity/UpdateEntity/${entityId}`, // Correctly pass the URL
          body: data, // Pass the body data
          options: { 'Content-Type': 'multipart/form-data' }, // Set the correct headers
        });
        if (role==="Distributer") {
          history.push("/distributors");
        } else {
          history.push("/entity-table");
        }
        
      } catch (error) {
        console.error("Error submitting form: ", error);
      }
    },
  });

  useEffect(() => {
    if (fieldData) {
      formik.setValues((prevValues) => ({
        ...prevValues,
        name: fieldData.name || "",
        shortName: fieldData.shortName || "",
        longName: fieldData.longName || "",
        tradeName: fieldData.tradeName || "",
        role: fieldData.entityRoleId || "",
        type: fieldData.entityTypeId || "",
        remarks: fieldData.remarks || "",
      }));
    }
  }, [fieldData, formik.setValues]);

  return (
    <React.Fragment>
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
                        <h5 className="text-primary"></h5>
                        <p className="text-danger fs-3"></p>
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
                  <Form
                    className="form-horizontal"
                    onSubmit={formik.handleSubmit}
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            invalid={formik.touched.name && formik.errors.name}
                          />
                          {formik.touched.name && formik.errors.name && (
                            <FormFeedback type="invalid">
                              {formik.errors.name}
                            </FormFeedback>
                          )}
                        </Col>
                        <Col sm={4}>
                          <Label className="form-label">Short name</Label>
                          <Input
                            id="shortName"
                            name="shortName"
                            className="form-control"
                            placeholder="Enter Short Name"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.shortName}
                            invalid={
                              formik.touched.shortName &&
                              formik.errors.shortName
                            }
                          />
                          {formik.touched.shortName &&
                            formik.errors.shortName && (
                              <FormFeedback type="invalid">
                                {formik.errors.shortName}
                              </FormFeedback>
                            )}
                        </Col>
                        <Col sm={4}>
                          <Label className="form-label">Long name</Label>
                          <Input
                            id="longName"
                            name="longName"
                            className="form-control"
                            placeholder="Enter Long Name"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.longName}
                            invalid={
                              formik.touched.longName && formik.errors.longName
                            }
                          />
                          {formik.touched.longName &&
                            formik.errors.longName && (
                              <FormFeedback type="invalid">
                                {formik.errors.longName}
                              </FormFeedback>
                            )}
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.tradeName}
                            invalid={
                              formik.touched.tradeName &&
                              formik.errors.tradeName
                            }
                          />
                          {formik.touched.tradeName &&
                            formik.errors.tradeName && (
                              <FormFeedback type="invalid">
                                {formik.errors.tradeName}
                              </FormFeedback>
                            )}
                        </Col>
                        <Col sm={4}>
                          <Label className="form-label">Role</Label>
                          <Input
                            id="role"
                            name="role"
                            className="form-control"
                            type="select"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.role}
                            invalid={formik.touched.role && formik.errors.role}
                          >
                            <option value="">Choose one</option>
                            {roles.map((item) => (
                              <option key={item.roleId} value={item.roleId}>
                                {item.rolename}
                              </option>
                            ))}
                          </Input>
                          {formik.touched.role && formik.errors.role && (
                            <FormFeedback type="invalid">
                              {formik.errors.role}
                            </FormFeedback>
                          )}
                        </Col>
                        <Col sm={4}>
                          <Label className="form-label">Type</Label>
                          <Input
                            id="type"
                            name="type"
                            className="form-control"
                            type="select"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.type}
                            invalid={formik.touched.type && formik.errors.type}
                          >
                            <option value="">Choose one</option>
                            {types.map((item) => (
                              <option key={item.typeId} value={item.typeId}>
                                {item.entityTypeName}
                              </option>
                            ))}
                          </Input>
                          {formik.touched.type && formik.errors.type && (
                            <FormFeedback type="invalid">
                              {formik.errors.type}
                            </FormFeedback>
                          )}
                        </Col>
                      </Row>
                      <br />
                      <Row>
                      <Col sm={4}>
                          <Label className="form-label">
                            Choose Entity Images
                          </Label>
                          <Input
                            id="upload_images"
                            name="upload_images"
                            className="form-control"
                            type="file"
                            multiple
                            onChange={(event) => {
                              const selectedFiles = Array.from(event.target.files);
                              formik.setFieldValue("upload_images", selectedFiles);
                            }}
                            onBlur={formik.handleBlur}
                            invalid={
                              !!(
                                formik.touched.upload_images &&
                                formik.errors.upload_images
                              )
                            }
                          />
                          {formik.touched.upload_images &&
                            formik.errors.upload_images && (
                              <FormFeedback type="invalid">
                                {formik.errors.upload_images}
                              </FormFeedback>
                            )}
                        </Col>
                        <Col sm={4}>
                          <Label className="form-label">Remarks</Label>
                          <Input
                            id="remarks"
                            name="remarks"
                            className="form-control"
                            placeholder="Give Remarks"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.remarks}
                            invalid={
                              formik.touched.remarks && formik.errors.remarks
                            }
                          />
                          {formik.touched.remarks && formik.errors.remarks && (
                            <FormFeedback type="invalid">
                              {formik.errors.remarks}
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
});

export default EditEntity;
