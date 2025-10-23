'use client';
import { commonWrapper } from "@/styles/common.css";
import EmptyState from "../../common/emptyState/EmptyState";
import SubscriptionCard from "../common/card/SubscriptionCard";
import InfiniteScrollTrigger from "@/components/common/infiniteScrollTrigger/InfiniteScrollTrigger";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useFlattenedInfiniteData } from "@/hooks/useFlattenedInfiniteData";
import { useGetInfiniteSubscriptionList } from "@/api/mypage/subscription/queries/useGetInfiniteSubscriptionList";

export default function SubscriptionList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetInfiniteSubscriptionList();
  const subscriptionList = useFlattenedInfiniteData(data, 'subscriptionList');

  const ref = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

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