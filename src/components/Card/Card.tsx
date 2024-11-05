import React from "react";
import styles from "./Card.module.scss";
import { MdDeleteOutline, MdOutlineEditNote } from "react-icons/md";
import Button from "../Button/Button";
import ColorSelect from "../ColorSelect/ColorSelect";

interface CardProps {
  image?: string;
  code?: string;
  description?: string;
  label?: string;
  price?: string | number;
  unit?: string;
  color?: string; 
  onEdit: () => void;
  onDelete: () => void;
  btnStyle?: string; 
  isCardModeCategory?: boolean;
  isVariationMode?: boolean;
  highlightType?: "add" | "edit" | "delete";
}

const CardProduct: React.FC<CardProps> = ({
  image,
  code,
  description,
  label,
  unit,
  price,
  color,
  onEdit,
  onDelete,
  isCardModeCategory = false,
  isVariationMode = false,
  highlightType,
}) => {

 
  const highlightClass = highlightType ? styles[`highlight-${highlightType}`] : "";
  const cardClass = `${styles.card_container} ${highlightClass}`;
  

  const renderButtonsAction = () => (
    <div className={styles.actions}>
      <Button
        btnStyle="icon_edit"
        icon={<MdOutlineEditNote />}
        onClick={onEdit}
        aria-label="Editar produto"
      />
      <Button
        btnStyle="icon_remove"
        icon={<MdDeleteOutline />}
        onClick={onDelete}
        aria-label="Excluir produto"
      />
    </div>
  );

  const renderCardModeProduct = () => (
    <div className={[styles.card_container_product, styles.card_box].join(" ")}>
      {image && <img src={image} alt={description} />}
      <p>{code || 'N/A'}</p>
      <p>{description || 'N/A'}</p>
      <p>{label || 'N/A'}</p>
      {renderButtonsAction()}
    </div>
  );

  const renderCardModeCategory = () => (
    <div className={[styles.card_container_category, styles.card_box].join(" ")}>
      <p>{code || 'N/A'}</p>
      <p>{label || 'N/A'}</p>
      <ColorSelect initialColor={color}/>
      {renderButtonsAction()}
    </div>
  );

  const renderCardModeVariations = () => (
    <div className={[styles.card_container_variations, styles.card_box].join(" ")}>
      <p className={styles.code}>{code || 'N/A'}</p>
      <p>{description || 'N/A'}</p>
      <p>{price || 'N/A'}</p>
      <p>{unit || 'N/A'}</p>
      {renderButtonsAction()}
    </div>
  );

  return (
    <div className={[cardClass].join(" ")}>
      {isVariationMode
        ? renderCardModeVariations()
        : isCardModeCategory
        ? renderCardModeCategory()
        : renderCardModeProduct()}
    </div>
  );
};

export default CardProduct;
