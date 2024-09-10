import { useEffect, useState } from 'react';
import styles from './ErrorNotification.module.css';

interface ErrorNotificationProps {
  message: string;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return visible ? (
    <div className={styles.notification}>
      <p>{message}</p>
    </div>
  ) : null;
};

export default ErrorNotification;
