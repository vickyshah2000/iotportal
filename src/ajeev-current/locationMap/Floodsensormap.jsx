import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { Map, TileLayer, Marker, Popup, Circle, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchWithTokenRefresh } from "../../helpers/AuthType/backend";
import Cookies from "js-cookie";
import { ListGroup, ListGroupItem } from "reactstrap";

const customIcon = L.divIcon({
  html: '<i class="bx bxs-thermometer" style="color: blue; font-size: 24px;"></i>',
  iconSize: [24, 24],
  className: "custom-icon",
});

function FloodsensorMap() {
  const base_url = import.meta.env.VITE_BASE_URL;
  const entityId = JSON.parse(Cookies.get("authUser")).entity_id.entity_id;
  const history = useHistory();
  const markerRef = useRef(null);

  // Get addressId from location state or set default
  const location = useLocation();

  const [data, setData] = useState([]); // State to manage contact data
  const [error, setError] = useState();
  const [position, setPosition] = useState(null);

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithTokenRefresh({
          url: `${base_url}/api/map-data/${entityId}/`,
        });

        setData(response.data);
        // Set the position to the first data point's latitude and longitude
        if (response.data.length > 0) {
          const firstLocation = response.data[0];
          const lat = Number(firstLocation.latitude);
          const lng = Number(firstLocation.longitude);

          if (!isNaN(lat) && !isNaN(lng)) {
            setPosition({ lat, lng });
          } else {
            console.error("Invalid latitude or longitude:", firstLocation);
          }
        }
      } catch (error) {
        setError(error); // Set error if there's an error in fetching data
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [base_url]);

  // Set document title
  useEffect(() => {
    document.title = "Device Location";
  }, []);

  return (
    <div className="container-fluid bg-transparent p-2">
      <h4 className="py-2 text-center">Location Map</h4>

      {position ? (
        <Map
        center={position}
        zoom={4.5}
        style={{ height: "500px" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        {data.map((location, index) => {
          const lat = Number(location.latitude);
          const lng = Number(location.longitude);
      
          if (isNaN(lat) || isNaN(lng)) {
            return null;
          }
      
          return (
            <React.Fragment key={index}>
              <Marker
                position={{ lat, lng }}
                icon={customIcon}
                ref={index === 0 ? markerRef : null} // Assign ref to the first marker
              >
                <Tooltip>
                  {location ? (
                    <div className="w-100 d-flex flex-column align-items-start gap-2">
                      <p className="text-left m-0 p-0">DB Code: {location.ShortName}</p>
                      <p className="text-left m-0 p-0">DB Name: {location.Name}</p>
                      <p className="text-left m-0 p-0">City: {location.Addressline2}</p>
                      <p className="text-left m-0 p-0">State: {location.statename}</p>
                    </div>
                  ) : (
                    "No name provided"
                  )}
                </Tooltip>
              </Marker>
            </React.Fragment>
          );
        })}
      </Map>
      ) : (
        <p>Loading map...</p>
      )}
      {error && <p>Error loading data: {error.message}</p>}
    </div>
  );
}

// Prop types validation
FloodsensorMap.propTypes = {
  preGlobalFilteredRows: PropTypes.array,
};

export default FloodsensorMap;
