"use client";
import { useEffect } from "react";
import * as styles from "./SubscriptionDetail.css";
import { pointColor } from "@/styles/common.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import DogInfo from "@/components/pages/mypage/common/information/section/DogInfo";
import AddressInfo from "@/components/pages/mypage/common/information/section/AddressInfo";
import SubscriptionCard from "@/components/pages/mypage/common/cards/section/SubscriptionCard";
import SubscriptionCardInfo from "@/components/pages/mypage/common/information/section/SubscriptionCardInfo";
import SubscriptionPaymentInfo from "@/components/pages/mypage/common/information/section/SubscriptionPaymentInfo";
import SubscriptionPaymentMethodInfo from "@/components/pages/mypage/common/information/section/SubscriptionPaymentMethodInfo";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { subscriptionPlanInfo } from "@/constants";
import { usePaymentMethodDetail } from "@/hooks/usePaymentMethodDetail";
import { useGetSubscriptionDetail } from "@/api/subscription/queries/useGetSubscriptionDetail";
import { useGetDogDetail } from "@/api/dog/queries/useGetDogDetail";
import { PlanKey } from "@/types";

interface SubscriptionDetailProps {
  subscriptionId: number;
}

const SubscriptionDetail = ({ subscriptionId }: SubscriptionDetailProps) => {
  const { pushWithQuery } = useDynamicQueryPush();
  const { data: subscriptionDetail } = useGetSubscriptionDetail(subscriptionId);
  const { data: dogDetail } = useGetDogDetail(subscriptionDetail?.dogId);

  const setPaymentMethodDetail = usePaymentMethodDetail();

  const weeklyPaymentCycle =
    subscriptionPlanInfo[subscriptionDetail?.plan as PlanKey]
      .weeklyPaymentCycle;
  // const subscriptionStatus = subscriptionDetail.subscribeStatus;
  const subscriptionStatus = "BEFORE_PAYMENT";
  const subscriptionOrderStatus = "PAYMENT_DONE";
  // const isBeforePaying = subscriptionOrderStatus === "BEFORE_PAYMENT";
  const isBeforePaying = true;
  const isSubscriptionCancel = true;
  const willSubscriptionCancel = true;

  useEffect(() => {
    setPaymentMethodDetail(subscriptionId);
  }, []);

  return (
    <section>
      <article className={styles.subscriptionDetailBox}>
        <DefaultText type="title4">
          {isSubscriptionCancel ? (
            <>
              <span className={pointColor}>{weeklyPaymentCycle}주</span>마다
              <br />
              정기 구독 상품을 받고 있어요
            </>
          ) : (
            <>
              <span className={pointColor}>25.04.10(적용필요)</span>에<br />
              구독이 해지되었어요
            </>
          )}
        </DefaultText>
        <SubscriptionCard
          data={subscriptionDetail}
          type="subscriptionDetail"
          className={styles.subscriptionDetailCard}
        />
      </article>
      {!isSubscriptionCancel && (
        <SubscriptionPaymentInfo
          data={subscriptionDetail}
          isSubscriptionStatusWillCancel={
            willSubscriptionCancel
          }
        />
      )}
      <SubscriptionCardInfo
        data={subscriptionDetail}
        subscriptionId={subscriptionId}
      />
      <AddressInfo
        data={subscriptionDetail}
        showEditAddressInfo
        editAddressInfoButtonType="full-button"
      />
      <SubscriptionPaymentMethodInfo
        subscribeCount={subscriptionDetail.subscribeCount}
        isBeforePaying={isBeforePaying}
      />
      {dogDetail && (
        <DogInfo data={dogDetail} showEditDogInfo />
      )}
      <div className={styles.cancelSubscriptionContainer}>
        <button
          onClick={() =>
            pushWithQuery(
              `/mypage/subscription/${subscriptionId}/cancel-subscription`,
              { orderStatus: subscriptionOrderStatus }
            )
          }
        >
          <DefaultText type="label4" color="gray700">
            해지하기
          </DefaultText>
        </button>
      </div>
    </section>
  );
};

export default SubscriptionDetail;
