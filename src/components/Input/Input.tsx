import styles from "./Input.module.scss";
import React, { InputHTMLAttributes, forwardRef, CSSProperties } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  error?: string;
  stylesInput?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, width, height, style, error, stylesInput = "primary", ...props }, ref) => {
    const inlineStyles: CSSProperties = {
      width,
      height,
      ...style,
    };

    

    return (
      <div
        className={[
          styles["input_container"],
          styles[`${stylesInput}`],
          error ? styles["error"] : "",
          className,
        ].join(" ")}
        style={inlineStyles}
      >
        {label && <label>{label}</label>}
        <input ref={ref} {...props} />
        {error && <span className={styles.error_message}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
