import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import rfidicon from "../assets/images/marker-rfid-collected.png"

export default function DefaultMap() {
  const [loading, setLoading] = useState(true);
  const mapUrl = import.meta.env.VITE_BASE_URLMAP;
  useEffect(() => {
    const map = L.map("map", {
      center: [15.827795, 74.50953167], // Initial map center
      zoom: 16,
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: true,
    });
    
    // OpenStreetMap Tile Layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 16,
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // const markerCluster = L.markerClusterGroup({
    //   chunkedLoading: true,
    //   disableClusteringAtZoom: 16,
    //   maxClusterRadius: 50,
    //   iconCreateFunction: function (cluster) {
    //     return L.divIcon({
    //       html: `<div style='background-color: rgba(0, 123, 255, 0.5); border: 2px solid #007bff; border-radius: 50%; width: 30px; height: 30px;'></div>`,
    //       className: "",
    //       iconSize: [30, 30],
    //     });
    //   },
    // });

    // map.addLayer(markerCluster);

    // async function fetchAndPlotData() {
    //   const url = `${mapUrl}/api/AllDetails/Puducherry?entityid=1`;

    //   try {
    //     const response = await fetch(url);
    //     if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    //     const data = await response.json();

    //     const totalMarkers = 10000; // Limit to 10,000 markers
    //     const limitedData = data.slice(0, totalMarkers);

    //     // // Setting map view based on the first marker's position
    //     // if (limitedData.length > 0) {
    //     //   const { latitude, longitude } = limitedData[0];
    //     //   if (latitude && longitude) {
    //     //     map.setView([parseFloat(latitude), parseFloat(longitude)], 16);
    //     //   }
    //     // }

    //     // Adding markers with a custom icon
    //     limitedData.forEach(({ latitude, longitude, Name, addressline1, wardname, AssetId, person }) => {
    //       if (latitude && longitude) {
    //         // Custom Icon for the marker
    //         const customIcon = L.icon({
    //           iconUrl: rfidicon, // Path to your custom image icon
    //           iconSize: [30, 30], // Icon size
    //           iconAnchor: [15, 30], // Point to the bottom center of the icon
    //           popupAnchor: [0, -30], // Popup position relative to the icon
    //         });

    //         // Creating marker with custom icon
    //         const marker = L.marker([parseFloat(latitude), parseFloat(longitude)], {
    //           icon: customIcon,
    //         })
    //           .bindPopup(`
    //             <b>Lat:</b> ${latitude || "N/A"}<br>
    //             <b>Long:</b> ${longitude || "N/A"}<br>
    //             <b>Address:</b> ${addressline1 || "N/A"}<br>
    //             <b>Ward Name:</b> ${wardname || "N/A"}<br>
    //             <b>Asset ID:</b> ${AssetId || "N/A"}<br>
    //             <b>Person:</b> ${person || "N/A"}
    //           `);

    //         markerCluster.addLayer(marker);
    //       }
    //     });

    //     setLoading(false);
    //   } catch (error) {
    //     console.error("Error fetching or processing data:", error);
    //     setLoading(false);
    //   }
    // }

    // fetchAndPlotData();

    return () => {
      map.remove(); // Cleanup map when component unmounts
    };
  }, []);

  const styles = {
    map: {
      height: "100vh",
      width: "100%",
    },
    loader: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1000,
      fontSize: "20px",
      color: "#007bff",
    },
  };

  return (
    <>
      {loading && <div style={styles.loader}>Map data not found</div>}
      <div id="map" style={styles.map}></div>
    </>
  );
}



