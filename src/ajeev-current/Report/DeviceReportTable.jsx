import React, { useEffect, useState } from "react";
import { Table, Spinner } from "reactstrap";
import { fetchWithTokenRefresh } from "../../helpers/AuthType/backend";

const DeviceReportTable = (props) => {
  const [components, setComponents] = useState([]);

  const base_url = import.meta.env.VITE_BASE_URL;

  const imei = props.id;
  const startDate = new Date(props.beforeDate);
  const endDate = new Date(props.endDate);
  const timeWise = props.timeWise;
  // console.log(imei);
  // console.log(bdate);
  // console.log(edate);
  // console.log(timeWise);

  // const startDate = new Date("2024-08-05");
  // const endDate = new Date("2024-08-06");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithTokenRefresh({
          url: `${base_url}/api/device-data/${imei}/`,
        });
        console.log(response.data)

        // Parse dates and sort data
        const parsedData = response.data.map(entry => ({
          ...entry,
          lastreportingtime: new Date(entry.lastreportingtime),
        }));
        parsedData.sort((a, b) => a.lastreportingtime - b.lastreportingtime);

        // Filter data by date range
        const filteredData = parsedData.filter(item => {
          const itemDate = item.lastreportingtime;
          return itemDate >= startDate && itemDate <= endDate;
        });

        // Filter data by 10-minute intervals
        const filterByInterval = (data, intervalMinutes) => {
          const filtered = [];
          let lastTimestamp = null;

          data.forEach(entry => {
            const entryTime = entry.lastreportingtime;
            if (!lastTimestamp || (entryTime - lastTimestamp) >= intervalMinutes * 60 * 1000) {
              filtered.push(entry);
              lastTimestamp = entryTime;
            }
          });

          return filtered;
        };

        const result = filterByInterval(filteredData, timeWise);
        setComponents(result);
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {components && components.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>S. No</th>
              <th>IMEI</th>
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
                  {item.ischarging === "1" ? (
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
                <td>{item.lastreportingtime.toLocaleString()}</td>
                <td>{item.signalstrength}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div
          className="container d-flex flex-column align-items-center justify-content-center mt-5"
          style={{ height: "300px" }}
        >
          <Spinner color="primary">Loading...</Spinner>
          <h6 className="mt-4">Loading...</h6>
        </div>
      )}
    </div>
  );
};

export default DeviceReportTable;
