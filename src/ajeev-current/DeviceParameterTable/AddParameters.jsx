import { Container } from "reactstrap";
import React, { useState } from "react";
import { Row, Col, FormGroup, Label, Input, Button, Table } from "reactstrap";
import axios from "axios";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { postWithTokenRefresh } from "../../helpers/AuthType/backend";

const AddParameters = () => {
  //meta title
  document.title = "Device Parameter | Ajeevi IOT";
  const base_url = import.meta.env.VITE_BASE_URL;
  const base_url2 = import.meta.env.VITE_BASE_URL2;
  const history = useHistory();
  const location = useLocation();
  const deviceId = location.state.deviceId;
  const deviceName = location.state.deviceName;
  const deviceMake = location.state.deviceMake;
  const deviceModel = location.state.deviceModel;
  console.log("add parameter form", deviceId);
  console.log("add parameter form make", deviceMake);
  console.log("add parameter form", deviceName);
  console.log("add parameter form", deviceModel);

  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    unit: "",
    minValue: "",
    maxValue: "",
    standardValue: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getLabel = (key) => {
    switch (key) {
      case "name":
        return "Parameter Name";
      default:
        return key.charAt(0).toUpperCase() + key.slice(1);
    }
  };

  const add = () => {
    const isEmptyField = Object.entries(formData).some(
      ([key, value]) => key !== "remarks" && value === ""
    );
    if (isEmptyField) {
      alert("All fields except remarks are required");
      return;
    }
    setData([...data, formData]);
    setFormData({
      name: "",
      unit: "",
      minValue: "",
      maxValue: "",
      standardValue: "",
      remarks: "",
    });
  };

  const remove = (index) => {
    setData(data.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async () => {
    try {
      // Format the data
      const formattedData = data.map((item) => ({
        ...item,
        minValue: parseFloat(item.minValue),
        maxValue: parseFloat(item.maxValue),
        standardValue: parseFloat(item.standardValue),
      }));
  
      // Send the POST request with formatted data
      const response = await axios.post(`${base_url2}/api/DeviceAttribute?deviceId=${deviceId}`,formattedData
      );
  
      // Handle response or success (optional)
      if (response.status === 200) {
        console.log('Data submitted successfully');
      }
  
      // Redirect after submitting the data
      history.push("/device-parameter", {
        deviceId: deviceId,
        deviceMake: deviceMake,
        deviceName: deviceName,
        deviceModel: deviceModel,
      });
  
    } catch (error) {
      // Handle error
      console.error("Error submitting data:", error);
      // Optionally, you could display an error message to the user
    }
  };
  

  const parameterOptions = ["Temperature", "Length", "Width", "Height"];

  function renderUnitDropdown() {
    if (formData.name === "Temperature") {
      return (
        <Input
          type="select"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
        >
          <option value="">Select Unit</option>
          <option value="centigrade">Celsius (°C)</option>
          <option value="fahrenheit">Fahrenheit (°F)</option>
          <option value="Kelvin">Kelvin (K)</option>
        </Input>
      );
    } else if (["Length", "Width", "Height"].includes(formData.name)) {
      return (
        <Input
          type="select"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
        >
          <option value="">Select Unit</option>
          <option value="mm">millimeter (mm)</option>
          <option value="cm">centimeter (cm)</option>
          <option value="m">meters (m)</option>
        </Input>
      );
    } else {
      return (
        <Input
          type="text"
          name="unit"
          placeholder="Enter Unit"
          value={formData.unit}
          onChange={handleChange}
        />
      );
    }
  }

  function renderTable() {
    return (
      <Table bordered striped responsive>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{getLabel(key)}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              {Object.values(item).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
              <td>
                <Button color="danger" onClick={() => remove(idx)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          {/* <Breadcrumbs title="device" breadcrumbItem="Add Parameter" /> */}
          <div className="container text-center" style={{ marginTop: "80px" }}>
            <Row>
              <Col md={4}>
                <label>Device Make</label>
                <Input
                  type="text"
                  value={deviceMake}
                  readOnly
                  placeholder="Device Make"
                />
              </Col>
              <Col md={4}>
                <label>Device Name</label>
                <Input
                  type="text"
                  value={deviceName}
                  readOnly
                  placeholder="Device Name"
                />
              </Col>
              <Col md={4}>
                <label>Device Model</label>
                <Input
                  type="text"
                  value={deviceModel}
                  readOnly
                  placeholder="Device Model"
                />
              </Col>
            </Row>
            <hr />
            <Row className="mt-4">
              {Object.entries(formData).map(([key, value]) => (
                <Col md={4} key={key}>
                  <FormGroup>
                    <Label for={key}>{getLabel(key)}</Label>
                    {key === "name" ? (
                      <>
                        <Input
                          type="text"
                          list="parameterList"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        <datalist id="parameterList">
                          {parameterOptions.map((option, index) => (
                            <option key={index} value={option} />
                          ))}
                        </datalist>
                      </>
                    ) : key === "unit" ? (
                      renderUnitDropdown()
                    ) : (
                      <Input
                        type="text"
                        id={key}
                        name={key}
                        placeholder={`Enter ${getLabel(key)}`}
                        value={value}
                        onChange={handleChange}
                      />
                    )}
                  </FormGroup>
                </Col>
              ))}
            </Row>
            <Row>
              <Col md={12}>
                <Button color="success" onClick={add}>
                  Add
                </Button>{" "}
                <Button color="danger" onClick={() => setData([])}>
                  Clear
                </Button>
              </Col>
            </Row>
            {data.length > 0 && (
              <>
                {renderTable()}
                <Button
                  color="success"
                  onClick={handleSubmit}
                  style={{ marginTop: "20px" }}
                >
                  Submit
                </Button>
              </>
            )}
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddParameters;
// import { Container } from "reactstrap";
// import React, { useState } from "react";
// import { Row, Col, FormGroup, Label, Input, Button, Table } from "reactstrap";
// import axios from "axios";
// import {
//   useHistory,
//   useLocation,
// } from "react-router-dom/cjs/react-router-dom.min";
// //Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb";
// import { postWithTokenRefresh } from "../../helpers/AuthType/backend";

// const AddParameters = () => {
//   //meta title
//   document.title = "Device Parameter | Ajeevi IOT";
//   const base_url = import.meta.env.VITE_BASE_URL;
//   const history = useHistory();
//   const location = useLocation();
//   const deviceId = location.state.deviceId;
//   const deviceName = location.state.deviceName;
//   const deviceMake = location.state.deviceMake;
//   const deviceModel = location.state.deviceModel;
//   console.log("add parameter form", deviceId);
//   console.log("add parameter form make", deviceMake);
//   console.log("add parameter form", deviceName);
//   console.log("add parameter form", deviceModel);

//   const [data, setData] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     unit: "",
//     min_value: "",
//     max_value: "",
//     standard_value: "",
//     remarks: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const getLabel = (key) => {
//     switch (key) {
//       case "name":
//         return "Parameter Name";
//       default:
//         return key.charAt(0).toUpperCase() + key.slice(1);
//     }
//   };

//   const add = () => {
//     const isEmptyField = Object.entries(formData).some(
//       ([key, value]) => key !== "remarks" && value === ""
//     );
//     if (isEmptyField) {
//       alert("All fields except remarks are required");
//       return;
//     }
//     setData([...data, formData]);
//     setFormData({
//       name: "",
//       unit: "",
//       min_value: "",
//       max_value: "",
//       standard_value: "",
//       remarks: "",
//     });
//   };

//   const remove = (index) => {
//     setData(data.filter((_, idx) => idx !== index));
//   };

//   const handleSubmit = () => {
//     const formattedData = data.map((item) => ({
//       ...item,
//       min_value: parseFloat(item.min_value),
//       max_value: parseFloat(item.max_value),
//       standard_value: parseFloat(item.standard_value),
//       deviceID: parseInt(deviceId),
//     }));

//     postWithTokenRefresh({
//       url: `${base_url}/api/device-attribute/`,
//       body: formattedData,
//     })
//       .then((response) => {
//         console.log("Success:", response.data);
//         setData([]);
//         history.push("/device-parameter", {
//           deviceId: deviceId,
//           deviceMake: deviceMake,
//           deviceName: deviceName,
//           deviceModel: deviceModel,
//         });
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   const parameterOptions = ["Temperature", "Length", "Width", "Height"];

//   function renderUnitDropdown() {
//     if (formData.name === "Temperature") {
//       return (
//         <Input
//           type="select"
//           name="unit"
//           value={formData.unit}
//           onChange={handleChange}
//         >
//           <option value="">Select Unit</option>
//           <option value="centigrade">Celsius (°C)</option>
//           <option value="fahrenheit">Fahrenheit (°F)</option>
//           <option value="Kelvin">Kelvin (K)</option>
//         </Input>
//       );
//     } else if (["Length", "Width", "Height"].includes(formData.name)) {
//       return (
//         <Input
//           type="select"
//           name="unit"
//           value={formData.unit}
//           onChange={handleChange}
//         >
//           <option value="">Select Unit</option>
//           <option value="mm">millimeter (mm)</option>
//           <option value="cm">centimeter (cm)</option>
//           <option value="m">meters (m)</option>
//         </Input>
//       );
//     } else {
//       return (
//         <Input
//           type="text"
//           name="unit"
//           placeholder="Enter Unit"
//           value={formData.unit}
//           onChange={handleChange}
//         />
//       );
//     }
//   }

//   function renderTable() {
//     return (
//       <Table bordered striped responsive>
//         <thead>
//           <tr>
//             {Object.keys(data[0]).map((key) => (
//               <th key={key}>{getLabel(key)}</th>
//             ))}
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, idx) => (
//             <tr key={idx}>
//               {Object.values(item).map((value, i) => (
//                 <td key={i}>{value}</td>
//               ))}
//               <td>
//                 <Button color="danger" onClick={() => remove(idx)}>
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     );
//   }

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid>
//           {/* Render Breadcrumbs */}
//           {/* <Breadcrumbs title="device" breadcrumbItem="Add Parameter" /> */}
//           <div className="container text-center" style={{ marginTop: "80px" }}>
//             <Row>
//               <Col md={4}>
//                 <label>Device Make</label>
//                 <Input
//                   type="text"
//                   value={deviceMake}
//                   readOnly
//                   placeholder="Device Make"
//                 />
//               </Col>
//               <Col md={4}>
//                 <label>Device Name</label>
//                 <Input
//                   type="text"
//                   value={deviceName}
//                   readOnly
//                   placeholder="Device Name"
//                 />
//               </Col>
//               <Col md={4}>
//                 <label>Device Model</label>
//                 <Input
//                   type="text"
//                   value={deviceModel}
//                   readOnly
//                   placeholder="Device Model"
//                 />
//               </Col>
//             </Row>
//             <hr />
//             <Row className="mt-4">
//               {Object.entries(formData).map(([key, value]) => (
//                 <Col md={4} key={key}>
//                   <FormGroup>
//                     <Label for={key}>{getLabel(key)}</Label>
//                     {key === "name" ? (
//                       <>
//                         <Input
//                           type="text"
//                           list="parameterList"
//                           name="name"
//                           value={formData.name}
//                           onChange={handleChange}
//                         />
//                         <datalist id="parameterList">
//                           {parameterOptions.map((option, index) => (
//                             <option key={index} value={option} />
//                           ))}
//                         </datalist>
//                       </>
//                     ) : key === "unit" ? (
//                       renderUnitDropdown()
//                     ) : (
//                       <Input
//                         type="text"
//                         id={key}
//                         name={key}
//                         placeholder={`Enter ${getLabel(key)}`}
//                         value={value}
//                         onChange={handleChange}
//                       />
//                     )}
//                   </FormGroup>
//                 </Col>
//               ))}
//             </Row>
//             <Row>
//               <Col md={12}>
//                 <Button color="success" onClick={add}>
//                   Add
//                 </Button>{" "}
//                 <Button color="danger" onClick={() => setData([])}>
//                   Clear
//                 </Button>
//               </Col>
//             </Row>
//             {data.length > 0 && (
//               <>
//                 {renderTable()}
//                 <Button
//                   color="success"
//                   onClick={handleSubmit}
//                   style={{ marginTop: "20px" }}
//                 >
//                   Submit
//                 </Button>
//               </>
//             )}
//           </div>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default AddParameters;
