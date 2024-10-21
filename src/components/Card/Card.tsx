import React from "react";
import styles from "./Card.module.scss";
import { MdDeleteOutline, MdOutlineEditNote } from "react-icons/md";
import Button from "../Button/Button";
import ColorSelect from "../ColorSelect/ColorSelect";

interface CardProps {
  image?: string;
  code?: string;
  description?: string;
  onEdit: () => void;
  onDelete: () => void;
  btnStyle?: string; // Se necessário para estilização
  category?: string;
  isCardModeCategory?: boolean;
}

const CardProduct: React.FC<CardProps> = ({
  image,
  code,
  description,
  category,
  onEdit,
  onDelete,
  isCardModeCategory = false,
}) => {
  const handleColorUpdate = (color: string) => {
    console.log("Cor selecionada:", color);
  };

  const renderButtonsAction = () => (
    <div className={styles.actions}>
      <Button
        btnStyle="icon_edit"
        icon={<MdOutlineEditNote />}
        onClick={onEdit}
        aria-label="Editar produto"
      />
      <Button
        btnStyle="icon_red"
        icon={<MdDeleteOutline />}
        onClick={onDelete}
        aria-label="Excluir produto"
      />
    </div>
  );

  const renderCardModeProduct = () => (
    <div className={styles.card_container_product}>
      {image && <img src={image} alt={description} />}
      <p>{code || 'N/A'}</p>
      <p>{description || 'N/A'}</p>
      <p>{category || 'N/A'}</p>
      {renderButtonsAction()}
    </div>
  );

  const renderCardModeCategory = () => (
    <div className={styles.card_container_category}>
      <p>{code || 'N/A'}</p>
      <p>{category || 'N/A'}</p>
      <ColorSelect onColorChange={handleColorUpdate} />
      {renderButtonsAction()}
    </div>
  );

  return (
    <div className={styles.card_container}>
      {isCardModeCategory ? renderCardModeCategory() : renderCardModeProduct()}
    </div>
  );
};

export default CardProduct;
