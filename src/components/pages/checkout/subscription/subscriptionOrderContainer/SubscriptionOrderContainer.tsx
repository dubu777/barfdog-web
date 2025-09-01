"use client";

import PaymentMethod from "../../common/paymentMethod/PaymentMethod";
import { ORDER_MESSAGE, ORDER_TYPE } from "@/constants";
import DeliveryAddress from "../../common/deliveryAddress/DeliveryAddress";
import Divider from "@/components/common/divider/Divider";
import { useOrderStore } from "@/store/order/useOrderStore";
import {
  SaveSubscriptionOrderRequest,
} from "@/types";
import { useInitializeSubscriptionOrder } from "@/hooks/order/useInitializeSubscriptionOrder";
import useDeviceState from "@/hooks/useDeviceState";
import { calculateOriginPrice } from "@/utils/order/calculateOriginPrice";
import { useGetSubscriptionOrder } from "@/api/order/queries/useGetSubscriptionOrder";
import OrderSummary from "../../common/orderSummary/OrderSummary";
import RewardUsage from "../../common/reward/RewardUsage";
import {
  defaultOrderValues,
  getOrderSchema,
  OrderFormValues,
} from "@/utils/validation/rewardValidation";
import { useRewardStore } from "@/store/order/useRewardStore";
import Text from "@/components/common/text/Text";
import OrderSection from "../../common/orderSection/OrderSection";
import { formatNumberWithCommas } from "@/utils";
import CouponSelector from "../../common/couponSelector/CouponSelector";
import OrderTerms from "../../common/orderTerms/OrderTerms";
import FooterButton from "@/components/common/footerButton/FooterButton";
import { useFormHandler } from "@/hooks/useFormHandler";
import SubscriptionNotice from "../subscriptionNotice/SubscriptionNotice";
import { useRef, useState } from "react";
import { useSubscriptionPayment } from "@/hooks/order/useSubscriptionPayment";
import { useToastStore } from "@/store/useToastStore";
import { usePaymentStore } from "@/store/order/usePaymentStore";
import DeliverySchedule from "../deliverySchedule/DeliverySchedule";

interface SubscriptionOrderContainerProps {
  subscribeId: number;
}

export default function SubscriptionOrderContainer({
  subscribeId,
}: SubscriptionOrderContainerProps) {
  // 상태관리 ------>
  const getRequestBody = useOrderStore((state) => state.getRequestBody);
  const agreePrivacy = useOrderStore((state) => state.agreePrivacy);
  const agreeSubscription = useOrderStore((state) => state.agreeSubscription);
  const maxAvailableReward = useRewardStore(
    (state) => state.maxAvailableReward
  );
  const paymentPrice = usePaymentStore((state) => state.paymentPrice);

  const addToast = useToastStore((state) => state.addToast);
  const [showTermsErrors, setShowTermsErrors] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);

  const scrollToTerms = () => {
    termsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };
  // <------- 상태관리

  // 서버 호출 react query ------->
  const { data: subscriptionOrderSheetData } =
    useGetSubscriptionOrder(subscribeId);
  console.log("subscriptionOrderSheetData", subscriptionOrderSheetData);
  // <------- 서버 호출

  // 커스텀 훅 & 유틸 함수 ------>

  // 구독 구매 페이지 정보 초기값 없데이트
  useInitializeSubscriptionOrder(subscriptionOrderSheetData);
  const { isMobileDevice } = useDeviceState();
  const originPrice = calculateOriginPrice(
    subscriptionOrderSheetData.subscribeDto.nextPaymentPrice,
    subscriptionOrderSheetData.subscribeDto.plan
  );
  const { control, setValue } = useFormHandler<OrderFormValues>(
    getOrderSchema(maxAvailableReward),
    defaultOrderValues
  );
  // <------- 커스텀 훅 & 유틸 함수

  // 결제 함수 -------->
  const { processPayment, isProcessing } = useSubscriptionPayment({
    subscribeId,
    subscriptionOrderSheetData,
    isMobileDevice,
  });

  const handlePaymentSubmit = async () => {
    if (!agreePrivacy || !agreeSubscription) {
      setShowTermsErrors(true);
      addToast("결제 필수 사항에 동의해 주세요", "above-button");
      setTimeout(scrollToTerms, 100);
      return;
    }

    const requestBody = getRequestBody(
      ORDER_TYPE.SUBSCRIPTION
    ) as SaveSubscriptionOrderRequest;
    console.log("requestBody", requestBody);
    await processPayment(requestBody);
  };
  // <-------- 결제 함수

  return (
    <>
      <DeliveryAddress />
      <Divider />
      {/* <SubscriptionOrderItemList
        subscriptionOrderSheetData={subscriptionOrderSheetData}
      /> */}
      <Divider />
      <DeliverySchedule
        deliveryDate={subscriptionOrderSheetData.deliveryDate}
        nextDeliveryDate={subscriptionOrderSheetData.nextDeliveryDate}
      />
      <Divider />
      <CouponSelector
        orderType={ORDER_TYPE.SUBSCRIPTION}
        orderPrice={subscriptionOrderSheetData.subscribeDto.nextPaymentPrice}
      />
      <Divider />
      <RewardUsage
        orderType={ORDER_TYPE.SUBSCRIPTION}
        control={control}
        setValue={setValue}
        maxAvailableReward={maxAvailableReward}
        isAutoUseReward={subscriptionOrderSheetData.autoUseReward}
      />
      <Divider />
      <PaymentMethod />
      <Divider />
      <OrderSummary
        orderType={ORDER_TYPE.SUBSCRIPTION}
        originPrice={originPrice}
        appliedDefaultDiscountPrice={
          subscriptionOrderSheetData.subscribeDto.nextPaymentPrice
        }
        discountGrade={subscriptionOrderSheetData.subscribeDto.discountGrade}
        plan={subscriptionOrderSheetData.subscribeDto.plan}
      />
      <Divider />
      <OrderTerms
        orderType={ORDER_TYPE.SUBSCRIPTION}
        showErrors={showTermsErrors}
        ref={termsRef}
      />
      <Divider />
      <OrderSection padding="20px">
        <Text type="headline2">{ORDER_MESSAGE.CONFIRM}</Text>
      </OrderSection>
      <Divider />
      <SubscriptionNotice />
      <FooterButton isDisabled={isProcessing} onClick={handlePaymentSubmit}>
        {isProcessing
          ? "결제 처리 중..."
          : `${formatNumberWithCommas(paymentPrice)}원 결제하기`}
      </FooterButton>
    </>
  );
}
