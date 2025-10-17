import { forwardRef, useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";

interface InfiniteScrollTriggerProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  minDisplayTime?: number; 
}

const InfiniteScrollTrigger = forwardRef<HTMLDivElement, InfiniteScrollTriggerProps>(({
  hasNextPage = false,
  isFetchingNextPage = false,
  minDisplayTime = 500,
}, ref) => {
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (hasNextPage && isFetchingNextPage) {
      setShowSpinner(true);

      // 최소 표시 시간 후에만 hide
    } else if (!isFetchingNextPage && showSpinner) {
      timer = setTimeout(() => {
        setShowSpinner(false);
      }, minDisplayTime);
    } else if (!isFetchingNextPage) {
      // 이미 최소 시간 동안 표시됐는지 체크
      timer = setTimeout(() => setShowSpinner(false), minDisplayTime);
    }

    return () => clearTimeout(timer);
  }, [hasNextPage, isFetchingNextPage, minDisplayTime]);

  return (
    <div ref={ref}>
      {showSpinner && 
        <Spinner />
      }
    </div>
  );
});

InfiniteScrollTrigger.displayName = 'InfiniteScrollTrigger';

export default InfiniteScrollTrigger;