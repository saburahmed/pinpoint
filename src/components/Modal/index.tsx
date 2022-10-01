import React, { FC } from "react";
import ClickAwayListener from "react-click-away-listener";
import { ReactComponent as ModalCloseIcon } from "../../assets/images/modal-close-icon.svg";
import ModalStyles from "./Modal.module.scss";

interface IModal extends React.HTMLProps<HTMLDivElement> {
  show?: boolean;
  className: string;
  childrenClass?: string;
  onClose: () => void;
  onClickAway: () => void;
}

const Modal: FC<IModal> = ({
  children,
  show = true,
  onClose,
  onClickAway,
  className,
  childrenClass,
}) => {
  if (!show) return <></>;

  return (
    <div className={`${ModalStyles.modal} ${className}`}>
      <div className={ModalStyles.modal_content}>
        <div className={ModalStyles.modal_content_closeicon}>
          <ModalCloseIcon
            className={ModalStyles.modal_content_closeicon_item}
            onClick={() => onClose()}
          />
        </div>
        <div
          className={`${ModalStyles.modal_content_children} ${childrenClass}`}
        >
          <ClickAwayListener
            className={ModalStyles.modal_content}
            onClickAway={() => onClickAway()}
          >
            <div>{children}</div>
          </ClickAwayListener>
        </div>
      </div>
    </div>
  );
};

export default Modal;
