// components/ProductForm/ProductFormButtons.tsx
import React from "react";
import Button from "../Button/Button";
import { GiSaveArrow } from "react-icons/gi";
import styles from "./ProductFormButtons.module.scss";

interface ProductFormButtonsProps {
  addVariation: () => void;
  handleSubmit: (e?: React.FormEvent) => void;
  isSaveButtonDisabled: boolean;
  submitButtonLabel: string;
}

const ProductFormButtons: React.FC<ProductFormButtonsProps> = ({
  addVariation,
  handleSubmit,
  isSaveButtonDisabled,
  submitButtonLabel,
}) => {
  return (
    <div className={styles.buttons_form}>
      <Button
        icon={<GiSaveArrow />}
        btnStyle={"primary"}
        onClick={addVariation}
      >
        Adicionar Variação do Produto
      </Button>
      <Button
        btnStyle={"primary"}
        disabled={isSaveButtonDisabled}
        onClick={handleSubmit}
      >
        {submitButtonLabel}
      </Button>
    </div>
  );
};

export default ProductFormButtons;
