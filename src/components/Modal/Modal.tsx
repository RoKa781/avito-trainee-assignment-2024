import { useRef, useEffect } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-content']} ref={modalRef}>
        <header className={styles['modal-header']}>
          <h2>{title}</h2>
          <button className={styles['modal-close']} onClick={onClose}>&times;</button>
        </header>
        <main className={styles['modal-body']}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Modal;


