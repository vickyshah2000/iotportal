import React, { useState } from "react";
import { Container, Row, Col, Modal, ModalBody, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PuduMap from "./PuduMap";
const PuduLandingPage = () => {

  const [zoomedIframe, setZoomedIframe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleZoomClick = (src) => {
    setZoomedIframe(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setZoomedIframe(null);
  };

  const iframes = [
    {
      src: "https://iotgrafana.ajeevi.in/d-solo/ce8r7walxozr4a/flooddata-dashboard?orgId=1&from=1736843958286&to=1736847558287&timezone=browser&var-devices=$_all&refresh=30s&panelId=9&_feature.dashboardSceneSolo",
    },
    {
      src: "https://iotgrafana.ajeevi.in/d-solo/ce8r7walxozr4a/flooddata-dashboard?orgId=1&from=1736852120278&to=1736855720278&timezone=browser&var-devices=$_all&refresh=30s&panelId=8&_feature.dashboardSceneSolo",
    },
    {
      src: "https://iotgrafana.ajeevi.in/d-solo/ce8r7walxozr4a/flooddata-dashboard?orgId=1&from=1736841929637&to=1736845529637&timezone=browser&var-devices=A0A3B37699D8&refresh=1m&panelId=2&__feature.dashboardSceneSolo",
    },
    {
      src: "https://iotgrafana.ajeevi.in/d-solo/ce8r7walxozr4a/flooddata-dashboard?orgId=1&from=1736846141168&to=1736849741168&timezone=browser&var-devices=$_all&refresh=30s&showCategory=Override%201&panelId=7&_feature.dashboardSceneSolo",
    },
    {
      src: "https://iotgrafana.ajeevi.in/d-solo/ae9u6q6e9d5vkc/gps-dashboard?orgId=1&from=1736980855439&to=1737002455439&timezone=browser&panelId=4&__feature.dashboardSceneSolo",
    },
    {
      src: "https://iotgrafana.ajeevi.in/d-solo/ce8r7walxozr4a/flooddata-dashboard?orgId=1&from=1737019639044&to=1737023239044&timezone=browser&var-devices=$_all&showCategory=Standard%20options&panelId=10&_feature.dashboardSceneSolo",
    },
  ];

  const cardStyle = {
    border: "1px solid #ccc",
    position: "relative",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
  };

  const zoomButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 10,
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  };

  return (
    <Container fluid style={{ height: "100vh", padding: 0 }}>
      <Row style={{ height: "100%" }}>
        <Col md="3" style={{ padding: "10px" }}>
          <Row style={{ height: "100%" }}>
            {iframes.slice(0, 3).map((iframe, index) => (
              <Col
                xs="12"
                key={index}
                style={{ ...cardStyle, height: "33.33%", padding: "1px 1px 2px 13px" }}
              >
                <iframe
                  src={iframe.src}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                ></iframe>
                <div
                  style={zoomButtonStyle}
                  onClick={() => handleZoomClick(iframe.src)}
                >
                  🔍
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md="9" style={{ height: "100%", display: "flex", flexDirection: "column", padding: "10px" }}>
          <Row style={{ width: "100%", flexGrow: 1 }}>
            <div style={{ flexGrow: 2, width: "100%", height: "66.66%" }}>
                <div style={{ height: "100%", width: "100%" }}>
                  <PuduMap />
                </div>
            </div>
            {iframes.slice(3).map((iframe, index) => (
              <Col
                md="4"
                key={index + 3}
                style={{ height:"33.33%", flex: "1", border: "1px solid #ccc", margin: "1px 0 0 1px",padding: "1px 1px 2px 13px" }}
              >
                <iframe
                  src={iframe.src}
                  width="100%"
                  height="100%"
                ></iframe>
                <div
                  style={zoomButtonStyle}
                  onClick={() => handleZoomClick(iframe.src)}
                >
                  🔍
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Modal for Zoomed Iframe */}
      <Modal isOpen={modalOpen} toggle={closeModal} size="lg" centered>
        <ModalBody style={{ position: "relative", padding:0}}>
          {zoomedIframe && (
            <iframe
              src={zoomedIframe}
              width="100%"
              height="500px"
            ></iframe>
          )}
          <Button
            close
            onClick={closeModal}
            style={{ position: "absolute", top: "10px", right: "10px",background:"white" ,color:"red"}}>X</Button>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default PuduLandingPage;


// import React from "react";
// import { Container, Row, Col } from "reactstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Belagavi from "./BelagaviMap";
// import PuduMap from "./PuduMap";
// import Cookies from "js-cookie";
// import { Margin } from "@mui/icons-material";

// const PuduLandingPage = () => {
//   const userCookie = Cookies.get("authUser");
//   const entityId = userCookie ? JSON.parse(userCookie).entity_id.entity_id : null;

//   const cardStyle = {
//     border: "1px solid #ccc",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//     height: "100%",
//     boxSizing: "border-box",
//   };

//   return (
//     <Container fluid style={{ height: "100vh", padding: 0 }}>
//       <Row style={{ height: "100%" }}>
//         <Col md="3" style={{ padding: "10px" }}>
//           <Row style={{ height: "100%" }}>
//             <Col xs="12" style={{ ...cardStyle, height: "33.33%", padding: "1px 1px 2px 13px" }}>
//               <iframe src="https://iotgrafana.ajeevi.in/d-solo/ce8r7walxozr4a/flooddata-dashboard?orgId=1&from=1736843958286&to=1736847558287&timezone=browser&var-devices=$_all&refresh=30s&panelId=9&_feature.dashboardSceneSolo" width="100%" height="100%" frameborder="0"></iframe>
//             </Col>
//             <Col xs="12" style={{ ...cardStyle, height: "33.33%", padding: "1px 1px 2px 13px" }}>
//               <iframe src="https://iotgrafana.ajeevi.in/d-solo/ce8r7walxozr4a/flooddata-dashboard?orgId=1&from=1736841929637&to=1736845529637&timezone=browser&var-devices=A0A3B37699D8&refresh=1m&panelId=2&__feature.dashboardSceneSolo" width="100%" height="100%" frameborder="0"></iframe>
//             </Col>
//             <Col xs="12" style={{ ...cardStyle, height: "33.33%", padding: "1px 1px 2px 13px" }}>
//               <iframe src="https://iotgrafana.ajeevi.in/d-solo/ce8r7walxozr4a/flooddata-dashboard?orgId=1&from=1736846141168&to=1736849741168&timezone=browser&var-devices=$_all&refresh=30s&showCategory=Override%201&panelId=7&_feature.dashboardSceneSolo" width="100%" height="100%" frameborder="0"></iframe>
//             </Col>
//           </Row>
//         </Col>
//         <Col md="9" style={{ height: "100%", display: "flex", flexDirection: "column", padding: "10px" }}>
//           <Row style={{ width: "100%", flexGrow: 1 }}>
//             <div style={{ flexGrow: 2, width: "100%", height: "66.66%" }}>
//                 <div style={{ height: "100%", width: "100%" }}>
//                   <PuduMap />
//                 </div>
//             </div>

//             <Col md="4" style={{ height:"33.33%", flex: "1", border: "1px solid #ccc", margin: "1px 0 0 1px",padding: "1px 1px 2px 13px" }}>
//             <iframe src="https://iotgrafana.ajeevi.in/d-solo/ae9u6q6e9d5vkc/gps-dashboard?orgId=1&from=1736980855439&to=1737002455439&timezone=browser&panelId=4&__feature.dashboardSceneSolo" width="100%" height="100%" frameborder="0"></iframe>            </Col>
//             <Col md="4" style={{ flex: "1", border: "1px solid #ccc", margin: "1px 0 0 1px",padding: "1px 1px 2px 13px" }}>
//             <iframe src="https://iotgrafana.ajeevi.in/d-solo/ce8r7walxozr4a/flooddata-dashboard?orgId=1&from=1736852120278&to=1736855720278&timezone=browser&var-devices=$_all&refresh=30s&panelId=8&_feature.dashboardSceneSolo" width="100%" height="100%" frameborder="0"></iframe>
//               </Col>
//               <Col md="4" style={{ flex: "1", border: "1px solid #ccc", margin: "1px 0 0 1px",padding: "1px 1px 2px 13px" }}>
//             <iframe src="https://iotgrafana.ajeevi.in/d-solo/ce8r7walxozr4a/flooddata-dashboard?orgId=1&from=1736852120278&to=1736855720278&timezone=browser&var-devices=$_all&refresh=30s&panelId=8&_feature.dashboardSceneSolo" width="100%" height="100%" frameborder="0"></iframe>
//               </Col>
//           </Row>
//         </Col>

//       </Row>
//     </Container>
//   );
// };

// export default PuduLandingPage;