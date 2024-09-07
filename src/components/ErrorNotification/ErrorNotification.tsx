import { useEffect, useState } from 'react';
import styles from './ErrorNotification.module.css';

interface ErrorNotificationProps {
  message: string;
  onClose: () => void;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    visible ? (
      <div className={styles.notification}>
        <p>{message}</p>
      </div>
    ) : null
  );
};

export default ErrorNotification;
