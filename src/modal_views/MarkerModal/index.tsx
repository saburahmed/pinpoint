import { FC } from "react";
import * as Yup from "yup";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useFormik } from "formik";
import {
  setBackupMapData,
  setIsMapEvent,
  setIsMapModal,
} from "../../features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import MarkerModalStyles from "./MarkerModal.module.scss";

type markerModalProps = {
  showMarkerModal: boolean;
  onCloseMarkerModal: () => void;
};

const MarkerModal: FC<markerModalProps> = ({
  showMarkerModal,
  onCloseMarkerModal,
}) => {
  const dispatch = useAppDispatch();
  const markerCoordinatesSelector = useAppSelector(
    (state) => state?.map?.markerCoordinates
  );

  const inputValidationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
  });

  const formik = useFormik({
    validationSchema: inputValidationSchema,
    initialValues: {
      name: "",
    },
    onSubmit: async (values) => {
      dispatch(
        setBackupMapData({
          type: "Feature",
          properties: {
            NAME: values.name,
          },
          geometry: {
            type: "Point",
            coordinates: markerCoordinatesSelector,
          },
        })
      );
      dispatch(setIsMapEvent(false));
      dispatch(setIsMapModal(true));
    },
  });

  return (
    <Modal onClose={onCloseMarkerModal} show={showMarkerModal}>
      <div className={MarkerModalStyles.marker}>
        <div className={MarkerModalStyles.marker_content}>
          <div className={MarkerModalStyles.marker_content_children}>
            <div className={MarkerModalStyles.marker_content_children_logo}>
              .Pinpoint.
            </div>
            <p className={MarkerModalStyles.marker_content_children_subtext}>
              Tell us the name of this location
            </p>
            <form
              onSubmit={formik.handleSubmit}
              className={MarkerModalStyles.markercontent_children_form}
            >
              <Input
                type="text"
                name="name"
                placeholder="Location name, eg. Apple Campus"
                value={formik.values.name}
                containerClass={
                  MarkerModalStyles.marker_content_children_form_input
                }
                onChange={formik.handleChange}
                error={formik.submitCount > 0 && formik.errors.name}
                autoComplete="off"
              />

              <Button
                className={MarkerModalStyles.marker_content_children_form_btn}
                title="Pinpoint"
                type="submit"
                isLoading={formik.isSubmitting}
                disabled={formik.isSubmitting}
              />
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MarkerModal;
