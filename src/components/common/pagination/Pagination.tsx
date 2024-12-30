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

  const generatePageNumbers = () => {
    const range: (number | string)[] = [];
    const maxVisibleButtons = 5; // 최대 표시할 버튼 수

    if (totalPages <= maxVisibleButtons + 2) {
      // 전체 페이지가 적을 경우 모든 페이지를 표시
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // 많은 페이지일 경우
      if (currentPage <= 3) {
        // 현재 페이지가 앞부분일 때
        range.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        // 현재 페이지가 뒷부분일 때
        range.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // 현재 페이지가 중간일 때
        range.push(1, "...", currentPage, currentPage + 1, currentPage + 2, "...", totalPages);
      }
    }

    return range;
  };

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
        {generatePageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && handlePageChange(page-1)}
            disabled={page === "..."}
            className={styles.numberButton({ active: page === currentPage + 1 }) || ''}
          >
            {page}
          </button>
        ))}
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