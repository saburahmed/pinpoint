import { FC, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setBackupMapData } from "../../features/modal/modalSlice";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MapStyles from "./MapModal.module.scss";

type mapModalProps = {
  showMapModal: boolean;
  onCloseMapModal: () => void;
};

const MapModal: FC<mapModalProps> = ({ showMapModal, onCloseMapModal }) => {
  const dispatch = useAppDispatch();

  const mapData: any = useAppSelector((state) => state?.map?.geoJSONData);
  const backupMapData: any = useAppSelector((state) => state.map.backupMapData);

  const [isBackupMap, setIsBackupMap] = useState<boolean>(false);

  // const mapData: any = {
  //   type: "FeatureCollection",
  //   features: [
  //     {
  //       type: "Feature",
  //       properties: {
  //         NAME: "Eko Hotels and Suites",
  //       },
  //       geometry: {
  //         type: "Point",
  //         coordinates: [6.4266, 3.4301],
  //       },
  //     },
  //     {
  //       type: "Feature",
  //       properties: {
  //         NAME: "Lagos Oriental Hotel",
  //       },
  //       geometry: {
  //         type: "Point",
  //         coordinates: [6.4358, 3.4447],
  //       },
  //     },
  //   ],
  // };

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
            {isBackupMap ? (
              <>
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
                    </Marker>
                  ))}
                </MapContainer>

                <Button
                  className={MapStyles.working}
                  title="Locate"
                  color="primary"
                  onPress={() =>
                    dispatch(
                      setBackupMapData({
                        type: "Feature",
                        properties: {
                          NAME: "New Place",
                        },
                        geometry: {
                          type: "Point",
                          coordinates: [6.6291, 3.4238],
                        },
                      })
                    )
                  }
                />
              </>
            ) : (
              <div className={MapStyles.map_error}>
                <div className={MapStyles.map_error_wrapper}>
                  <div className={MapStyles.map_error_wrapper_content}>
                    <h1
                      className={MapStyles.map_error_wrapper_content_headtext}
                    >
                      Oops!! GeoJSON data is empty.
                    </h1>

                    <p className={MapStyles.map_error_wrapper_content_subtext}>
                      You can click the button below to play around and add
                      markers to the map or close the modal to try again.
                    </p>

                    <div className={MapStyles.map_error_wrapper_content_button}>
                      <Button
                        className={
                          MapStyles.map_error_wrapper_content_button_item
                        }
                        title="Locate"
                        color="primary"
                        onPress={() => setIsBackupMap(!isBackupMap)}
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
