"use client";
import { commonWrapper } from "@/styles/common.css";
import { useSearchParams } from "next/navigation";
import StoreItem from "@/components/pages/store/list/Item/Item";
import InfiniteScrollTrigger from "@/components/ui/infiniteScrollTrigger/InfiniteScrollTrigger";
import { ItemType, SortByType } from "@/types";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useFlattenedInfiniteData } from "@/hooks/useFlattenedInfiniteData";
import { useGetInfiniteStoreItemList } from "@/api/store/queries/useGetInfiniteStoreItemList";
import { useEffect } from "react";
import { sendLogToNative } from "@/utils/debug/webviewLogger";

export default function ItemList() {
  const searchParams = useSearchParams();

  const sortBy = (searchParams.get("sortBy") as SortByType) || "recent";
  const itemType = (searchParams.get("itemType") as ItemType) || "ALL";

  // 디버깅용 로그
  useEffect(() => {
    if (typeof window !== "undefined") {
      sendLogToNative("[DEBUG] window.location.origin", {
        origin: window.location.origin,
      });
    }
    sendLogToNative("[ItemList] URL 파라미터 변경", { sortBy, itemType });
    sendLogToNative("[ItemList] 전체 searchParams", searchParams.toString());
  }, [sortBy, itemType, searchParams]);

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteStoreItemList(sortBy, itemType);
  const itemList = useFlattenedInfiniteData(infiniteData, "itemList");

  // 데이터 로딩 상태 로그
  useEffect(() => {
    sendLogToNative("[ItemList] 아이템 리스트", `${itemList.length}개`);
  }, [itemList]);

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
