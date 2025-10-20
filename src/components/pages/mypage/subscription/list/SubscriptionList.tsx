'use client';
import { useGetInfiniteSubscriptionList } from "@/api/mypage/subscription/queries/useGetInfiniteSubscriptionList";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import EmptyState from "../../common/emptyState/EmptyState";
import { commonWrapper } from "@/styles/common.css";
import InfiniteScrollTrigger from "@/components/common/infiniteScrollTrigger/InfiniteScrollTrigger";
import SubscriptionCard from "../common/card/SubscriptionCard";

export default function SubscriptionList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetInfiniteSubscriptionList();
  const subscriptionList = data?.pages?.flatMap((page) => page.subscriptionList) ?? [];

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage])

  console.log(subscriptionList);

  return (
    <section className={commonWrapper({ 
      direction: 'col', 
      gap: 10,
      padding: 20,
      paddingBottom: 40,
    })}>
      {subscriptionList.length > 0 ? 
        <>
          {subscriptionList.map((subscription) => (
            <SubscriptionCard 
              key={subscription.subscribeId}
              subscribeId={subscription.subscribeId}
              status={subscription.status}
              pictureUrl={subscription.pictureUrl ?? ''}
              recipeNames={subscription.recipeNames}
              dogName={subscription.dogName}
              plan={subscription.plan}
            />
          ))}
          <InfiniteScrollTrigger
            ref={ref}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </>  
        : <EmptyState title="구독 내역이 없습니다." />
      }
    </section>
  );
}