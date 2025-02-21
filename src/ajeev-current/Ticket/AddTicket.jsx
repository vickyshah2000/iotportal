import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import axios from "axios";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import {
  fetchWithTokenRefresh,
  postWithTokenRefresh,
} from "../../helpers/AuthType/backend";
import Cookies from "js-cookie";
import { post } from "../../helpers/custom_helper/api_helper";

const AddTicket = () => {
  document.title = "Ticket Create";
  const base_url = import.meta.env.VITE_BASE_URL_TICKET;
  const base_url_old = import.meta.env.VITE_BASE_URL;
  const history = useHistory();
  const [devices, setDevices] = useState([]);
  const location = useLocation();

  const userCookie = Cookies.get("authUser");
  const userId = JSON.parse(userCookie).user_id;
  const entityId = userCookie
    ? JSON.parse(userCookie).entity_id.entity_id
    : null;
  const role = userCookie ? JSON.parse(userCookie).role : null;

  const [staff, setStaff] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithTokenRefresh({
          url: `${base_url_old}/api/support-staff/`,
        });
        setStaff(response.data);
        const responseDevices = await fetchWithTokenRefresh({
          url: `${base_url_old}api/all-device-details/${entityId}`,
        });
        // ${Number(entityId)

        setDevices(responseDevices.data || []);
        console.log(responseDevices.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        setError(error); // Set error if there's an error in fetching data
        setLoading(false); // Set loading to false if there's an error
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [base_url, base_url_old]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      description: "",
      imie: "",
      raised_by: userId,
      images:null
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Title"),
      description: Yup.string().required("Please Enter Your Description"),
      // entity: Yup.string(),
      // device: Yup.string(),
      // assigned_to: Yup.string(),
      // ticketImages: Yup.array().min(1, "Please select at least one image"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        const data = new FormData();
        data.append("title", values.title);
        data.append("description", values.description);
        data.append("raised_by", Number(values.raised_by));
        data.append("imie", values.imie);
        data.append("entity_id", Number(values.entity_id));
        // data.append("visibility", 0);
        // data.append("system_id", 2);
    
        if (values.images && values.images.length > 0) {
          for (let i = 0; i < values.images.length; i++) {
            data.append("images", values.images[i]);
          }
        }
    
        console.log("data", data);
        const response = await axios({
          method: 'post',
          url: 'http://122.176.158.202:6009/api/ticket/',
          data: data,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        console.log("Response data:", response.data);
        history.push("/ticket-table", { state: "All" });
      } catch (error) {
        console.log("Data Not Submit", error);
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
                        <h5 className="text-primary">Ticket Details</h5>
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
                      <Row>
                        <Col sm={4}>
                          <Label className="form-label">Ticket Title</Label>
                          <Input
                            id="title"
                            name="title"
                            className="form-control"
                            placeholder="Enter Your Title"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.title || ""}
                            invalid={
                              !!(
                                validation.touched.title &&
                                validation.errors.title
                              )
                            }
                          />
                          {validation.touched.title &&
                            validation.errors.title && (
                              <FormFeedback type="invalid">
                                {validation.errors.title}
                              </FormFeedback>
                            )}
                        </Col>
                        <Col sm={4}>
                          <Label className="form-label">Description</Label>
                          <Input
                            id="description"
                            name="description"
                            className="form-control"
                            placeholder="Enter Your Description"
                            type="description"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.description || ""}
                            invalid={
                              !!(
                                validation.touched.description &&
                                validation.errors.description
                              )
                            }
                          />
                          {validation.touched.description &&
                            validation.errors.description && (
                              <FormFeedback type="invalid">
                                {validation.errors.description}
                              </FormFeedback>
                            )}
                        </Col>

                        {/* <Col sm={4}>
                          <Label className="form-label">Assigned to</Label>
                          <Input
                            id="assigned_to"
                            name="assigned_to"
                            className="form-control"
                            placeholder="Assigned to"
                            type="select"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.assigned_to || ""}
                            invalid={
                              !!(
                                validation.touched.assigned_to &&
                                validation.errors.assigned_to
                              )
                            }
                          >
                            <option value="default">Choose Staff</option>
                            {staff?.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.Person_Name}
                              </option>
                            ))}
                          </Input>

                          {validation.touched.assigned_to &&
                            validation.errors.assigned_to && (
                              <FormFeedback type="invalid">
                                {validation.errors.assigned_to}
                              </FormFeedback>
                            )}
                        </Col> */}
                         <Col sm={4}>
                          <Label className="form-label">Device</Label>
                          <Input
                            id="imie"
                            name="imie"
                            className="form-control"
                            placeholder="Enter device"
                            type="select"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.imie || ""}
                            invalid={
                              !!(
                                validation.touched.imie &&
                                validation.errors.imie
                              )
                            }
                          >
                            <option value="default">Choose Device</option>
                            {devices?.map((item) => (
                              <option key={item.imie} value={item.imie}>
                                {item.imie}
                              </option>
                            ))}
                          </Input>
                          {validation.touched.device &&
                            validation.errors.device && (
                              <FormFeedback type="invalid">
                                {validation.errors.device}
                              </FormFeedback>
                            )}
                        </Col>
                      </Row>
                      <br />
                      <Row>
                       
                        <Col sm={4}>
                          <Label className="form-label">
                            Choose Ticket Images
                          </Label>
                          <Input
                            id="ticketImages"
                            name="ticketImages"
                            className="form-control"
                            type="file"
                            multiple
                            onChange={(event) => {
                              const selectedFiles = Array.from(event.target.files);
                              validation.setFieldValue("images",selectedFiles);
                            }}
                            onBlur={validation.handleBlur}
                            invalid={
                              !!(
                                validation.touched.ticketImages &&
                                validation.errors.ticketImages
                              )
                            }
                          />
                          {validation.touched.ticketImages &&
                            validation.errors.ticketImages && (
                              <FormFeedback type="invalid">
                                {validation.errors.ticketImages}
                              </FormFeedback>
                            )}
                        </Col>
                      </Row>
                      <div className="mt-4 text-center">
                        <button
                          className="btn btn-danger btn-block"
                          type="submit"
                        >
                          Confirm Details
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

export default AddTicket;
