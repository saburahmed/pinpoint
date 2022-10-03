import { FC } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setIsBackupMap } from "../../features/modal/modalSlice";
import MapEvents from "../../components/MapEvents";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import MapStyles from "./MapModal.module.scss";

export interface IMapModalProps {
  showMapModal: boolean;
  onCloseMapModal: () => void;
}

const MapModal: FC<IMapModalProps> = ({ showMapModal, onCloseMapModal }) => {
  const dispatch = useAppDispatch();
  const mapData: any = useAppSelector((state) => state?.map?.geoJSONData);
  const backupMapData: any = useAppSelector((state) => state.map.backupMapData);
  const isBackupMapSelector = useAppSelector((state) => state.map.isBackupMap);

  return (
    <Modal onClose={onCloseMapModal} show={showMapModal}>
      <div className={MapStyles.map}>
        {mapData && mapData?.features?.length !== 0 ? (
          <MapContainer
            center={mapData?.features[0]?.geometry?.coordinates}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {mapData?.features?.map((item: any, index: number) => (
              <Marker key={index} position={item.geometry.coordinates}>
                <Popup>
                  {item.properties.NAME || "Oops!! I've forgotten the name😩"}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <>
            {isBackupMapSelector ? (
              <MapContainer
                center={backupMapData?.features[0]?.geometry?.coordinates}
                zoom={13}
                scrollWheelZoom={false}
                closePopupOnClick={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {backupMapData?.features?.map((item: any, index: number) => (
                  <Marker key={index} position={item.geometry.coordinates}>
                    <Popup>
                      {item.properties.NAME ||
                        "Oops!! I've forgotten the name😩"}
                    </Popup>
                    <MapEvents />
                  </Marker>
                ))}
              </MapContainer>
            ) : (
              <div className={MapStyles.map_error}>
                <div className={MapStyles.map_error_wrapper}>
                  <div className={MapStyles.map_error_wrapper_content}>
                    <h1
                      className={MapStyles.map_error_wrapper_content_headtext}
                    >
                      Oops!! Our GeoJSON data got lost in transit😩.
                    </h1>

                    <p className={MapStyles.map_error_wrapper_content_subtext}>
                      You can click the button below to play around and add
                      markers to the map by clicking it or close the modal to
                      try again.
                    </p>

                    <div className={MapStyles.map_error_wrapper_content_button}>
                      <Button
                        className={
                          MapStyles.map_error_wrapper_content_button_item
                        }
                        title="Locate"
                        onPress={() => dispatch(setIsBackupMap(true))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default MapModal;
