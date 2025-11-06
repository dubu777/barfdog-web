'use client';
import { commonWrapper } from '@/styles/common.css';
import { Fragment } from "react";
import { useSearchParams } from "next/navigation";    
import StoreItem from "@/components/pages/store/list/Item/Item";
import InfiniteScrollTrigger from "@/components/ui/infiniteScrollTrigger/InfiniteScrollTrigger";
import { ItemType, SortByType } from "@/types";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useFlattenedInfiniteData } from '@/hooks/useFlattenedInfiniteData';
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
  const itemList = useFlattenedInfiniteData(infiniteData, 'itemList');

  const ref = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  return (
    <article className={commonWrapper({ padding: 20, direction: 'col' })}>
      <div className={commonWrapper({
        wrap: 'wrap',
        gap: '32/8',
        align: 'start',
      })}>
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