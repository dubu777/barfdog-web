'use client';
import * as styles from './ItemList.css';
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Pagination from "@/components/common/pagination/Pagination";
import StoreItem from "@/components/pages/store/storeList/Item/Item";
import useDynamicQueryPush from "@/hooks/useDynamicQueryPush";
import { usePagination } from "@/hooks/usePagination";
import { ItemType, SortByType, StoreItemListData } from "@/types";
import { prefetchGetStoreItemList, useGetStoreItemList } from "@/api/store/queries/useGetStoreItemList";

const ItemList = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const sortBy = (searchParams.get('sortBy') as SortByType) || 'recent';
  const itemType = (searchParams.get('itemType') as ItemType) || 'ALL';

  const { pushWithQuery } = useDynamicQueryPush();
  const { currentPage, totalPages, setPaginationData, onPageChange } = usePagination({
    prefetchFn: (page: number) => prefetchGetStoreItemList(queryClient, page, sortBy, itemType),
    pushWithQuery,
  })

  const paginationProps = useMemo(() => ({
    currentPage, totalPages, onPageChange
  }), [currentPage, totalPages, onPageChange]);

  const { data } = useGetStoreItemList(currentPage, sortBy, itemType);
  const storeItemList: StoreItemListData[] = data.itemList;

  useEffect(() => {
    if (data.page) {
      setPaginationData(data.page)
    }
  }, [data.page, setPaginationData]);

  console.log('storeItemList', storeItemList)

  return (
    <article className={styles.storeItemListContainer}>
      <ul className={styles.storeItemList}>
        {storeItemList.map(item => (
          <StoreItem key={item.id} item={item} />
        ))}
      </ul>
      <Pagination {...paginationProps} />
    </article>
  );
};

export default ItemList;