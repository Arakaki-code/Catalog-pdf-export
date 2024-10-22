import { IoClose } from "react-icons/io5";
import Button from "../Button/Button";
import styles from "./Modal.module.scss";
import DivisorLine from "../DivisorLine/DivisorLine";

interface ModalProps {
  children?: React.ReactNode;
  onClose: () => void;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, title }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <h2>{title}</h2>
          <Button
            btnStyle={"icon_close"}
            icon={<IoClose />}
            onClick={onClose}
          />
        </div>
        <div className={styles.modal_body}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
