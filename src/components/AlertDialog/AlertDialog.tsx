import React from 'react';
import styles from './AlertDialog.module.scss';

interface AlertDialogProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null; // Não renderiza nada se não estiver aberto

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2>Confirmação</h2>
        <p>{message}</p>
        <div className={styles.buttons}>
          <button onClick={onConfirm} className={styles.confirmButton}>Confirmar</button>
          <button onClick={onCancel} className={styles.cancelButton}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
