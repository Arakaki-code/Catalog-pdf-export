import React from "react";
import styles from "./Button.module.scss";


interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  width?: string;
  btnStyle?: string;
  styles?: string;
  className?: string;
}
const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  icon,
  className,
  btnStyle = "primary",
}) => {
  return (
    <button
      className={[styles["button"], styles[btnStyle], className].join(" ")}
      onClick={onClick}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      {children}
    </button>
  );
};

export default Button;
