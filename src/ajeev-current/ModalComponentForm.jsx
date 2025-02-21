import React, { useEffect, useState } from "react";
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
  Table,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import profileImg from "../assets/images/profile-img.png";
import logoImg from "../assets/images/logo.svg";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import {
  fetchWithTokenRefresh,
  postWithTokenRefresh,
} from "../helpers/AuthType/backend";

const ComponentForm = () => {
  const [codata, setCodata] = useState([]);
  // const base_url = import.meta.env.VITE_BASE_URL;
  const base_url2 = import.meta.env.VITE_BASE_URL2;
  const [entries, setEntries] = useState([]);
  const [firstEntryAdded, setFirstEntryAdded] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const masterId = location.state.id;
  console.log("master_id", masterId);
  const componentData = async () => {
    const res = await fetchWithTokenRefresh({
      url: `${base_url2}/api/component/`,
    });
    setCodata(res.data);
    console.log(res);
  };


  useEffect(() => {
    componentData();
  }, [base_url2]);
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      component_id: "",
      installdate: "",
    },
    validationSchema: Yup.object({
      component_id: Yup.string().required("Please Enter Component ID"),
    }),
    onSubmit: (values) => {
      const newEntry = {
        masterId: masterId,
        componentId: parseInt(values.component_id),
        installdate: values.installdate,
      };
      setEntries([...entries, newEntry]);
      validation.resetForm();
      if (!firstEntryAdded) {
        setFirstEntryAdded(true);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const cdata = {
      entries: entries,
    };
    //use cdata.entries  for array
    console.log("cdata:", cdata.entries);
    postWithTokenRefresh({
      url: `${base_url2}/api/ComponentDevice`,
      body: cdata.entries,
    })
      .then((response) => {
        console.log("Success:", response.data);
        history.push("/component-table", { id: masterId });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  //component name display in grid
  const codataMap = codata.reduce((ComponentName, item) => {
    ComponentName[item.id] = item.name;
    return ComponentName;
  }, {});
  //***** */
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
                        <h5 className="text-primary">Add Entries</h5>
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
                    <Form className="form-horizontal" onSubmit={handleSubmit}>
                      {/* <Row>
                        <Col sm={12}>
                          <Label className="form-label">Master ID</Label>
                          <Input
                            id="master_id"
                            name="master_id"
                            className="form-control"
                            placeholder="Enter Master ID"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.master_id || ""}
                            invalid={validation.touched.master_id && validation.errors.master_id}
                          />
                          {validation.touched.master_id && validation.errors.master_id ? (
                            <FormFeedback type="invalid">{validation.errors.master_id}</FormFeedback>
                          ) : null}
                        </Col>
                      </Row> */}
                      <Row>
                        <Col sm={6}>
                          <Label className="form-label">Component ID</Label>
                          <Input
                            id="component_id"
                            name="component_id"
                            className="form-control"
                            placeholder="Enter Component ID"
                            type="select"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.component_id || ""}
                            invalid={
                              validation.touched.component_id &&
                              validation.errors.component_id
                            }
                          >
                            <option value="default">choose one</option>
                            {codata.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </Input>
                          {validation.touched.component_id &&
                            validation.errors.component_id ? (
                            <FormFeedback type="invalid">
                              {validation.errors.component_id}
                            </FormFeedback>
                          ) : null}
                        </Col>
                        <Col sm={6}>
                          <Label className="form-label">Install Date</Label>
                          <Input
                            id="installdate"
                            name="installdate"
                            className="form-control"
                            placeholder="Enter Install Date"
                            type="date"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.installdate || ""}
                            invalid={
                              validation.touched.installdate &&
                              validation.errors.installdate
                            }
                          />
                          {validation.touched.installdate &&
                            validation.errors.installdate ? (
                            <FormFeedback type="invalid">
                              {validation.errors.installdate}
                            </FormFeedback>
                          ) : null}
                        </Col>
                      </Row>

                      <div className="mt-4 text-center">
                        <Button
                          className="btn btn-danger"
                          onClick={validation.handleSubmit}
                        >
                          Add Entry
                        </Button>
                      </div>
                      <div className="mt-4 text-center">
                        <Button className="btn btn-primary" type="submit">
                          Submit All Entries
                        </Button>
                      </div>

                    </Form>

                    {entries.length > 0 && (
                      <Table className="mt-4" bordered>
                        <thead>
                          <tr>
                            <th>Number</th>
                            <th>Component ID</th>
                            <th>Install Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {entries.map((entry, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                {codataMap[entry.componentId] || "Unknown Component"}
                              </td>
                              <td>{entry.installdate}</td>
                            </tr>
                          ))}
                        </tbody>

                      </Table>
                    )}
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

export default ComponentForm;
