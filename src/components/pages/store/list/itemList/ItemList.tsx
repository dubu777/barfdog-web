'use client';
import * as styles from './ItemList.css';
import { Fragment, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import StoreItem from "@/components/pages/store/list/Item/Item";
import InfiniteScrollTrigger from "@/components/common/infiniteScrollTrigger/InfiniteScrollTrigger";
import { ItemType, SortByType } from "@/types";
import { useGetInfiniteStoreItemList } from "@/api/store/queries/useGetInfiniteStoreItemList";

export default function ItemList() {
  const searchParams = useSearchParams();

  const sortBy = (searchParams.get('sortBy') as SortByType) || 'recent';
  const itemType = (searchParams.get('itemType') as ItemType) || 'ALL';

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetInfiniteStoreItemList(sortBy, itemType);
  const itemList = infiniteData?.pages?.flatMap((page) => page.itemList) ?? [];

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage])

  return (
    <article className={styles.storeItemListContainer}>
      <div className={styles.storeItemList}>
        {itemList.map(item => (
          <Fragment key={item.id}>
            <StoreItem item={item} />
          </Fragment>
        ))}
      </div>
      {itemList.length > 0 && (
        <InfiniteScrollTrigger
          ref={ref}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </article>
  );
};