import React, { FC } from "react";
import { ReactComponent as ModalCloseIcon } from "../../assets/images/modal-close-icon.svg";
import ModalStyles from "./Modal.module.scss";

interface IModal extends React.HTMLProps<HTMLDivElement> {
  show?: boolean;
  onClose: () => void;
}

const Modal: FC<IModal> = ({ children, show, onClose }) => {
  if (!show) return <></>;

  return (
    <div className={ModalStyles.modal}>
      <div className={ModalStyles.modal_content}>
        <div className={ModalStyles.modal_content_closeicon}>
          <ModalCloseIcon
            className={ModalStyles.modal_content_closeicon_item}
            onClick={() => onClose()}
          />
        </div>
        <div className={ModalStyles.modal_content_item}>
          <div className={ModalStyles.modal_content_item_children}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
