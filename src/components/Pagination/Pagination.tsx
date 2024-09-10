import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageButton}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Назад
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`${styles.pageButton} ${currentPage === index + 1 ? styles.active : ''}`}
          onClick={() => handleClick(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className={styles.pageButton}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Вперед
      </button>
    </div>
  );
};

export default Pagination;
