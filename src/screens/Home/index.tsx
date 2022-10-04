import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import osmtogeojson from "osmtogeojson";
import {
  setGeoJSONData,
  setIsMapModal,
  setIsMapEvent,
  setIsBackupMap,
} from "../../features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useToast from "../../util/useToast";
import Input from "../../components/Input";
import Button from "../../components/Button";
import MapModal from "../../modal_views/MapModal";
import HomeStyles from "./Home.module.scss";
import MarkerModal from "../../modal_views/MarkerModal";

const Home = () => {
  const dispatch = useAppDispatch();
  const isMapModalSelector = useAppSelector((state) => state.map.isMapModal);
  const isMarkerModalSelector = useAppSelector((state) => state.map.isMapEvent);

  const Toast = useToast();
  // I decided not to create an axios hook since I'm not calling endpoint anywhere else, this is to reduce ambiguity.
  const client = axios.create({
    baseURL: `https://www.openstreetmap.org/api/0.6/map`,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const inputValidationSchema = Yup.object().shape({
    top: Yup.string().required("Required"),
    bottom: Yup.string().required("Required"),
    left: Yup.string().required("Required"),
    right: Yup.string().required("Required"),
  });

  const formik = useFormik({
    validationSchema: inputValidationSchema,
    initialValues: {
      top: "",
      bottom: "",
      left: "",
      right: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await client
          .get(
            `?bbox=${values.left},${values.bottom},${values.right},${values.top}`
          )
          .then((response) => {
            const data = response?.data;
            if (data) {
              setLoading(false);
              const geoJSON = osmtogeojson(data);
              dispatch(setGeoJSONData(geoJSON));
              dispatch(setIsMapModal(true));
            }
          });
      } catch (error: any) {
        Toast.error(error?.response?.data || error?.message);
        setLoading(false);
      }
    },
  });

  const onCloseMarkerModal = () => {
    dispatch(setIsMapModal(true));
    dispatch(setIsMapEvent(false));
  };

  const onCloseMapModal = () => {
    dispatch(setIsMapModal(false));
    dispatch(setIsBackupMap(false));
  };

  const renderModal = () => {
    const mapModal = (
      <MapModal
        showMapModal={isMapModalSelector}
        onCloseMapModal={onCloseMapModal}
      />
    );

    const markerModal = (
      <MarkerModal
        showMarkerModal={isMarkerModalSelector}
        onCloseMarkerModal={onCloseMarkerModal}
      />
    );

    return isMapModalSelector && !isMarkerModalSelector
      ? mapModal
      : markerModal;
  };

  return (
    <div className={HomeStyles.home}>
      {renderModal()}
      <div className={HomeStyles.home_content}>
        <div className={HomeStyles.home_content_children}>
          <div className={HomeStyles.home_content_children_logo}>
            .Pinpoint.
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className={HomeStyles.home_content_children_form}
          >
            <Input
              type="text"
              name="left"
              placeholder="Minimum Longitude, eg. -0.4"
              value={formik.values.left}
              containerClass={HomeStyles.home_content_children_form_input}
              onChange={formik.handleChange}
              error={formik.submitCount > 0 && formik.errors.left}
              autoComplete="off"
            />

            <Input
              type="text"
              name="bottom"
              placeholder="Minimum Latitude, eg. 2.28"
              value={formik.values.bottom}
              containerClass={HomeStyles.home_content_children_form_input}
              onChange={formik.handleChange}
              error={formik.submitCount > 0 && formik.errors.bottom}
              autoComplete="off"
            />
            <Input
              type="text"
              name="right"
              placeholder="Maximum Longitude, eg. 0.1"
              value={formik.values.right}
              containerClass={HomeStyles.home_content_children_form_input}
              onChange={formik.handleChange}
              error={formik.submitCount > 0 && formik.errors.right}
              autoComplete="off"
            />
            <Input
              type="text"
              name="top"
              placeholder="Maximum Latitude, eg. 2.30"
              value={formik.values.top}
              containerClass={HomeStyles.home_content_children_form_input}
              onChange={formik.handleChange}
              error={formik.submitCount > 0 && formik.errors.top}
              autoComplete="off"
            />
            <Button
              className={HomeStyles.home_content_children_form_btn}
              title="Locate"
              type="submit"
              isLoading={loading}
              disabled={formik.isSubmitting}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
