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
}) => {
  return (
    <div className={[styles["select_container"], styles[selectStyles], className].join(" ")}>
      {icon && <div className={styles.icon}>{icon}</div>}
      {label && <label>{label}</label>}
      <div className={styles.select}>
        <select
          value={value}
          name={name}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
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
    </div>
  );
};

export default Select;
