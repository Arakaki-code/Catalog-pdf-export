import { useState, useEffect } from "react";
import styles from "./ColorSelect.module.scss";
import Input from "../Input/Input";

interface ColorSelectProps {
  initialColor?: string | undefined;
  onColorChange?: (color: string) => void;
  isEdit?: boolean;
  error?: string;
}

const ColorSelect: React.FC<ColorSelectProps> = ({
  initialColor = "#7a7a7a",
  onColorChange,
  isEdit,
  error,
}) => {
  const [color, setColor] = useState<string>(initialColor);

  const isValidColor = (value: string) => /^#[0-9A-F]{6}$/i.test(value);

  useEffect(() => {
    setColor(isValidColor(initialColor) ? initialColor : "#ffffff");
  }, [initialColor]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedColor = e.target.value;
    setColor(selectedColor);
    if (isValidColor(selectedColor)) {
      setColor(selectedColor);
      if (onColorChange) onColorChange(selectedColor);
    }
  };

  return (
    <div className={styles.container}>
      {isEdit ? (
        <>
          <Input
            type={"color"}
            name="color"
            label="Cor"
            value={color}
            onChange={handleColorChange}
            placeholder="Cor"
            stylesInput={"color_input"}
            className={error ? styles.error : ""}
          />
        {error && <span className={styles.error_message}>{error}</span>}
        </>
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
