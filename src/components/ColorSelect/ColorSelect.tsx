// components/ColorSelect.tsx
import { useState, useEffect } from "react";
import styles from "./ColorSelect.module.scss";

interface ColorSelectProps {
  initialColor?: string;
  onColorChange?: (color: string) => void;
  isEdit?: boolean; // Controla o modo (edição ou leitura)
}

const ColorSelect: React.FC<ColorSelectProps> = ({
  initialColor = "#7a7a7a",
  onColorChange,
  isEdit,
}) => {
  const [color, setColor] = useState<string>(initialColor);

  useEffect(() => {
    setColor(initialColor); // Atualiza a cor se a prop inicial mudar
  }, [initialColor]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedColor = e.target.value;
    setColor(selectedColor);
    if (onColorChange) onColorChange(selectedColor);
  };

  return (
    <div className={styles.container}>
      {isEdit ? (
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className={styles.colorInput}
        />
      ) : (
        <div className={styles.colorDisplay}>
          <div
            className={styles.colorCircle}
            style={{ backgroundColor: color }}
          />
        </div>
      )}
    </div>
  );
};

export default ColorSelect;
