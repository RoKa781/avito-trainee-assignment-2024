import styles from './Button.module.css';
import cn from 'classnames';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string,
}

const Button: React.FC<ButtonProps> = ({
  type = 'button', 
  disabled = false,
  onClick,
  children,
  className,
}) => {
  return (
    <button
      className={cn(styles.button, className)}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;