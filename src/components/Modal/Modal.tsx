import { IoClose } from "react-icons/io5";
import Button from "../Button/Button";
import styles from "./Modal.module.scss";
import DivisorLine from "../DivisorLine/DivisorLine";

interface ModalProps {
  children?: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <h2>Adicionar produto</h2>
          <Button
            btnStyle={"icon_close"}
            icon={<IoClose />}
            onClick={onClose}
          />
        </div>
        <DivisorLine />
        <div className={styles.modal_body}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
