import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  setIsMapEvent,
  setIsMapModal,
  setMarkerCoordinates,
} from "../../features/modal/modalSlice";
import { Marker, useMapEvents } from "react-leaflet";

const MapEvents = () => {
  const dispatch = useAppDispatch();
  //   const markerCoordinatesSelector = useAppSelector(
  //     (state) => state.map.markerCoordinates
  //   );

  const [position, setPosition] = useState(null);

  useMapEvents({
    click: (e: any) => {
      setPosition(e.latlng);
      const position = e.latlng;
      dispatch(setMarkerCoordinates(position));
      dispatch(setIsMapEvent(true));
      dispatch(setIsMapModal(false));
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
};

export default MapEvents;
