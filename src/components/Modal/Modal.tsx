import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-content']}>
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

