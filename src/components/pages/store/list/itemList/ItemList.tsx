"use client";
import { commonWrapper } from "@/styles/common.css";
import { useSearchParams } from "next/navigation";
import StoreItem from "@/components/pages/store/list/Item/Item";
import InfiniteScrollTrigger from "@/components/ui/infiniteScrollTrigger/InfiniteScrollTrigger";
import { ItemType, SortByType } from "@/types";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useFlattenedInfiniteData } from "@/hooks/useFlattenedInfiniteData";
import { useGetInfiniteStoreItemList } from "@/api/store/queries/useGetInfiniteStoreItemList";

export default function ItemList() {
  const searchParams = useSearchParams();

  const sortBy = (searchParams.get("sortBy") as SortByType) || "recent";
  const itemType = (searchParams.get("itemType") as ItemType) || "ALL";

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteStoreItemList(sortBy, itemType);
  const itemList = useFlattenedInfiniteData(infiniteData, "itemList");

  const ref = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <article className={commonWrapper({ paddingX: 20, direction: "col" })}>
      <div
        className={commonWrapper({
          wrap: "wrap",
          gap: "32/8",
          align: "start",
          justify: "start",
        })}
      >
        {itemList.map((item, index) => {
          return <StoreItem key={item.id} item={item} index={index} />;
        })}
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
}
