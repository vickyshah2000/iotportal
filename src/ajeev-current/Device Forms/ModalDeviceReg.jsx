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
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { fetchWithTokenRefresh, postWithTokenRefresh } from "../../helpers/AuthType/backend";
const ModalDeviceReg = () => {
  const history=useHistory()

  document.title = "Device";
  // const [modal, setModal] = useState(false);
  const [type,setType]=useState([])
  const location = useLocation()
  // const entityId = location.state.entityId
  // const base_url=import.meta.env.VITE_BASE_URL
  const base_url2=import.meta.env.VITE_BASE_URL2

  useEffect(() => {
    const getDeviceType = async () => {
      try {
        const res = await axios.get( `${base_url2}/api/masterDeviceType/`) 
        setType(res.data);
        console.log(res.data)
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, such as displaying an error message to the user
      }
    };

    getDeviceType(); // Call the asynchronous function
  }, []);

  
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      deviceType: "",
      imeiNumber: "",
      parentDevice: "",
    },
    validationSchema: Yup.object({
      deviceType: Yup.string().required("Please select Device Type"),
      imeiNumber: Yup.string().required("Please enter IMEI Number"),
      parentDevice: Yup.string().required("Please enter parent Device"),
    }),
    onSubmit: async (values) => {
      try {
        // Sending post request using axios
        const response = await axios.post(`${base_url2}/api/Device`, {
          devicetypeid: parseInt(values.deviceType),  // Ensure that deviceType is a valid integer
          imie: values.imeiNumber,
          parentid: parseInt(values.parentDevice),   // Ensure parentDevice is a valid integer
        });
        alert("Device Add Successfully")
        // console.log("Post successful:", response.data);
        
        // Redirect to device-table with deviceType in query params
        history.push("/device-table", { deviceType: values.deviceType });
      } catch (error) {
        console.error("Error posting data:", error);
        alert("Failed to add device. Please try again.");
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
                        <h5 className="text-primary">Device Registration</h5>
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
                          {/* Replace the image source with your logo */}
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
                        return false;
                      }}
                    >
                      <div className="mb-3">
                        <Row className="my-2">
                          <Col sm={4}>
                            <Label className="form-label">Device Type</Label>
                            <Input
                              id="deviceType"
                              name="deviceType"
                              className="form-control"
                              type="select"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.deviceType || ""}
                              invalid={
                                validation.touched.deviceType &&
                                validation.errors.deviceType
                                  ? true
                                  : false
                              }
                            >
                              <option value="">Choose one</option>
                              {type.map((item)=>(
                                <option key={item.id} value={item.id}>{item.deviceName}, {item.make}, {item.model}</option>
                              ))}
                             
                            
                            </Input>
                            {validation.touched.deviceType &&
                            validation.errors.deviceType ? (
                              <FormFeedback type="invalid">
                                {validation.errors.deviceType}
                              </FormFeedback>
                            ) : null}
                          </Col>
                         
                          <Col sm={4}>
                            <Label className="form-label">Device Unique Number</Label>
                            <Input
                              id="imeiNumber"
                              name="imeiNumber"
                              className="form-control"
                              placeholder="Enter Device Unique Number"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.imeiNumber || ""}
                              invalid={
                                validation.touched.imeiNumber &&
                                validation.errors.imeiNumber
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.imeiNumber &&
                            validation.errors.imeiNumber ? (
                              <FormFeedback type="invalid">
                                {validation.errors.imeiNumber}
                              </FormFeedback>
                            ) : null}
                          </Col>

                          <Col sm={4}>
                            <Label className="form-label">Parent Device</Label>
                            <Input
                              id="parentDevice"
                              name="parentDevice"
                              className="form-control"
                              placeholder="Enter parent Device"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.parentDevice || ""}
                              invalid={
                                validation.touched.parentDevice &&
                                validation.errors.parentDevice
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.parentDevice &&
                            validation.errors.parentDevice ? (
                              <FormFeedback type="invalid">
                                {validation.errors.parentDevice}
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

export default ModalDeviceReg;
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
// import axios from "axios";
// import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
// import { fetchWithTokenRefresh, postWithTokenRefresh } from "../../helpers/AuthType/backend";
// const ModalDeviceReg = () => {
//   const history=useHistory()
//   document.title = "Device";
//   // const [modal, setModal] = useState(false);
//   const [type,setType]=useState([])
//   const location = useLocation()
//   // const entityId = location.state.entityId
  
//   const validation = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       deviceType: "",
//       imeiNumber: "",
//       parentDevice:"",
      
//     },
//     validationSchema: Yup.object({
//       deviceType: Yup.string().required("Please select Device Type"),
//       imeiNumber: Yup.string().required("Please enter IMEI Number"),
//       parentDevice: Yup.string().required("Please enter parent Device"),
     
//     }),
//     onSubmit: (values) => {
//       console.log(values);
//       postWithTokenRefresh({url:`${base_url}/api/assign-imie/` ,body:{
//         device_type_id:parseInt(values.deviceType),
//         imei:values.imeiNumber,
//         parent_id:parseInt(values.parentDevice),
//       }})
//       console.log("post successful")
//       history.push("/device-table",{deviceType:values.deviceType})
//     },
//   });
//   const base_url=import.meta.env.VITE_BASE_URL
//   useEffect(() => {
//     const getDeviceType = async () => {
//       try {
//         const res = await fetchWithTokenRefresh({url: `${base_url}/api/master-device-type/`}) 
//         setType(res.data);
//         console.log(res.data)
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         // Handle error, such as displaying an error message to the user
//       }
//     };

//     getDeviceType(); // Call the asynchronous function
//   }, []);


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
//                         <h5 className="text-primary">Device Registration</h5>
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
//                           {/* Replace the image source with your logo */}
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
//                         return false;
//                       }}
//                     >
//                       <div className="mb-3">
//                         <Row className="my-2">
//                           <Col sm={4}>
//                             <Label className="form-label">Device Type</Label>
//                             <Input
//                               id="deviceType"
//                               name="deviceType"
//                               className="form-control"
//                               type="select"
//                               onChange={validation.handleChange}
//                               onBlur={validation.handleBlur}
//                               value={validation.values.deviceType || ""}
//                               invalid={
//                                 validation.touched.deviceType &&
//                                 validation.errors.deviceType
//                                   ? true
//                                   : false
//                               }
//                             >
//                               <option value="">Choose one</option>
//                               {type.map((item)=>(
//                                 <option key={item.id} value={item.id}>{item.name}, {item.make}, {item.model}</option>
//                               ))}
                             
                            
//                             </Input>
//                             {validation.touched.deviceType &&
//                             validation.errors.deviceType ? (
//                               <FormFeedback type="invalid">
//                                 {validation.errors.deviceType}
//                               </FormFeedback>
//                             ) : null}
//                           </Col>
                         
//                           <Col sm={4}>
//                             <Label className="form-label">Device Unique Number</Label>
//                             <Input
//                               id="imeiNumber"
//                               name="imeiNumber"
//                               className="form-control"
//                               placeholder="Enter Device Unique Number"
//                               type="text"
//                               onChange={validation.handleChange}
//                               onBlur={validation.handleBlur}
//                               value={validation.values.imeiNumber || ""}
//                               invalid={
//                                 validation.touched.imeiNumber &&
//                                 validation.errors.imeiNumber
//                                   ? true
//                                   : false
//                               }
//                             />
//                             {validation.touched.imeiNumber &&
//                             validation.errors.imeiNumber ? (
//                               <FormFeedback type="invalid">
//                                 {validation.errors.imeiNumber}
//                               </FormFeedback>
//                             ) : null}
//                           </Col>

//                           <Col sm={4}>
//                             <Label className="form-label">Parent Device</Label>
//                             <Input
//                               id="parentDevice"
//                               name="parentDevice"
//                               className="form-control"
//                               placeholder="Enter parent Device"
//                               type="text"
//                               onChange={validation.handleChange}
//                               onBlur={validation.handleBlur}
//                               value={validation.values.parentDevice || ""}
//                               invalid={
//                                 validation.touched.parentDevice &&
//                                 validation.errors.parentDevice
//                                   ? true
//                                   : false
//                               }
//                             />
//                             {validation.touched.parentDevice &&
//                             validation.errors.parentDevice ? (
//                               <FormFeedback type="invalid">
//                                 {validation.errors.parentDevice}
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

// export default ModalDeviceReg;