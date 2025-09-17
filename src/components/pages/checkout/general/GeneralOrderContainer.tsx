"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// API & Data Fetching
import { useGetGeneralOrder } from "@/api/checkout/queries/useGetGeneralOrder";
import { useSaveGeneralOrder } from "@/api/checkout/mutations/general/useSaveGeneralOrder";
import { useSuccessGeneralPayment } from "@/api/checkout/mutations/general/useSuccessGeneralPayment";
import { useFailGeneralPayment } from "@/api/checkout/mutations/general/useFailGeneralPayment";
import { useCancelGeneralPayment } from "@/api/checkout/mutations/general/useCancelGeneralPayment";
import { useCheckoutFlow } from "@/hooks/checkout/useCheckoutFlow";

// Stores (상태 관리)
import { usePersistOrderStore } from "@/store/checkout/usePersistOrderStore";
import { useOrderStore } from "@/store/checkout/useOrderStore";
import { usePaymentStore } from "@/store/checkout/usePaymentStore";
import { useToastStore } from "@/store/useToastStore";

// UI
import DeliveryAddress from "../common/deliveryAddress/DeliveryAddress";
import BundleDeliverySelector from "./bundleDeliverySelector/BundleDeliverySelector";
import GeneralOrderItemList from "./generalOrderItemList/GenaralOrderItemList";
import CouponSelector from "../common/couponSelector/CouponSelector";
import RewardUsage from "../common/reward/RewardUsage";
import PaymentMethod from "../common/paymentMethod/PaymentMethod";
import OrderSummary from "../common/orderSummary/OrderSummary";
import OrderTerms from "../common/orderTerms/OrderTerms";
import OrderSection from "../common/orderSection/OrderSection";
import Divider from "@/components/common/divider/Divider";
import Text from "@/components/common/text/Text";
import FooterButton from "@/components/common/footerButton/FooterButton";

// Constants & Types
import { CHECKOUT_ROUTES, ORDER_MESSAGE, ORDER_TYPE } from "@/constants";
import {
  GeneralIamportRequest,
  GeneralIamportResponse,
  GeneralOrderSheetResponse,
  SaveGeneralOrderRequest,
} from "@/types";

// Utils
import { formatNumberWithCommas } from "@/utils";
import { scrollToElement } from "@/utils/scrollToElement";
import useDeviceState from "@/hooks/useDeviceState";

// Strategy & Adapter
import { createGeneralStrategy } from "@/utils/checkout/strategies/generalStrategy";
import { iamportAdapter } from "@/utils/checkout/adapters/iamportAdapter";
import { useHydrateGeneralOrderStores } from "@/hooks/checkout/useHydrateGeneralOrderStores";

export default function GeneralOrderContainer() {
  // Local State
  const [showTermsErrors, setShowTermsErrors] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);

  // Store State
  const { orderItemDtoList } = usePersistOrderStore();
  const paymentPrice = usePaymentStore((s) => s.paymentPrice);
  const getRequestBody = useOrderStore((s) => s.getRequestBody);
  const agreePrivacy = useOrderStore((s) => s.agreePrivacy);
  const addToast = useToastStore((s) => s.addToast);

  // Routing & Device
  const router = useRouter();
  const { isMobileDevice } = useDeviceState();

  // React Query Data Fetching
  const { data: generalOrderData } = useGetGeneralOrder({ orderItemDtoList });

  // React Query mutations
  const { mutateAsync: saveGeneralOrder } = useSaveGeneralOrder();
  const { mutateAsync: successGeneralPayment } = useSuccessGeneralPayment();
  const { mutateAsync: failGeneralPayment } = useFailGeneralPayment();
  const { mutateAsync: cancelGeneralPayment } = useCancelGeneralPayment();

  // Store Hydration
  useHydrateGeneralOrderStores(generalOrderData);

  // Payment Strategy
  const strategy = useMemo(
    () =>
      createGeneralStrategy({
        successGeneralPayment: (args) => successGeneralPayment(args),
        cancelGeneralPayment: (id) => cancelGeneralPayment(id),
        failGeneralPayment: (id) => failGeneralPayment(id),
      }),
    [successGeneralPayment, cancelGeneralPayment, failGeneralPayment]
  );

  // Checkout Flow
  const { start, isProcessing } = useCheckoutFlow<
    SaveGeneralOrderRequest,
    GeneralOrderSheetResponse,
    GeneralIamportRequest,
    GeneralIamportResponse
  >({
    sheet: generalOrderData as GeneralOrderSheetResponse,
    isMobile: isMobileDevice,
    saveOrder: async (req) => {
      const res = await saveGeneralOrder(req);
      return {
        id: res.data.id,
        merchantUid: res.data.merchantUid,
        status: res.status,
      };
    },
    paymentAdapter: iamportAdapter,
    strategy,
    navigate: (path) => router.push(path),
    routes: {
      success: CHECKOUT_ROUTES.GENERAL.success,
      fail: CHECKOUT_ROUTES.GENERAL.fail,
    },
  });

  // 스크롤
  const scrollToTerms = () => scrollToElement(termsRef.current);

  // 결제 버튼
  const handlePaymentSubmit = async () => {
    if (!agreePrivacy) {
      setShowTermsErrors(true);
      addToast("결제 필수 사항에 동의해 주세요", "above-button");
      setTimeout(scrollToTerms, 100);
      return;
    }
    const requestBody = getRequestBody(
      ORDER_TYPE.GENERAL
    ) as SaveGeneralOrderRequest;
    await start(requestBody);
  };

  return (
    <>
      <DeliveryAddress />
      <Divider />
      {generalOrderData.orderStatus !== "UNSUBSCRIBE_ORDER" && (
        <>
          <BundleDeliverySelector
            bundleDeliveryAddress={generalOrderData.deliveryAddress}
            orderStatus={generalOrderData.orderStatus}
          />
          <Divider />
        </>
      )}
      <GeneralOrderItemList
        orderItemDtoList={generalOrderData.orderItemDtoList}
      />
      <Divider />
      <CouponSelector
        orderType={ORDER_TYPE.GENERAL}
        orderPrice={generalOrderData.orderPrice}
      />
      <Divider />
      <RewardUsage orderType={ORDER_TYPE.GENERAL} />
      <Divider />
      <PaymentMethod />
      <Divider />
      <OrderSummary
        orderType={ORDER_TYPE.GENERAL}
        originPrice={generalOrderData.orderPrice}
        appliedDefaultDiscountPrice={generalOrderData.orderPrice}
        freeCondition={generalOrderData.freeCondition}
        deliveryPrice={generalOrderData.deliveryPrice}
        orderItemDtoList={generalOrderData.orderItemDtoList}
      />
      <Divider />
      <OrderTerms
        orderType={ORDER_TYPE.GENERAL}
        showErrors={showTermsErrors}
        ref={termsRef}
      />
      <OrderSection padding="20px">
        <Text type="headline2">{ORDER_MESSAGE.CONFIRM}</Text>
      </OrderSection>
      <FooterButton isDisabled={isProcessing} onClick={handlePaymentSubmit}>
        {isProcessing
          ? "결제 처리 중..."
          : `${formatNumberWithCommas(paymentPrice)}원 결제하기`}
      </FooterButton>
    </>
  );
}
