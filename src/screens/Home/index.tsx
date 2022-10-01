import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import osmtogeojson from "osmtogeojson";
import useToast from "../../util/useToast";
import Input from "../../components/Input";
import Button from "../../components/Button";
import MapModal from "../../modal_views/MapModal";
import HomeStyles from "./Home.module.scss";

const Home = () => {
  const Toast = useToast();
  const client = axios.create({
    baseURL: `https://www.openstreetmap.org/api/0.6/map`,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

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
            const data = response.data;
            if (data) {
              console.log(data, "data");
              setLoading(false);
              const geoJSON = osmtogeojson(data);
              console.log(geoJSON, "geojson");
              setShowModal(true);
            }
          });
      } catch (error: any) {
        Toast.error(error?.response?.data || error.message);
        setLoading(false);
      }
    },
  });

  const renderModal = () => {
    const mapModal = (
      <MapModal
        showMapModal={showModal}
        onCloseMapModal={() => setShowModal(false)}
        onClickAwayMapModal={() => setShowModal(false)}
      />
    );

    return mapModal;
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
              placeholder="Minimum Longitude"
              value={formik.values.left}
              containerClass={HomeStyles.home_content_children_form_input}
              onChange={formik.handleChange}
              error={formik.submitCount > 0 && formik.errors.left}
              autoComplete="off"
            />

            <Input
              type="text"
              name="bottom"
              placeholder="Minimum Latitude"
              value={formik.values.bottom}
              containerClass={HomeStyles.home_content_children_form_input}
              onChange={formik.handleChange}
              error={formik.submitCount > 0 && formik.errors.bottom}
              autoComplete="off"
            />
            <Input
              type="text"
              name="right"
              placeholder="Maximum Longitude"
              value={formik.values.right}
              containerClass={HomeStyles.home_content_children_form_input}
              onChange={formik.handleChange}
              error={formik.submitCount > 0 && formik.errors.right}
              autoComplete="off"
            />
            <Input
              type="text"
              name="top"
              placeholder="Maximum Latitude"
              value={formik.values.top}
              containerClass={HomeStyles.home_content_children_form_input}
              onChange={formik.handleChange}
              error={formik.submitCount > 0 && formik.errors.top}
              autoComplete="off"
            />
            <Button
              className={HomeStyles.home_content_children_form_btn}
              title="Locate"
              color="primary"
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
