import styles from "./Select.module.scss";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: Option[];
  value?: string | number;
  label?: string;
  className?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  icon?: React.ReactNode;
  selectStyles?: string;
  error?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  label,
  name,
  className,
  onChange,
  placeholder = "Selecione uma opção",
  disabled = false,
  icon,
  selectStyles = "primary",
  error,
}) => {
  return (
    <div className={[styles["select_container"], styles[selectStyles], className].join(" ")}>
      {icon && <div className={styles.icon}>{icon}</div>}
      {label && <label>{label}</label>}
      <div className={[styles["select"], error ? styles["error"] : ""].join(" ")}>
        <select
          value={value}
          name={name}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={error ? styles["select_error"] : ""}
        >
          <option className={styles.option} value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <span className={styles.error_message}>{error}</span>}
    </div>
  );
};

export default Select;
