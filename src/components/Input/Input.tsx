import styles from "./Input.module.scss";
import React, { InputHTMLAttributes, forwardRef, CSSProperties } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, width, height, style, ...props }, ref) => {

    const inlineStyles: CSSProperties = {
      width,
      height,
      ...style,
    };

    return (
      <div className={[styles["input_container"], styles["primary"], className].join(" ")} style={inlineStyles}>
        {label && <label>{label}</label>}
        <input ref={ref}  {...props} />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
