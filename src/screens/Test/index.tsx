import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const TestMap = () => {
  return (
    <div>
      <MapContainer
        center={[51.507359, -0.136439]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.507359, -0.136439]}>
          <Popup>This is your starting point.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default TestMap;
