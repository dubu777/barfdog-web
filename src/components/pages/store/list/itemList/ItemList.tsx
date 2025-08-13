'use client';
import * as styles from './ItemList.css';
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Pagination from "@/components/common/pagination/Pagination";
import StoreItem from "@/components/pages/store/list/Item/Item";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { usePagination } from "@/hooks/usePagination";
import { ItemType, SortByType } from "@/types";
import { prefetchGetStoreItemList, useGetStoreItemList } from "@/api/store/queries/useGetStoreItemList";
// import useDeviceState from "@/hooks/useDeviceState";
// import { useGetInfiniteStoreItemList } from "@/api/store/queries/useGetInfiniteStoreItemList";
// import { useInView } from "react-intersection-observer";
// import { infiniteTrigger } from "@/styles/common.css";

export default function ItemList() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  // const { isMobileDevice } = useDeviceState();

  const sortBy = (searchParams.get('sortBy') as SortByType) || 'recent';
  const itemType = (searchParams.get('itemType') as ItemType) || 'ALL';

  const { pushWithQuery } = useDynamicQueryPush();

  // 데스크탑 페이지네이션
  const { currentPage, totalPages, setPaginationData, onPageChange } = usePagination({
    prefetchFn: (page: number) => prefetchGetStoreItemList(queryClient, page, sortBy, itemType),
    pushWithQuery,
    preserveScroll: false,
  })

  const paginationProps = useMemo(() => ({
    currentPage, totalPages, onPageChange
  }), [currentPage, totalPages, onPageChange]);

  const { data: pageData } = useGetStoreItemList(currentPage, sortBy, itemType);
  const desktopItemList = pageData?.itemList ?? [];


  useEffect(() => {
    if (pageData?.page) {
      setPaginationData(pageData.page)
    }
  }, [pageData?.page, setPaginationData]);

  // // 모바일 무한 스크롤
  // const {
  //   data: infiniteData,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage
  // } = useGetInfiniteStoreItemList(sortBy, itemType);
  //
  // const mobileItemList = infiniteData?.pages?.flatMap((page) => page.itemList) ?? [];
  //
  // const { ref: sentinelRef, inView } = useInView({
  //   threshold: 0.5,
  //   triggerOnce: false,
  // })
  //
  // useEffect(() => {
  //   if (!isMobileDevice || !hasNextPage) return;
  //
  //   if (isMobileDevice && inView && hasNextPage && !isFetchingNextPage) {
  //     fetchNextPage();
  //   }
  //
  // }, [isMobileDevice, inView, isFetchingNextPage, hasNextPage, fetchNextPage])
  return (
    <>
      <article className={styles.storeItemListContainer}>
        <ul className={styles.storeItemList}>
          {/*{(isMobileDevice ? mobileItemList : desktopItemList).map(item => (*/}
          {(desktopItemList).map(item => (
            <StoreItem key={item.id} item={item} />
          ))}
        </ul>
      </article>
      {/*{isMobileDevice ? (*/}
      {/*  <div ref={sentinelRef} className={infiniteTrigger} />*/}
      {/*) : (*/}
      {/*  <Pagination {...paginationProps} />*/}
      {/*)}*/}
      <Pagination {...paginationProps} />
    </>
  );
};