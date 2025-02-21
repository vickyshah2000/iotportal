import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Cookies from "js-cookie";
import axios from "axios";
import MarkImage from "../assets/images/floodMarker.gif";
import L from "leaflet";

const Pudumap = () => {
  const [markers, setMarkers] = useState([]);
  const mapUrl = import.meta.env.VITE_BASE_URLMAP;
  const userCookie = Cookies.get("authUser");
  const entityId = userCookie ? JSON.parse(userCookie).entity_id.entity_id : null;

  // Fetch markers with error handling
  const fetchMarkers = async () => {
    try {
      const response = await axios.get(`${mapUrl}/api/AllDetails/Puducherry`, {
        params: { entityid: entityId },
      });

      // Ensure all markers have valid latitude and longitude
      const validMarkers = response.data.filter(marker =>
        !isNaN(parseFloat(marker.latitude)) && !isNaN(parseFloat(marker.longitude)) && marker.latitude && marker.longitude
      );

      setMarkers(validMarkers); // Set valid markers only
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching markers");
    }
  };

  useEffect(() => {
    fetchMarkers(); // Fetch markers when the component mounts
  }, []);

  const customIcon = new L.Icon({
    iconUrl: MarkImage,
    iconSize: [110, 65],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <MapContainer
      center={[11.926408,79.807341]} // Default center of the map
      zoom={14} // Default zoom level
      style={{ height: "65vh", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://www.esri.com/">Esri</a> contributors'
      />

      {markers.map((marker, index) => {
        const lat = parseFloat(marker.latitude);
        const lon = parseFloat(marker.longitude);

        // Validate the lat/lon values before creating the marker
        if (isNaN(lat) || isNaN(lon)) {
          console.warn(`Skipping marker with invalid coordinates: ${marker.Name}`);
          return null; // Skip invalid markers
        }

        return (
          <>
            <style>
              {`
            .footer {
            display: none;
            }
             `}
            </style>
            <Marker
              key={index}
              position={[lat, lon]}
              icon={customIcon}
              eventHandlers={{
                mouseover: (e) => e.target.openPopup(),
                mouseout: (e) => e.target.closePopup(),
                click: () => {
                  console.log("Marker clicked:", marker);
                  alert(`Marker ${marker.Name} clicked! Check console for full details.`);
                },
              }}
            >
              <Popup>
                <div>
                  <strong>Device Name:</strong> {marker.Name} <br />
                  <strong>Address:</strong> {marker.addressline1} <br />
                  <strong>IMEI:</strong> {marker.imie} <br />
                  <strong>Person:</strong> {marker.person} <br />
                </div>
              </Popup>
            </Marker>
          </>
        );
      })}

      <ZoomControl position="topright" />
    </MapContainer>
  );
};

export default Pudumap;
