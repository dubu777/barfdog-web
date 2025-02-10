import * as styles from './StoreList.css';
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ItemList from "@/components/pages/store/storeList/itemList/ItemList";
import ItemFilter from "@/components/pages/store/storeList/itemFilter/ItemFilter";

const StoreList = () => {
  return (
    <section className={styles.storeContainer}>
      <ItemFilter />
      <ErrorBoundary fallback={<div>상품이 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ItemList />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};

export default StoreList;