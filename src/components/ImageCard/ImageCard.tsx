import Button from "../Button/Button";
import styles from "./ImageCard.module.scss"
import React, { ChangeEvent, useRef } from "react";

interface ImageCardProps {
  src?: string;
  className?: string;
  onRemove: () => void;
  onChange: (image: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, onRemove, onChange, className }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onChange(imageUrl);
    }
  };

  const triggerFileSelect = () => {
    inputRef.current?.click();
  };

  return (
    <div className={[styles["image-card"], className].join(" ") }>
      {src ? (
        <>
          <img 
            src={src} 
            alt="Imagem do produto" 
          />
          
          <Button
            onClick={onRemove}
            btnStyle={"secondary"}
            className={styles.btn_remove}
          >
            Remover imagem
          </Button>
        </>
      ) : (
        <div>
          <img 
            src="./img-product.png" 
            alt="Imagem do produto padrão" 
          />
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <Button 
            onClick={triggerFileSelect}
            btnStyle={"secondary"}
          >
            Selecionar Imagem
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
