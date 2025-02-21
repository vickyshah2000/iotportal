import React, { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
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
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { fetchWithTokenRefresh } from "../../helpers/AuthType/backend";

const validationSchema = Yup.object({
  name: Yup.string().required("Please Enter name"),
  shortName: Yup.string().required("Please Enter Short name"),
  longName: Yup.string(),
  tradeName: Yup.string(),
  role: Yup.string().required("Please Choose role"),
  type: Yup.string().required("Please Choose type"),
  remarks: Yup.string(),
});

const NewRD = React.memo(() => {
  document.title = "RD new";

  const history = useHistory();
  const base_url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    document.title = "RD";
  }, []);

  const [role, setRole] = useState([]);
  const [type, setType] = useState([]);

  const fetchRolesAndTypes = useCallback(async () => {
    try {
      const [roleRes, typeRes] = await Promise.all([
        fetchWithTokenRefresh({url: `${base_url}/api/entity-role/`}),
        fetchWithTokenRefresh({url: `${base_url}/api/entity-type/`}),
    
      ]);
      setRole(roleRes.data);
      setType(typeRes.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [base_url]);

  useEffect(() => {
    fetchRolesAndTypes();
  }, [fetchRolesAndTypes]);

  const formik = useFormik({
    initialValues: {
      name: "",
      shortName: "",
      longName: "",
      tradeName: "",
      role: "",
      type: "",
      remarks: "",
    },
    validationSchema,
    onSubmit: async (values) => {
        // try {
        //   await axios.post(`${base_url}/api/entity/`, {
        //     name: values.name,
        //     short_name: values.shortName,
        //     long_name: values.longName,
        //     trade_name: values.tradeName,
        //     role_id: values.role,
        //     type_id: values.type,
        //     remarks: values.remarks,
        //   });
        //   console.log(values);
        //   history.push("/entity-table");
        // } catch (error) {
        //   console.error("Error submitting form: ", error);
        //   console.log(values);
        // }
      console.log(values);
    },
  });

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
                            value={formik.values.name || ""}
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
                            value={formik.values.shortName || ""}
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
                            value={formik.values.longName || ""}
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
                            value={formik.values.tradeName || ""}
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
                            value={formik.values.role || ""}
                            invalid={formik.touched.role && formik.errors.role}
                          >
                            <option value="">Choose one</option>
                            {role.map((item) => (
                              <option key={item.role_id} value={item.role_id}>
                                {item.role_name}
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
                            value={formik.values.type || ""}
                            invalid={formik.touched.type && formik.errors.type}
                          >
                            <option value="">Choose one</option>
                            {type.map((item) => (
                              <option key={item.type_id} value={item.type_id}>
                                {item.name}
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
                          <Label className="form-label">Remarks</Label>
                          <Input
                            id="remarks"
                            name="remarks"
                            className="form-control"
                            placeholder="Remarks"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.remarks || ""}
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

export default NewRD;


