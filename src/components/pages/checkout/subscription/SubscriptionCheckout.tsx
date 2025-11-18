"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// API & Data Fetching
import { useCreateIamportSubscriptionPayment } from "@/api/iamport/mutations/useCreateIamportSubscriptionPayment";
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
import { CHECKOUT_ROUTES, ORDER_TYPE } from "@/constants";
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
  const router = useRouter();
  const { isMobileDevice } = useDeviceState();

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

  const { deliveryInfo, paymentInfo, subscribeInfo, memberInfo } = checkoutData;
  // Store Hydration
  useHydrateSubscriptionOrderStores(checkoutData);

  // API Mutations
  const { mutateAsync: preparePayment } = usePrepareSubscriptionPayment(); // 결제 준비 - java 서버
  const { mutateAsync: createIamportPayment } =
    useCreateIamportSubscriptionPayment(); // 아임포트 구독 결제 생성 - next.js 서버
  const { mutateAsync: validatePayment } = useValidateSubscriptionPayment();
  const { mutateAsync: successPayment } = useSuccessSubscriptionPayment();
  const { mutateAsync: failPayment } = useFailSubscriptionPayment();

  // Payment Strategy
  const strategy = useMemo(
    () =>
      createSubscriptionStrategy({
        sheet: checkoutData,
        isMobile: isMobileDevice,
        createIamportPayment: (body) => createIamportPayment(body),
        validatePayment: (args) => validatePayment(args),
        successPayment: (args) => successPayment(args),
        failPayment: (orderId) => failPayment(orderId),
      }),
    [
      checkoutData,
      isMobileDevice,
      createIamportPayment,
      validatePayment,
      successPayment,
      failPayment,
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
    saveOrder: async (req) => {
      const res = await preparePayment({ body: req });

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
    navigate: (path) => router.push(path),
    routes: {
      success: `/checkout/subscription/${subscribeId}/completed`,
      fail: CHECKOUT_ROUTES.SUBSCRIPTION.fail,
    },
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
    </div>
  );
}
