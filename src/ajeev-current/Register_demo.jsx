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
import { fetchWithTokenRefresh, postWithTokenRefresh } from "../helpers/AuthType/backend";
import profileImg from "../assets/images/profile-img.png";
import logoImg from "../assets/images/logo.svg";
import axios from "axios";

const validationSchema = Yup.object({
  name: Yup.string().required("Please Enter name"),
  shortName: Yup.string(),
  longName: Yup.string(),
  tradeName: Yup.string(),
  role: Yup.string().required("Please Choose role"),
  type_id: Yup.string().required("Please Choose type"),
  remarks: Yup.string(),
});

const Register_demo = React.memo(() => {
  const history = useHistory();
  const base_url = import.meta.env.VITE_BASE_URL;
  const base_url3 = import.meta.env.VITE_BASE_URL3;

  useEffect(() => {
    document.title = "Register Your Store";
  }, []);

  const [role, setRole] = useState([]);
  const [type, setType] = useState([]);
  const [loading, setLoading] = useState(false); // To track the loading state

  const fetchRolesAndTypes = useCallback(async () => {
    try {
      const [roleRes, typeRes] = await Promise.all([
        fetchWithTokenRefresh({url:`${base_url3}/api/EntityRole/GetAllEntityRoles`}),
        fetchWithTokenRefresh({url:`${base_url3}/api/EntityType/GetAllEntityTypes`}),
        // axios.get(`${base_url3}/api/EntityRole/GetAllEntityRoles`),
        // axios.get(`${base_url3}/api/EntityType/GetAllEntityTypes`)
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
      type_id: "",
      remarks: "",
      upload_images: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true); // Start loading spinner
      const data = new FormData();
      data.append('Name', values.name);
      data.append("ShortName", values.shortName);
      data.append("LongName", values.longName);
      data.append("TradeName", values.tradeName);
      data.append("EntityRoleId", values.role);
      data.append("EntityTypeId", values.type_id);
      data.append("Remarks", values.remarks);
      if (values.upload_images && values.upload_images.length > 0) {
        for (let i = 0; i < values.upload_images.length; i++) {
          data.append("Images", values.upload_images[i]);
        }
      }
      console.log(values)

      try {
        await postWithTokenRefresh({
          url: `${base_url3}/api/Entity/CreateEntity`, // Correctly pass the URL
          body: data, // Pass the body data
          options: { 'Content-Type': 'multipart/form-data' }, // Set the correct headers
        })
        // await axios.post(`${base_url3}/api/Entity/CreateEntity`, data,
        //   {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //     },
        //   });

        // Reset form after successful submission
        formik.resetForm();
        setLoading(false); // Stop loading spinner
        alert("Data subimited")

        history.push("/entity-table");
      } catch (error) {
        console.error("Error submitting form: ", error);
      }
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
                        <h5 className="text-primary">Add Entity Details</h5>
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
                            id="type_id"
                            name="type_id"
                            className="form-control"
                            type="select"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.type_id || ""}
                            invalid={
                              formik.touched.type_id && formik.errors.type_id
                            }
                          >
                            <option value="">Choose one</option>
                            {type.map((item) => (
                              <option key={item.typeId} value={item.typeId}>
                                {item.entityTypeName}
                              </option>
                            ))}
                          </Input>
                          {formik.touched.type_id && formik.errors.type_id && (
                            <FormFeedback type="invalid">
                              {formik.errors.type_id}
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
                        {/* Your form fields here */}
                        <Button type="submit" color="primary" disabled={loading}>
                          {loading ? "Submitting..." : "Confirm Details"}
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

export default Register_demo;
// import React, { useEffect, useState, useCallback } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Link, useHistory } from "react-router-dom";
// import {
//   Row,
//   Col,
//   CardBody,
//   Card,
//   Container,
//   Form,
//   Label,
//   Input,
//   FormFeedback,
//   Button,
// } from "reactstrap";
// import { fetchWithTokenRefresh, postWithTokenRefresh } from "../helpers/AuthType/backend";
// import profileImg from "../assets/images/profile-img.png";
// import logoImg from "../assets/images/logo.svg";

// const validationSchema = Yup.object({
//   name: Yup.string().required("Please Enter name"),
//   shortName: Yup.string(),
//   longName: Yup.string(),
//   tradeName: Yup.string(),
//   role: Yup.string().required("Please Choose role"),
//   type_id: Yup.string().required("Please Choose type"),
//   remarks: Yup.string(),
// });

// const Register_demo = React.memo(() => {
//   const history = useHistory();
//   const base_url = import.meta.env.VITE_BASE_URL;

//   useEffect(() => {
//     document.title = "Register Your Store";
//   }, []);

//   const [role, setRole] = useState([]);
//   const [type, setType] = useState([]);

//   const fetchRolesAndTypes = useCallback(async () => {
//     try {
//       const [roleRes, typeRes] = await Promise.all([
//         fetchWithTokenRefresh({ url: `${base_url}/api/entity-role/` }),
//         fetchWithTokenRefresh({ url: `${base_url}/api/entity-type/` }),
//       ]);
//       setRole(roleRes.data);
//       setType(typeRes.data);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   }, [base_url]);

//   useEffect(() => {
//     fetchRolesAndTypes();
//   }, [fetchRolesAndTypes]);

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       shortName: "",
//       longName: "",
//       tradeName: "",
//       role: "",
//       type_id: "",
//       remarks: "",
//       upload_images: null,
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       const data = new FormData();
//       data.append('name', values.name);
//       data.append("short_name", values.shortName);
//       data.append("long_name", values.longName);
//       data.append("trade_name", values.tradeName);
//       data.append("role_id", values.role);
//       data.append("type_id", values.type_id);
//       data.append("remarks", values.remarks);
//       if (values.upload_images && values.upload_images.length > 0) {
//         for (let i = 0; i < values.upload_images.length; i++) {
//           data.append("upload_images", values.upload_images[i]);
//         }
//       }
//       console.log(values)

//       try {
//         await postWithTokenRefresh({ url: `${base_url}/api/entity/`,
//           body: data,
//           method: 'POST',
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         history.push("/entity-table");
//       } catch (error) {
//         console.error("Error submitting form: ", error);
//       }
//     },
//   });

//   return (
//     <React.Fragment>
//       <div className="home-btn d-none d-sm-block"></div>
//       <div className="account-pages my-5 pt-sm-5">
//         <Container>
//           <Row className="justify-content-center">
//             <Col md={8} lg={8} xl={12}>
//               <Card className="overflow-hidden">
//                 <div className="bg-primary bg-soft">
//                   <Row>
//                     <Col className="col-7">
//                       <div className="text-primary p-4">
//                         <h5 className="text-primary">Add Entity Details</h5>
//                       </div>
//                     </Col>
//                     <Col className="col-5 align-self-end">
//                       <img src={profileImg} alt="" className="img-fluid" />
//                     </Col>
//                   </Row>
//                 </div>
//                 <CardBody className="pt-0">
//                   <div>
//                     <Link to="/">
//                       <div className="avatar-md profile-user-wid mb-4">
//                         <span className="avatar-title rounded-circle bg-light">
//                           <img
//                             src={logoImg}
//                             alt=""
//                             className="rounded-circle"
//                             height="34"
//                           />
//                         </span>
//                       </div>
//                     </Link>
//                   </div>
//                   <Form
//                     className="form-horizontal"
//                     onSubmit={formik.handleSubmit}
//                   >
//                     <div className="mb-3">
//                       <Row className="my-2">
//                         <Col sm={4}>
//                           <Label className="form-label">Name</Label>
//                           <Input
//                             id="name"
//                             name="name"
//                             className="form-control"
//                             placeholder="Enter Store Name"
//                             type="text"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.name || ""}
//                             invalid={formik.touched.name && formik.errors.name}
//                           />
//                           {formik.touched.name && formik.errors.name && (
//                             <FormFeedback type="invalid">
//                               {formik.errors.name}
//                             </FormFeedback>
//                           )}
//                         </Col>
//                         <Col sm={4}>
//                           <Label className="form-label">Short name</Label>
//                           <Input
//                             id="shortName"
//                             name="shortName"
//                             className="form-control"
//                             placeholder="Enter Short Name"
//                             type="text"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.shortName || ""}
//                             invalid={
//                               formik.touched.shortName &&
//                               formik.errors.shortName
//                             }
//                           />
//                           {formik.touched.shortName &&
//                             formik.errors.shortName && (
//                               <FormFeedback type="invalid">
//                                 {formik.errors.shortName}
//                               </FormFeedback>
//                             )}
//                         </Col>
//                         <Col sm={4}>
//                           <Label className="form-label">Long name</Label>
//                           <Input
//                             id="longName"
//                             name="longName"
//                             className="form-control"
//                             placeholder="Enter Long Name"
//                             type="text"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.longName || ""}
//                             invalid={
//                               formik.touched.longName && formik.errors.longName
//                             }
//                           />
//                           {formik.touched.longName &&
//                             formik.errors.longName && (
//                               <FormFeedback type="invalid">
//                                 {formik.errors.longName}
//                               </FormFeedback>
//                             )}
//                         </Col>
//                       </Row>
//                       <Row>
//                         <Col sm={4}>
//                           <Label className="form-label">Trade name</Label>
//                           <Input
//                             id="tradeName"
//                             name="tradeName"
//                             className="form-control"
//                             placeholder="Enter Trade name"
//                             type="text"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.tradeName || ""}
//                             invalid={
//                               formik.touched.tradeName &&
//                               formik.errors.tradeName
//                             }
//                           />
//                           {formik.touched.tradeName &&
//                             formik.errors.tradeName && (
//                               <FormFeedback type="invalid">
//                                 {formik.errors.tradeName}
//                               </FormFeedback>
//                             )}
//                         </Col>
//                         <Col sm={4}>
//                           <Label className="form-label">Role</Label>
//                           <Input
//                             id="role"
//                             name="role"
//                             className="form-control"
//                             type="select"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.role || ""}
//                             invalid={formik.touched.role && formik.errors.role}
//                           >
//                             <option value="">Choose one</option>
//                             {role.map((item) => (
//                               <option key={item.role_id} value={item.role_id}>
//                                 {item.role_name}
//                               </option>
//                             ))}
//                           </Input>
//                           {formik.touched.role && formik.errors.role && (
//                             <FormFeedback type="invalid">
//                               {formik.errors.role}
//                             </FormFeedback>
//                           )}
//                         </Col>
//                         <Col sm={4}>
//                           <Label className="form-label">Type</Label>
//                           <Input
//                             id="type_id"
//                             name="type_id"
//                             className="form-control"
//                             type="select"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.type_id || ""}
//                             invalid={
//                               formik.touched.type_id && formik.errors.type_id
//                             }
//                           >
//                             <option value="">Choose one</option>
//                             {type.map((item) => (
//                               <option key={item.type_id} value={item.type_id}>
//                                 {item.name}
//                               </option>
//                             ))}
//                           </Input>
//                           {formik.touched.type_id && formik.errors.type_id && (
//                             <FormFeedback type="invalid">
//                               {formik.errors.type_id}
//                             </FormFeedback>
//                           )}
//                         </Col>
//                       </Row>
//                       <br />
//                       <Row>
//                         <Col sm={4}>
//                           <Label className="form-label">
//                             Choose Entity Images
//                           </Label>
//                           <Input
//                             id="upload_images"
//                             name="upload_images"
//                             className="form-control"
//                             type="file"
//                             multiple
//                             onChange={(event) => {
//                               const selectedFiles = Array.from(event.target.files);
//                               formik.setFieldValue("upload_images", selectedFiles);
//                             }}
//                             onBlur={formik.handleBlur}
//                             invalid={
//                               !!(
//                                 formik.touched.upload_images &&
//                                 formik.errors.upload_images
//                               )
//                             }
//                           />
//                           {formik.touched.upload_images &&
//                             formik.errors.upload_images && (
//                               <FormFeedback type="invalid">
//                                 {formik.errors.upload_images}
//                               </FormFeedback>
//                             )}
//                         </Col>
//                         <Col sm={4}>
//                           <Label className="form-label">Remarks</Label>
//                           <Input
//                             id="remarks"
//                             name="remarks"
//                             className="form-control"
//                             placeholder="Remarks"
//                             type="text"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.remarks || ""}
//                             invalid={
//                               formik.touched.remarks && formik.errors.remarks
//                             }
//                           />
//                           {formik.touched.remarks && formik.errors.remarks && (
//                             <FormFeedback type="invalid">
//                               {formik.errors.remarks}
//                             </FormFeedback>
//                           )}
//                         </Col>
//                       </Row>
//                     </div>
//                     <div className="d-flex justify-content-center">
//                       <div className="mt-4 mx-2">
//                         <Button color="primary" type="submit">
//                           Confirm Details
//                         </Button>
//                       </div>
//                     </div>
//                   </Form>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// });

// export default Register_demo;
