import * as styles from './Pagination.css';
import Arrow from '/public/images/icons/chevron-left-blue.svg';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import DefaultText from "@/components/common/defaultText/DefaultText";
import useDeviceState from "@/hooks/useDeviceState";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const { isMobileDevice } = useDeviceState();

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  const handlePageChange = (page: number) => {
    if (page >= 0 && page <= totalPages) {
      onPageChange(page);
    }
  }

  const generatePageNumbers = () => {
    const range: (number | string)[] = [];
    const firstPage = 1;
    const lastPage = totalPages;

    const pushRange = (start: number, end: number) => {
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
    };

    if (totalPages <= 5) {
      // 5페이지 이하인 경우 전부 출력
      pushRange(1, totalPages);
      return range;
    }

    // 5페이지 이상의 경우 기본값 1 추가
    range.push(firstPage);

    // 6, 7페이지의 경우
    if (totalPages <= 7) {
      if (currentPage < 2) {
        range.push(2, 3, '...', lastPage);
      } else if (currentPage === 2) {
        if (totalPages < 7) pushRange(2, totalPages);
          else range.push(2, 3, 4, '...', lastPage);

      } else if (currentPage > 2 && currentPage < lastPage - 3) {
        pushRange(2, totalPages);
      } else if (currentPage === lastPage - 3) {
        if (totalPages < 7) {
          pushRange(2, totalPages);
        } else {
          range.push('...', lastPage - 3, lastPage - 2, lastPage - 1, lastPage);
        }
      } else {
        range.push('...', lastPage - 2, lastPage - 1, lastPage);
      }
      return Array.from(new Set(range));
    }

    // 7페이지 이상의 경우
    if (currentPage < 2) {
      range.push(2, 3, '...', totalPages);
    } else if (currentPage === 2) {
      range.push(2, 3, 4, '...', totalPages);
    } else if (currentPage > 2 && currentPage < totalPages - 3) {
      range.push('...', currentPage, currentPage + 1, currentPage + 2, '...', totalPages);
    } else if (currentPage === totalPages - 3) {
      range.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      range.push('...', totalPages - 2, totalPages - 1, totalPages);
    }

    return range;
  };

  const PrevButtonComponent = () => (
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={isFirstPage}
      className={styles.numberButton({})}
    >
      <SvgIcon src={Arrow} color={isFirstPage ? 'gray300' : 'gray900'} />
    </button>
  )
  const NextButtonComponent = () => (
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={isLastPage}
      className={styles.numberButton({ type: 'next' })}
    >
      <SvgIcon src={Arrow} color={isLastPage ? 'gray300' : 'gray900'} />
    </button>
  )
  return (
    totalPages !== 0 &&
    <div className={styles.paginationContainer({ isMobileDevice })}>
      <PrevButtonComponent />
      {!isMobileDevice ?
        generatePageNumbers().map((page, index) => {
          const isActive = page === currentPage + 1;
          const isDisabled = page === "...";
          return (
            <button
              key={index}
              onClick={() => typeof page === "number" && handlePageChange(page-1)}
              disabled={isDisabled}
              className={styles.numberButton({ active: isActive }) || ''}
            >
              <DefaultText type='label1' color={isActive ? 'white' : isDisabled ? 'gray300' : 'gray800'}>{page}</DefaultText>
            </button>
          )
        })
        : (
          <div>
            <DefaultText type='label3' color='gray800'>{currentPage + 1}</DefaultText>&nbsp;/&nbsp;
            <DefaultText type='label3' color={currentPage + 1 === totalPages ? 'gray800' : 'gray600'}>{totalPages}</DefaultText>
          </div>
        )
      }
      <NextButtonComponent />
    </div>
  );
};

export default Pagination;