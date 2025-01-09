import * as styles from './Store.css';
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import StoreItemList from "@/components/pages/store/storeItemList/StoreItemList";
import StoreFilter from "@/components/pages/store/storeFilter/StoreFilter";

const Store = () => {
  return (
    <section className={styles.storeContainer}>
      <StoreFilter />
      <ErrorBoundary fallback={<div>상품이 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <StoreItemList />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};

export default Store;