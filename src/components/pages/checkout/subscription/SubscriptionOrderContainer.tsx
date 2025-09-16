"use client";

import { CHECKOUT_ROUTES, ORDER_MESSAGE, ORDER_TYPE } from "@/constants";
import Divider from "@/components/common/divider/Divider";
import { useOrderStore } from "@/store/checkout/useOrderStore";
import {
  SaveSubscriptionOrderRequest,
  SubscriptionIamportRequest,
  SubscriptionIamportResponse,
  SubscriptionOrderSheetResponse,
} from "@/types";
import useDeviceState from "@/hooks/useDeviceState";
import { calculateOriginPrice } from "@/utils/checkout/calculateOriginPrice";
import { useGetSubscriptionOrder } from "@/api/checkout/queries/useGetSubscriptionOrder";
import {
  defaultOrderValues,
  getOrderSchema,
  OrderFormValues,
} from "@/utils/validation/rewardValidation";
import { useRewardStore } from "@/store/checkout/useRewardStore";
import Text from "@/components/common/text/Text";
import { formatNumberWithCommas } from "@/utils";
import FooterButton from "@/components/common/footerButton/FooterButton";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useMemo, useRef, useState } from "react";
import { useToastStore } from "@/store/useToastStore";
import { usePaymentStore } from "@/store/checkout/usePaymentStore";
import DeliveryAddress from "../common/deliveryAddress/DeliveryAddress";
import DeliverySchedule from "./deliverySchedule/DeliverySchedule";
import CouponSelector from "../common/couponSelector/CouponSelector";
import RewardUsage from "../common/reward/RewardUsage";
import PaymentMethod from "../common/paymentMethod/PaymentMethod";
import OrderSummary from "../common/orderSummary/OrderSummary";
import OrderTerms from "../common/orderTerms/OrderTerms";
import OrderSection from "../common/orderSection/OrderSection";
import SubscriptionNotice from "./subscriptionNotice/SubscriptionNotice";
import { createSubscriptionStrategy } from "@/utils/checkout/strategies/subscriptionStrategy";
import { useRouter } from "next/navigation";
import { useSaveSubscriptionOrder } from "@/api/checkout/mutations/subscription/useSaveSubscriptionOrder";
import { useCreateIamportSubscriptionPayment } from "@/api/iamport/mutations/useCreateIamportSubscriptionPayment";
import { useValidateSubscriptionPayment } from "@/api/checkout/mutations/subscription/useValidateSubscriptionPayment";
import { useInvalidSubscriptionPayment } from "@/api/checkout/mutations/subscription/useInvalidSubscriptionPayment";
import { useSuccessSubscriptionPayment } from "@/api/checkout/mutations/subscription/useSuccessSubscriptionPayment";
import { useFailSubscriptionPayment } from "@/api/checkout/mutations/subscription/useFailSubscriptionPayment";
import { iamportAdapter } from "@/utils/checkout/adapters/iamportAdapter";
import { useCheckoutFlow } from "@/hooks/checkout/useCheckoutFlow";
import { PaymentAdapter } from "@/utils/checkout/adapters/paymentAdapter";
import { useHydrateSubscriptionOrderStores } from "@/hooks/checkout/useHydrateSubscriptionOrderStores";

interface SubscriptionOrderContainerProps {
  subscribeId: number;
}

export default function SubscriptionOrderContainer({
  subscribeId,
}: SubscriptionOrderContainerProps) {
  // 상태
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
    termsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // react query
  const { data: subscriptionOrderSheetData } =
    useGetSubscriptionOrder(subscribeId);

  // Store에 데이터 하이드레이션
  useHydrateSubscriptionOrderStores(subscriptionOrderSheetData);

  // 디바이스
  const { isMobileDevice } = useDeviceState();

  // 폼
  const { control, setValue } = useFormHandler<OrderFormValues>(
    getOrderSchema(maxAvailableReward),
    defaultOrderValues
  );

  const originPrice = calculateOriginPrice(
    subscriptionOrderSheetData.subscribeDto.nextPaymentPrice,
    subscriptionOrderSheetData.subscribeDto.plan
  );

  // React Query mutations
  const { mutateAsync: saveSubscriptionOrder } = useSaveSubscriptionOrder();
  const { mutateAsync: createIamportPayment } =
    useCreateIamportSubscriptionPayment();
  const { mutateAsync: validatePayment } = useValidateSubscriptionPayment();
  const { mutateAsync: invalidPayment } = useInvalidSubscriptionPayment();
  const { mutateAsync: successPayment } = useSuccessSubscriptionPayment();
  const { mutateAsync: failPayment } = useFailSubscriptionPayment();

  // 라우팅
  const router = useRouter();

  // 전략 생성(DI + sheet/isMobile 주입)
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

  // 공통 오케스트레이터 훅
  const { start, isProcessing } = useCheckoutFlow<
    SaveSubscriptionOrderRequest,
    SubscriptionOrderSheetResponse,
    SubscriptionIamportRequest,
    SubscriptionIamportResponse
  >({
    sheet: subscriptionOrderSheetData,
    isMobile: isMobileDevice,
    // 주문 저장 → SaveOrderResult 형태로 변환
    saveOrder: async (req) => {
      const res = await saveSubscriptionOrder({ subscribeId, body: req });
      return {
        id: res.data.id,
        merchantUid: res.data.merchantUid,
        status: res.status,
      };
    },
    // 아답터는 사용 시점에서 타입 고정 (필요시 아답터 제네릭 팩토리로 대체 가능)
    paymentAdapter: iamportAdapter as PaymentAdapter<
      SubscriptionIamportResponse,
      SubscriptionIamportRequest
    >,
    strategy,
    // 성공/실패 라우팅: 일반 결제와 경로가 다르면 여기서 조정 가능
    navigate: (path) => router.push(path),
    routes: {
      success: CHECKOUT_ROUTES.SUBSCRIPTION.success,
      fail: CHECKOUT_ROUTES.SUBSCRIPTION.fail,
    },
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
