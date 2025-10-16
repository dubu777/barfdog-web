"use client";

import DeliveryInfo from "../../common/completed/deliveryInfo/DeliveryInfo";
import PaymentInfo from "../../common/completed/paymentInfo/PaymentInfo";
import SubscriptionItemInfo from "../../common/completed/subscriptionItemInfo/SubscriptiontemInfo";
import { completedContainer } from "../../OrderSheetCommon.css";
import Text from "@/components/common/text/Text";
import { commonWrapper, pointColor } from "@/styles/common.css";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { useRouter } from "next/navigation";

interface SubscriptionCompletedProps {
  subscribeId: number;
}

export default function SubscriptionCompleted({
  subscribeId,
}: SubscriptionCompletedProps) {
  const router = useRouter();
  const deliveryDto = {
    recipientName: "Mock 데이터", // 수령자 이름
    phoneNumber: "12312341234", // 수령자 전화번호
    zipcode: "123", // 우편번호
    street: "리", // 도로명 주소
    detailAddress: "13호", // 상세 주소
    request: "하하", // 배송 요청사항
    deliveryId: 12,
    deliveryName: "집",
    default: true,
  };

  const rawFoodList = [
    {
      displayImageUrl: {
        url: "https://renewal-dev.barfdogserver.com/display/recipes?filename=3cc389d3-1c80-4fbf-9324-089040572c47.jpg",
      },
      recipeId: 12,
      name: "덕앤램",
      oneMealGramsPerRecipe: 20, // 레시피별 1끼 권장 급여량(g)
      originalPrice: 33320, // 구독 할인 전 원금
      pricePerGram: 59.5, // g당 가격
    },
  ];
  return (
    <div className={completedContainer}>
      <div className={commonWrapper({ direction: "col", gap: 12 })}>
        <Text type="title2">
          <span className={pointColor}>구독이 완료</span>되었어요
        </Text>
        <Text type="body3" color="gray600">
          다음 결제일에 등록하신 결제 수단으로 자동 결제돼요
        </Text>
      </div>
      <DeliveryInfo deliveryDto={deliveryDto} />
      <PaymentInfo paymentPrice={13000} paymentMethod="NAVER_PAY" />
      <SubscriptionItemInfo
        rawFoodList={rawFoodList}
        mealPlan="ONE_MEAL"
        deliveryPlan="FOUR_WEEK"
      />
      <ButtonDocked
        type="dual-button"
        primaryButtonLabel="구독 상세보기"
        secondaryButtonLabel="홈으로"
        onPrimaryClick={() => {}}
        onSecondaryClick={() => router.push("/")}
      />
    </div>
  );
}
