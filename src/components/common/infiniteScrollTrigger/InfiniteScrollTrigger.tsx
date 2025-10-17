import { forwardRef, useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import { commonWrapper } from "@/styles/common.css";

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
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (hasNextPage && isFetchingNextPage) {
      // 로딩 시작
      setShowSpinner(true);
      setStartTime(Date.now());
    } else if (!isFetchingNextPage && showSpinner) {
      // 로딩 완료 - 최소 표시 시간 확인
      const elapsedTime = startTime ? Date.now() - startTime : 0;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
      
      timer = setTimeout(() => {
        setShowSpinner(false);
        setStartTime(null);
      }, remainingTime);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [hasNextPage, isFetchingNextPage, minDisplayTime, showSpinner, startTime]);

  return (
    <div 
      ref={ref} 
      style={{ minHeight: 50 }}
      className={commonWrapper({ 
        justify: 'center', 
        align: 'center',
      })}
    >
      {showSpinner && 
        <Spinner />
      }
    </div>
  );
});

InfiniteScrollTrigger.displayName = 'InfiniteScrollTrigger';

export default InfiniteScrollTrigger;