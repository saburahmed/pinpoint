import { FC } from "react";
import Modal from "../../components/Modal";
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
  return (
    <Modal
      onClickAway={onClickAwayMapModal}
      onClose={onCloseMapModal}
      show={showMapModal}
      className={MapStyles.map}
    >
      MapModal
    </Modal>
  );
};

export default MapModal;
