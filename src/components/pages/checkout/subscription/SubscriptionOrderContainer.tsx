"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// API & Data Fetching
import { useGetSubscriptionOrder } from "@/api/checkout/queries/useGetSubscriptionOrder";
import { useSaveSubscriptionOrder } from "@/api/checkout/mutations/subscription/useSaveSubscriptionOrder";
import { useCreateIamportSubscriptionPayment } from "@/api/iamport/mutations/useCreateIamportSubscriptionPayment";
import { useValidateSubscriptionPayment } from "@/api/checkout/mutations/subscription/useValidateSubscriptionPayment";
import { useInvalidSubscriptionPayment } from "@/api/checkout/mutations/subscription/useInvalidSubscriptionPayment";
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
import Divider from "@/components/common/divider/Divider";
import Text from "@/components/common/text/Text";
import FooterButton from "@/components/common/footerButton/FooterButton";
import DeliveryAddress from "../common/deliveryAddress/DeliveryAddress";
import DeliverySchedule from "./deliverySchedule/DeliverySchedule";
import CouponSelector from "../common/couponSelector/CouponSelector";
import RewardUsage from "../common/reward/RewardUsage";
import PaymentMethod from "../common/paymentMethod/PaymentMethod";
import OrderSummary from "../common/orderSummary/OrderSummary";
import OrderTerms from "../common/orderTerms/OrderTerms";
import OrderSection from "../common/orderSection/OrderSection";
import SubscriptionNotice from "./subscriptionNotice/SubscriptionNotice";

// Constants & Types
import { CHECKOUT_ROUTES, ORDER_MESSAGE, ORDER_TYPE } from "@/constants";
import {
  SaveSubscriptionOrderRequest,
  SubscriptionIamportRequest,
  SubscriptionIamportResponse,
  SubscriptionOrderSheetResponse,
} from "@/types";

// Utils & Adapters
import { formatNumberWithCommas } from "@/utils";
import { scrollToElement } from "@/utils/scrollToElement";
import { calculateOriginPrice } from "@/utils/checkout/calculateOriginPrice";
import { createSubscriptionStrategy } from "@/utils/checkout/strategies/subscriptionStrategy";
import { iamportAdapter } from "@/utils/checkout/adapters/iamportAdapter";
import { PaymentAdapter } from "@/utils/checkout/adapters/paymentAdapter";

interface SubscriptionOrderContainerProps {
  subscribeId: number;
}

export default function SubscriptionOrderContainer({
  subscribeId,
}: SubscriptionOrderContainerProps) {
  // Local State
  const [showTermsErrors, setShowTermsErrors] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);

  // Routing & Device
  const router = useRouter();
  const { isMobileDevice } = useDeviceState();

  // Store State
  const getRequestBody = useOrderStore((state) => state.getRequestBody);
  const agreePrivacy = useOrderStore((state) => state.agreePrivacy);
  const agreeSubscription = useOrderStore((state) => state.agreeSubscription);
  const paymentPrice = usePaymentStore((state) => state.paymentPrice);
  const addToast = useToastStore((state) => state.addToast);

  // Data Fetching
  const { data: subscriptionOrderSheetData } =
    useGetSubscriptionOrder(subscribeId);

  // Store Hydration
  useHydrateSubscriptionOrderStores(subscriptionOrderSheetData);

  // Computed Values
  const originPrice = calculateOriginPrice(
    subscriptionOrderSheetData.subscribeDto.nextPaymentPrice,
    subscriptionOrderSheetData.subscribeDto.plan
  );

  // API Mutations
  const { mutateAsync: saveSubscriptionOrder } = useSaveSubscriptionOrder();
  const { mutateAsync: createIamportPayment } =
    useCreateIamportSubscriptionPayment();
  const { mutateAsync: validatePayment } = useValidateSubscriptionPayment();
  const { mutateAsync: invalidPayment } = useInvalidSubscriptionPayment();
  const { mutateAsync: successPayment } = useSuccessSubscriptionPayment();
  const { mutateAsync: failPayment } = useFailSubscriptionPayment();

  // Payment Strategy
  const strategy = useMemo(
    () =>
      createSubscriptionStrategy({
        sheet: subscriptionOrderSheetData,
        isMobile: isMobileDevice,
        createIamportPayment: (body) => createIamportPayment(body),
        validatePayment: (args) => validatePayment(args),
        invalidPayment: (args) => invalidPayment(args),
        successPayment: (args) => successPayment(args),
        failPayment: (orderId) => failPayment(orderId),
      }),
    [
      subscriptionOrderSheetData,
      isMobileDevice,
      createIamportPayment,
      validatePayment,
      invalidPayment,
      successPayment,
      failPayment,
    ]
  );

  // Checkout Flow
  const { start, isProcessing } = useCheckoutFlow<
    SaveSubscriptionOrderRequest,
    SubscriptionOrderSheetResponse,
    SubscriptionIamportRequest,
    SubscriptionIamportResponse
  >({
    sheet: subscriptionOrderSheetData,
    isMobile: isMobileDevice,
    saveOrder: async (req) => {
      const res = await saveSubscriptionOrder({ subscribeId, body: req });
      return {
        id: res.data.id,
        merchantUid: res.data.merchantUid,
        status: res.status,
      };
    },
    paymentAdapter: iamportAdapter as PaymentAdapter<
      SubscriptionIamportResponse,
      SubscriptionIamportRequest
    >,
    strategy,
    navigate: (path) => router.push(path),
    routes: {
      success: CHECKOUT_ROUTES.SUBSCRIPTION.success,
      fail: CHECKOUT_ROUTES.SUBSCRIPTION.fail,
    },
  });

  // Event Handlers
  const scrollToTerms = () => scrollToElement(termsRef.current);

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
    await start(requestBody);
  };

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
