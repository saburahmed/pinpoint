import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setBackupMapData } from "../../features/modal/modalSlice";
import { Marker, useMapEvents } from "react-leaflet";

const MapEvents = () => {
  const dispatch = useAppDispatch();

  const [position, setPosition] = useState(null);

  useMapEvents({
    click: (e: any) => {
      setPosition(e.latlng); // 👈 add marker
      const postion = e.latlng;

      const name = prompt("Enter the name of your new place");

      dispatch(
        setBackupMapData({
          type: "Feature",
          properties: {
            NAME: name,
          },
          geometry: {
            type: "Point",
            coordinates: postion,
          },
        })
      );

      /* CODE TO ADD NEW PLACE TO STORE (check the source code) */
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
};

export default MapEvents;
