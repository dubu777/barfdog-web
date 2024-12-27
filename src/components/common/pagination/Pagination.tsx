import * as styles from './Pagination.css';

import Arrow from '/public/images/icons/pagination-arrow.svg';
import DoubleArrow from '/public/images/icons/pagination-double-arrow.svg';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  const handlePageChange = (page: number) => {
    if (page >= 0 && page <= totalPages) {
      onPageChange(page);
    }
  }

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        onClick={() => handlePageChange(index)}
        className={styles.numberButton({ active: index === currentPage }) || ''}
      >
        {index + 1}
      </button>
    ))
  }
  return (
    totalPages !== 0 &&
      <div className={styles.paginationContainer}>
        <button
          onClick={() => handlePageChange(0)}
          disabled={isFirstPage}
          className={styles.numberButton({})}
        >
          <DoubleArrow />
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={isFirstPage}
          className={styles.numberButton({ type: 'prev' })}
        >
          <Arrow />
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isLastPage}
          className={styles.numberButton({ type: 'next' })}
        >
          <Arrow />
        </button>
        <button
          onClick={() => handlePageChange(totalPages - 1)}
          disabled={isLastPage}
          className={styles.numberButton({ type: 'last' })}
        >
          <DoubleArrow />
        </button>
      </div>
  );
};

export default Pagination;