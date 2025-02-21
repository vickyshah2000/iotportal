import React, { useEffect, useState } from "react";
// import getComponents from "../../helpers/custom_helper/data/getComponents";
import { Table, Spinner } from "reactstrap";
import { fetchWithTokenRefresh } from "../helpers/AuthType/backend";
const DeviceDataTable = (props) => {
  const [components, setComponents] = useState([]);

  const base_url = import.meta.env.VITE_BASE_URL;

  const imei = props.id;
  console.log(imei);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithTokenRefresh({
          url: `${base_url}/api/device-data/${imei}/`,
        });
        console.log(response.data);
        setComponents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [base_url]);

  return (
    <div>
      {console.log(components)}
      {components && components.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>S. No</th>
              <th>IMEI </th>
              <th>Temperature</th>
              <th>Charging</th>
              <th>Last Reporting Time</th>
              <th>Signal Strength</th>
            </tr>
          </thead>
          <tbody>
            {components.map((item, index) => (
              <tr key={item.ComponentUId}>
                <td>{index + 1}</td>
                <td>{item.imie}</td>
                <td>{item.temperature}</td>

                <td>
                  {item.ischarging == "1" ? (
                    <div
                      style={{
                        width: "30px",
                        height: "15px",
                        border: "2px solid gray",
                        borderRadius: "5px",
                        position: "relative",
                        overflow: "hidden",
                        boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                        display: "inline-block",
                        margin: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "0%",
                          height: "100%",
                          backgroundColor: "limegreen",
                          animation: "charge 2s infinite",
                          borderRadius: "3px",
                        }}
                      ></div>
                      <style>
                        {
                          "@keyframes charge { 0% { width: 0%; } 100% { width: 100%; } }"
                        }
                      </style>
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "30px",
                        height: "15px",
                        backgroundColor: "gray",
                        position: "relative",
                        borderRadius: "6px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          width: "20px",
                          height: "8px",
                          backgroundColor: "#ff6347",
                          bottom: "3px",
                          left: "5px",
                          animation: "blink 1s infinite",
                        }}
                      />
                    </div>
                  )}
                </td>
                <td>{item.lastreportingtime}</td>
                <td>{item.signalstrength}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <>
          <div
            className="container d-flex flex-column align-items-center justify-content-center mt-5"
            style={{ height: "300px" }}
          >
            <Spinner color="primary">Loading...</Spinner>
            <h6 className="mt-4">Loading...</h6>
          </div>
        </>
      )}
    </div>
  );
};

export default DeviceDataTable;
