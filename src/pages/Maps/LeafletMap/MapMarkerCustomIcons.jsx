import React, { useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

Leaflet.Icon.Default.imagePath = "../node_modules/leaflet";

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapMarkerCustomIcons = () => {
  const [state, setState] = useState({
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  });

  const position = [state.lat, state.lng];

  return (
    <Map center={position} zoom={state.zoom} style={{ height: "300px" }}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </Map>
  );
};

export default MapMarkerCustomIcons;
