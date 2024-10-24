import React from "react";
import styles from "./Button.module.scss";


interface ButtonProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  width?: string;
  btnStyle?: string;
  styles?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean
}
const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  icon,
  className,
  disabled = false,
  btnStyle = "primary",
}) => {
  return (
    <button
      type={"button"}
      className={[styles["button"], styles[btnStyle], className].join(" ")}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      {children}
    </button>
  );
};

export default Button;
