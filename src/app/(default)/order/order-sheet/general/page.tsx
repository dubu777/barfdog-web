import * as styles from "../../Order.css";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GeneralOrderContainer from "@/components/pages/order/generalOrderContainer/GeneralOrderContainer";
import { usePersistOrderStore } from "@/store/usePersistOrderStore";

interface GeneralPageProps {

}

export default async function GeneralPage({
}: GeneralPageProps) {

  return (
    <div className={styles.orderPageContainer}>
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          {/* 로딩 컴포넌트 개발 예정 */}
          <Suspense fallback={<div>Loading...</div>}>
            <GeneralOrderContainer />
          </Suspense>
        </ErrorBoundary>
    </div>
  );
}
