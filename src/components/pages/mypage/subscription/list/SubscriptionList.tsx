"use client";
import { useState } from "react";
import { commonWrapper } from "@/styles/common.css";
import EmptyState from "../../common/emptyState/EmptyState";
import SubscriptionCard from "../common/card/SubscriptionCard";
import InfiniteScrollTrigger from "@/components/ui/infiniteScrollTrigger/InfiniteScrollTrigger";
import AlertModal from "@/components/ui/modal/alertModal/AlertModal";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useFlattenedInfiniteData } from "@/hooks/useFlattenedInfiniteData";
import { useSubscriptionActions } from "@/hooks/mypage/subscription/useSubscriptionActions";
import { useSubscriptionModalControl } from "@/hooks/mypage/subscription/useSubscriptionModalControl";
import { useGetInfiniteSubscriptionList } from "@/api/mypage/subscription/queries/useGetInfiniteSubscriptionList";
import { subscriptionPlanInfo } from "@/constants";
import { PlanInfo } from "@/types";

export default function SubscriptionList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteSubscriptionList();
  const subscriptionList = useFlattenedInfiniteData(data, "subscriptionList");
  const ref = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<
    number | null
  >(null);

  const { modals, closeModal, openKeepSubscriptionModal } =
    useSubscriptionModalControl();
  const { onKeepSubscription, onRetryPayment, onGoToDetail, onResubscribe } =
    useSubscriptionActions({});

  return (
    <>
      <section
        className={commonWrapper({
          direction: "col",
          gap: 10,
          padding: 20,
          paddingBottom: 40,
        })}
      >
        {subscriptionList.length > 0 ? (
          <>
            {subscriptionList.map((subscription) => {
              // TODO: 임시 적용 추후 수정 필요
              const planInfo = {
                name: subscription.plan,
                weeks:
                  subscriptionPlanInfo[subscription.plan].weeklyPaymentCycle,
                days: subscriptionPlanInfo[subscription.plan]
                  .numberOfPacksPerDay,
                mealCount:
                  subscriptionPlanInfo[subscription.plan].totalNumberOfPacks,
              };
              return (
                <SubscriptionCard
                  key={subscription.subscribeId}
                  subscriptionId={subscription.subscribeId}
                  status={subscription.status}
                  pictureUrl={subscription.pictureUrl ?? ""}
                  recipeNames={subscription.recipeNames}
                  dogName={subscription.dogName}
                  planInfo={planInfo as PlanInfo}
                  onGoToDetail={() => onGoToDetail(subscription.subscribeId)}
                  onRetryPayment={onRetryPayment}
                  onResubscribe={() => onResubscribe(subscription.subscribeId)}
                  openKeepSubscriptionModal={openKeepSubscriptionModal}
                  setSelectedSubscriptionId={setSelectedSubscriptionId}
                />
              );
            })}
            <InfiniteScrollTrigger
              ref={ref}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </>
        ) : (
          <EmptyState title="구독 내역이 없습니다." />
        )}
      </section>
      {selectedSubscriptionId && modals.keepSubscription && (
        <AlertModal
          isOpen={modals.keepSubscription}
          onClose={() => closeModal("keepSubscription")}
          title={`해지를 철회하고\n정기 구독을 유지하시겠어요?`}
          content="다해지 예정 상태가 취소되고 구독이 계속 유지됩니다. 다음 결제일부터 자동 결제가 진행돼요"
          confirmText="구독 유지하기"
          cancelText="취소"
          onConfirm={() => onKeepSubscription(selectedSubscriptionId)}
          buttonPosition="center"
        />
      )}
    </>
  );
}
