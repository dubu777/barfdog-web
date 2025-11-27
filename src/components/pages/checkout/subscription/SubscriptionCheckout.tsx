"use client";

import { useMemo, useRef, useState } from "react";

// API & Data Fetching
import { useBillingAgainPayment } from "@/api/iamport/mutations/useBillingAgainPayment";
import { useValidateSubscriptionPayment } from "@/api/checkout/mutations/subscription/useValidateSubscriptionPayment";
import { useSuccessSubscriptionPayment } from "@/api/checkout/mutations/subscription/useSuccessSubscriptionPayment";
import { useFailSubscriptionPayment } from "@/api/checkout/mutations/subscription/useFailSubscriptionPayment";

// Stores
import { useOrderStore } from "@/store/checkout/useOrderStore";
import { usePaymentStore } from "@/store/checkout/usePaymentStore";
import { useToastStore } from "@/store/useToastStore";

// Custom Hooks
import { useCheckoutFlow } from "@/hooks/checkout/useCheckoutFlow";
import { useHydrateSubscriptionOrderStores } from "@/hooks/checkout/useHydrateSubscriptionOrderStores";
import useDeviceState from "@/hooks/useDeviceState";

// Components
import Divider from "@/components/ui/divider/Divider";
import FooterButton from "@/components/ui/footerButton/FooterButton";
import DeliveryAddress from "../common/deliveryAddress/DeliveryAddress";
import DeliverySchedule from "./deliverySchedule/DeliverySchedule";
import CouponSelector from "../common/couponSelector/CouponSelector";
import RewardUsage from "../common/reward/RewardUsage";
import PaymentMethod from "../common/paymentMethod/PaymentMethod";
import OrderSummary from "../common/orderSummary/OrderSummary";
import OrderTerms from "../common/orderTerms/OrderTerms";
import SubscriptionNotice from "./subscriptionNotice/SubscriptionNotice";

// Constants & Types
import { ORDER_TYPE } from "@/constants";
import {
  SubscriptionCheckoutResponse,
  SubscriptionIamportRequest,
  IamportCallback,
  PrepareSubscriptionPaymentRequest,
} from "@/types";

// Utils & Adapters
import { formatNumberWithCommas } from "@/utils";
import { scrollToElement } from "@/utils/scrollToElement";
import { createSubscriptionStrategy } from "@/utils/checkout/strategies/subscriptionStrategy";
import { iamportAdapter } from "@/utils/checkout/adapters/iamportAdapter";
import { PaymentAdapter } from "@/utils/checkout/adapters/paymentAdapter";
import { useGetSubscriptionCheckout } from "@/api/checkout/queries/useGetSubscriptionCheckout";
import SubscriptionOrderItemList from "./subscriptionOrderItemList/SubscriptionOrderItemList";
import { usePrepareSubscriptionPayment } from "@/api/checkout/mutations/subscription/usePrepareSubscriptionPayment";
import { checkoutPageContainer } from "../OrderSheetCommon.css";
import { useDeliveryStore } from "@/store/checkout/useDeliveryStore";
import { useCancelSubscriptionPayment } from "@/api/checkout/mutations/subscription/useCancelSubscriptionPayment";
import PaymentLoader from "../common/paymentLoader/PaymentLoader";

interface SubscriptionOrderContainerProps {
  subscribeId: number;
}

export default function SubscriptionCheckout({
  subscribeId,
}: SubscriptionOrderContainerProps) {
  // Local State
  const [showTermsErrors, setShowTermsErrors] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);
  const deliveryRef = useRef<HTMLDivElement>(null);

  // Routing & Device
  const { isMobileDevice, isWebView } = useDeviceState();

  // Store State
  const getRequestBody = useOrderStore((state) => state.getRequestBody);
  const agreePrivacy = useOrderStore((state) => state.agreePrivacy);
  const agreeSubscription = useOrderStore((state) => state.agreeSubscription);
  const paymentPrice = usePaymentStore((state) => state.paymentPrice);
  const deliveryDto = useDeliveryStore((state) => state.deliveryDto);
  const addToast = useToastStore((state) => state.addToast);

  // Data Fetching
  const { data: checkoutData } = useGetSubscriptionCheckout(subscribeId);
  console.log("checkoutData", checkoutData);

  const { deliveryInfo, paymentInfo, subscribeInfo } = checkoutData;
  // Store Hydration
  useHydrateSubscriptionOrderStores(checkoutData);

  // API Mutations
  const { mutateAsync: preparePayment } = usePrepareSubscriptionPayment(); // 결제 준비 - java 서버
  const { mutateAsync: billingAgainPayment } = useBillingAgainPayment(); // 포트원 빌링키 이용한 즉시 결제 요청 - next.js 서버
  const { mutateAsync: validatePayment } = useValidateSubscriptionPayment();
  const { mutateAsync: successPayment } = useSuccessSubscriptionPayment();
  const { mutateAsync: failPayment } = useFailSubscriptionPayment();
  const { mutateAsync: cancelPayment } = useCancelSubscriptionPayment();

  // Payment Strategy
  const strategy = useMemo(
    () =>
      createSubscriptionStrategy({
        sheet: checkoutData,
        isMobile: isMobileDevice,
        isWebView,
        billingAgainPayment: (body) => billingAgainPayment(body),
        validatePayment: (args) => validatePayment(args),
        successPayment: (args) => successPayment(args),
        failPayment: (orderId) => failPayment(orderId),
        cancelPayment: (orderId) => cancelPayment(orderId),
      }),
    [
      checkoutData,
      isMobileDevice,
      isWebView,
      billingAgainPayment,
      validatePayment,
      successPayment,
      failPayment,
      cancelPayment,
    ]
  );

  // Checkout Flow
  const { start, isProcessing } = useCheckoutFlow<
    PrepareSubscriptionPaymentRequest,
    SubscriptionCheckoutResponse,
    SubscriptionIamportRequest,
    IamportCallback
  >({
    sheet: checkoutData,
    isMobile: isMobileDevice,
    preparePayment: async (req) => {
      const res = await preparePayment(req);

      return {
        id: res.orderId,
        merchantUid: res.merchantUid,
        status: res.orderStatus,
      };
    },
    paymentAdapter: iamportAdapter as PaymentAdapter<
      IamportCallback,
      SubscriptionIamportRequest
    >,
    strategy,
  });

  // Event Handlers
  const scrollToTerms = () => scrollToElement(termsRef.current);
  const scrollToDelivery = () => scrollToElement(deliveryRef.current);

  const handlePaymentSubmit = async () => {
    if (!deliveryDto) {
      addToast("배송지를 입력해주세요", "above-button");
      setTimeout(scrollToDelivery, 100);
    }

    if (!agreePrivacy || !agreeSubscription) {
      setShowTermsErrors(true);
      addToast("결제 필수 사항에 동의해 주세요", "above-button");
      setTimeout(scrollToTerms, 100);
      return;
    }
    const requestBody = getRequestBody(
      ORDER_TYPE.SUBSCRIPTION
    ) as PrepareSubscriptionPaymentRequest;
    await start(requestBody);
  };

  return (
    <div className={checkoutPageContainer}>
      <DeliveryAddress ref={deliveryRef} />
      <Divider />
      <SubscriptionOrderItemList
        recipeList={subscribeInfo.recipeList}
        deliveryPlan={subscribeInfo.planInfo.weeks}
        mealPlan={subscribeInfo.planInfo.mealCount}
      />
      <Divider />
      <DeliverySchedule
        deliveryDate={deliveryInfo.currentDeliveryDate}
        nextDeliveryDate={deliveryInfo.nextDeliveryDate}
      />
      <Divider />
      <CouponSelector
        orderType={ORDER_TYPE.SUBSCRIPTION}
        originalPrice={paymentInfo.originalPrice}
      />
      <Divider />
      <RewardUsage />
      <Divider />
      <PaymentMethod />
      <Divider />
      <OrderSummary
        orderType={ORDER_TYPE.SUBSCRIPTION}
        originalPrice={paymentInfo.originalPrice}
        discountPlan={paymentInfo.discountPlan}
        discountGrade={paymentInfo.discountGrade}
        plan={subscribeInfo.planInfo.name}
      />
      <Divider />
      <OrderTerms
        orderType={ORDER_TYPE.SUBSCRIPTION}
        showErrors={showTermsErrors}
        ref={termsRef}
      />
      <Divider />
      <SubscriptionNotice />
      <FooterButton isDisabled={isProcessing} onClick={handlePaymentSubmit}>
        {isProcessing
          ? "결제 처리 중..."
          : `${formatNumberWithCommas(paymentPrice)}원 결제하기`}
      </FooterButton>
      {isProcessing && <PaymentLoader />}
    </div>
  );
}
