import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import Modal from "../../components/Modal";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import MapStyles from "./MapModal.module.scss";

type mapModalProps = {
  showMapModal: boolean;
  onCloseMapModal: () => void;
  onClickAwayMapModal: () => void;
};

const MapModal: FC<mapModalProps> = ({
  showMapModal,
  onCloseMapModal,
  onClickAwayMapModal,
}) => {
  //   const mapData: any = useAppSelector((state) => state?.map?.geoJSONData);

  const mapData: any = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          PARK_ID: 960,
          NAME: "Bearbrook Skateboard Park",
          DESCRIPTIO: "Flat asphalt surface, 5 components",
        },
        geometry: {
          type: "Point",
          coordinates: [-75.3372987731628, 45.383321536272049],
        },
      },
      {
        type: "Feature",
        properties: {
          PARK_ID: 1219,
          NAME: "Bob MacQuarrie Skateboard Park (SK8 Extreme Park)",
          DESCRIPTIO:
            "Flat asphalt surface, 10 components, City run learn to skateboard programs, City run skateboard camps in summer",
        },
        geometry: {
          type: "Point",
          coordinates: [-75.546518086577947, 45.467134581917357],
        },
      },
    ],
  };

  return (
    <Modal
      onClickAway={onClickAwayMapModal}
      onClose={onCloseMapModal}
      show={showMapModal}
      className={MapStyles.map}
    >
      {mapData && mapData?.features?.length !== 0 ? (
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <div>Map data does not exist</div>
      )}
    </Modal>
  );
};

export default MapModal;
