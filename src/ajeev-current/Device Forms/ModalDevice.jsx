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
  Button,
} from "reactstrap";
// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  fetchWithTokenRefresh,
  postWithTokenRefresh,
} from "../../helpers/AuthType/backend";
import axios from "axios";


const ModalDevice = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const base_url3 = import.meta.env.VITE_BASE_URL3;
  const base_url2 = import.meta.env.VITE_BASE_URL2;
  document.title = "Device";
  const history = useHistory();
  const [make, setMake] = useState([]);

  useEffect(() => {
    async function deviceMake() {
      const response = await fetchWithTokenRefresh({
        url: `${base_url3}/api/Entity/GetAllEntities`,
      });
      const Alldata=response.data.data.filter((item,index)=>item.roleName=="Manufacturer")
      setMake(Alldata);
      // console.log(Alldata,"fvjhj");
    }
    deviceMake();
  }, []);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      deviceName: "",
      deviceMake: "",
      deviceModel: "",
      remarks: "",
      image: null,
    },
    validationSchema: Yup.object({
      deviceName: Yup.string().required("Please Enter Device Name"),
      deviceMake: Yup.string().required("Please enter deviceMake"),
      deviceModel: Yup.string().required("Please Enter model"),
      remarks: Yup.string(),
    }),
    onSubmit: async (values) => {
      // const data = new FormData();
      // data.append("name", values.deviceName);
      // data.append("make", values.deviceMake);
      // data.append("model", values.deviceModel);
      // data.append("remarks", values.remarks);
      // if (values.image && values.image.length > 0) {
      //   for (let i = 0; i < values.image.length; i++) {
      //     data.append("images", values.image[i]);
      //   }
      // }
    

      try {
        await axios.post(`${base_url2}/api/MasterDeviceType`, {
          "deviceName": values.deviceName,
          "make": values.deviceMake,
          "model": values.deviceModel,
          "remarks": values.remarks
        },)
        console.log(values);
        history.push("/device-type");
      } catch (error) {
        console.log("ERR :: ", error);
      }
    },
    
  });
//image handle function***********************************************************************
  const handleFileChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    validation.setFieldValue("image", filesArray);
  };

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
                        <h5 className="text-primary">Device</h5>
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
                      }}
                    >
                      <div className="mb-3">
                        <Row className="my-2">
                          {/* <Col sm={4}>
                            <Label className="form-label">Image</Label>
                            <Input
                              id="image"
                              name="image"
                              type="file"
                              onChange={handleFileChange}
                              onBlur={validation.handleBlur}
                              multiple
                              invalid={
                                validation.touched.image && !!validation.errors.image
                              }
                            />
                            {validation.touched.image && validation.errors.image && (
                              <FormFeedback>{validation.errors.image}</FormFeedback>
                            )}
                          </Col> */}
                          <Col sm={4}>
                            <Label className="form-label">Device Name</Label>
                            <Input
                              id="deviceName"
                              name="deviceName"
                              className="form-control"
                              placeholder="Enter device name"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.deviceName || ""}
                              invalid={
                                validation.touched.deviceName &&
                                validation.errors.deviceName
                                  ? true
                                  : false
                              }
                            ></Input>
                            {validation.touched.deviceName &&
                            validation.errors.deviceName ? (
                              <FormFeedback type="invalid">
                                {validation.errors.deviceName}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">Device Make</Label>
                            <Input
                              id="deviceMake"
                              name="deviceMake"
                              className="form-control"
                              placeholder="Enter Device Make"
                              type="select"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.deviceMake || ""}
                              invalid={
                                validation.touched.deviceMake &&
                                validation.errors.deviceMake
                                  ? true
                                  : false
                              }
                            >
                              <option value="default">Choose One</option>
                              {make.map((item, idx) =>
                                // item.role_id?.role_name === "Manufacturer" ? (
                                  <option
                                    value={item.name}
                                    key={item.entity_id}
                                  >
                                    {item.name}
                                  </option>
                                // ) : null
                              )}
                            </Input>
                            {validation.touched.deviceMake &&
                            validation.errors.deviceMake ? (
                              <FormFeedback type="invalid">
                                {validation.errors.deviceMake}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col sm={4}>
                            <Label className="form-label">Device Model</Label>
                            <Input
                              id="deviceModel"
                              name="deviceModel"
                              className="form-control"
                              type="text"
                              placeholder="Enter model"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.deviceModel || ""}
                              invalid={
                                validation.touched.deviceModel &&
                                validation.errors.deviceModel
                                  ? true
                                  : false
                              }
                            ></Input>
                            {validation.touched.deviceModel &&
                            validation.errors.deviceModel ? (
                              <FormFeedback type="invalid">
                                {validation.errors.deviceModel}
                              </FormFeedback>
                            ) : null}
                          </Col>
                        </Row>
                        <Row className="my-2">
                          
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
                            ></Input>
                            {validation.touched.remarks &&
                            validation.errors.remarks ? (
                              <FormFeedback type="invalid">
                                {validation.errors.remarks}
                              </FormFeedback>
                            ) : null}
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

export default ModalDevice;
// import React, { useEffect, useState } from "react";
// import * as Yup from "yup";
// import { useFormik } from "formik";
// import { Link } from "react-router-dom";
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
// // import images
// import profileImg from "../../assets/images/profile-img.png";
// import logoImg from "../../assets/images/logo.svg";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import {
//   fetchWithTokenRefresh,
//   postWithTokenRefresh,
// } from "../../helpers/AuthType/backend";

// const ModalDevice = () => {
//   const base_url = import.meta.env.VITE_BASE_URL;
//   document.title = "Device";
//   const history = useHistory();
//   const [make, setMake] = useState([]);

//   useEffect(() => {
//     async function deviceMake() {
//       const response = await fetchWithTokenRefresh({
//         url: `${base_url}/api/entity/?names_only=True`,
//       });
//       setMake(response.data);
//       console.log(response.data);
//     }
//     deviceMake();
//   }, []);

//   const validation = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       deviceName: "",
//       deviceMake: "",
//       deviceModel: "",
//       remarks: "",
//       image: null,
//     },
//     validationSchema: Yup.object({
//       deviceName: Yup.string().required("Please Enter Device Name"),
//       deviceMake: Yup.string().required("Please enter deviceMake"),
//       deviceModel: Yup.string().required("Please Enter model"),
//       remarks: Yup.string(),
//     }),
//     onSubmit: async (values) => {
//       const data = new FormData();
//       data.append("name", values.deviceName);
//       data.append("make", values.deviceMake);
//       data.append("model", values.deviceModel);
//       data.append("remarks", values.remarks);
//       if (values.image && values.image.length > 0) {
//         for (let i = 0; i < values.image.length; i++) {
//           data.append("images", values.image[i]);
//         }
//       }
    
//       try {
//         await postWithTokenRefresh({
//           url: `${base_url}/api/master-device-type/`,
//           body: data,
//           method: 'POST',
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         console.log(values);
//         history.push("/device-type");
//       } catch (error) {
//         console.log("ERR :: ", error);
//       }
//     },
    
//   });
// //image handle function***********************************************************************
//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     const filesArray = Array.from(files);
//     validation.setFieldValue("image", filesArray);
//   };

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
//                         <h5 className="text-primary">Device</h5>
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
//                   <div className="p-2">
//                     <Form
//                       className="form-horizontal"
//                       onSubmit={(e) => {
//                         e.preventDefault();
//                         validation.handleSubmit();
//                       }}
//                     >
//                       <div className="mb-3">
//                         <Row className="my-2">
//                           <Col sm={4}>
//                             <Label className="form-label">Image</Label>
//                             <Input
//                               id="image"
//                               name="image"
//                               type="file"
//                               onChange={handleFileChange}
//                               onBlur={validation.handleBlur}
//                               multiple
//                               invalid={
//                                 validation.touched.image && !!validation.errors.image
//                               }
//                             />
//                             {validation.touched.image && validation.errors.image && (
//                               <FormFeedback>{validation.errors.image}</FormFeedback>
//                             )}
//                           </Col>
//                           <Col sm={4}>
//                             <Label className="form-label">Device Name</Label>
//                             <Input
//                               id="deviceName"
//                               name="deviceName"
//                               className="form-control"
//                               placeholder="Enter device name"
//                               type="text"
//                               onChange={validation.handleChange}
//                               onBlur={validation.handleBlur}
//                               value={validation.values.deviceName || ""}
//                               invalid={
//                                 validation.touched.deviceName &&
//                                 validation.errors.deviceName
//                                   ? true
//                                   : false
//                               }
//                             ></Input>
//                             {validation.touched.deviceName &&
//                             validation.errors.deviceName ? (
//                               <FormFeedback type="invalid">
//                                 {validation.errors.deviceName}
//                               </FormFeedback>
//                             ) : null}
//                           </Col>
//                           <Col sm={4}>
//                             <Label className="form-label">Device Make</Label>
//                             <Input
//                               id="deviceMake"
//                               name="deviceMake"
//                               className="form-control"
//                               placeholder="Enter Device Make"
//                               type="select"
//                               onChange={validation.handleChange}
//                               onBlur={validation.handleBlur}
//                               value={validation.values.deviceMake || ""}
//                               invalid={
//                                 validation.touched.deviceMake &&
//                                 validation.errors.deviceMake
//                                   ? true
//                                   : false
//                               }
//                             >
//                               <option value="default">Choose One</option>
//                               {make.map((item, idx) =>
//                                 // item.role_id?.role_name === "Manufacturer" ? (
//                                   <option
//                                     value={item.name}
//                                     key={item.entity_id}
//                                   >
//                                     {item.name}
//                                   </option>
//                                 // ) : null
//                               )}
//                             </Input>
//                             {validation.touched.deviceMake &&
//                             validation.errors.deviceMake ? (
//                               <FormFeedback type="invalid">
//                                 {validation.errors.deviceMake}
//                               </FormFeedback>
//                             ) : null}
//                           </Col>
//                         </Row>
//                         <Row className="my-2">
//                           <Col sm={4}>
//                             <Label className="form-label">Device Model</Label>
//                             <Input
//                               id="deviceModel"
//                               name="deviceModel"
//                               className="form-control"
//                               type="text"
//                               placeholder="Enter model"
//                               onChange={validation.handleChange}
//                               onBlur={validation.handleBlur}
//                               value={validation.values.deviceModel || ""}
//                               invalid={
//                                 validation.touched.deviceModel &&
//                                 validation.errors.deviceModel
//                                   ? true
//                                   : false
//                               }
//                             ></Input>
//                             {validation.touched.deviceModel &&
//                             validation.errors.deviceModel ? (
//                               <FormFeedback type="invalid">
//                                 {validation.errors.deviceModel}
//                               </FormFeedback>
//                             ) : null}
//                           </Col>
//                           <Col sm={4}>
//                             <Label className="form-label">Remarks</Label>
//                             <Input
//                               id="remarks"
//                               name="remarks"
//                               className="form-control"
//                               placeholder="Remarks"
//                               type="text"
//                               onChange={validation.handleChange}
//                               onBlur={validation.handleBlur}
//                               value={validation.values.remarks || ""}
//                               invalid={
//                                 validation.touched.remarks &&
//                                 validation.errors.remarks
//                                   ? true
//                                   : false
//                               }
//                             ></Input>
//                             {validation.touched.remarks &&
//                             validation.errors.remarks ? (
//                               <FormFeedback type="invalid">
//                                 {validation.errors.remarks}
//                               </FormFeedback>
//                             ) : null}
//                           </Col>
//                         </Row>
//                       </div>
//                       <div className="d-flex justify-content-center">
//                         <div className="mt-4 mx-2">
//                           <Button color="primary" type="submit">
//                             Confirm Details
//                           </Button>
//                         </div>
//                       </div>
//                     </Form>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default ModalDevice;
