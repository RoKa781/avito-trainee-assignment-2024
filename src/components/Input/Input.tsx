import styles from './Input.module.css';

interface InputProps {
    type?: 'text' | 'number' | 'date' | 'url';
    value?: string | number;
    name: string;
    label: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    inputStyles?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void | Promise <void>
  }
  
const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  name,
  label,
  onChange,
  handleBlur,
  required = false,
  disabled = false,
  placeholder,
  onKeyDown,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        id={name}
        name={name}
        onChange={onChange}
        onBlur={handleBlur}
        className={styles.input}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
  
export default Input;