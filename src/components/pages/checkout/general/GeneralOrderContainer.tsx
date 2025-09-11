"use client";

import { useEffect, useRef, useState } from "react";

// API & Data Fetching
import { useGetGeneralOrder } from "@/api/order/queries/useGetGeneralOrder";

// Stores (상태 관리)
import { usePersistOrderStore } from "@/store/order/usePersistOrderStore";
import { useOrderStore } from "@/store/order/useOrderStore";
import { useRewardStore } from "@/store/order/useRewardStore";
import { usePaymentStore } from "@/store/order/usePaymentStore";
import { useToastStore } from "@/store/useToastStore";

// Custom Hooks
import { useOrderForm } from "@/hooks/order/useOrderForm";
import { useGeneralPayment } from "@/hooks/order/useGeneralPayment";
import { useUpdateOrderStores } from "@/hooks/order/updateOrderStores";

// Components
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
import { ORDER_MESSAGE, ORDER_TYPE } from "@/constants";
import { SaveGeneralOrderRequest } from "@/types";
import {
  defaultOrderValues,
  getOrderSchema,
  OrderFormValues,
} from "@/utils/validation/rewardValidation";

// Utils
import { formatNumberWithCommas } from "@/utils";
import { scrollToElement } from "@/utils/scrollToElement";

export default function GeneralOrderContainer() {
  // ========== 상태 관리 ==========
  const [showTermsErrors, setShowTermsErrors] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);

  // ========== Store 상태 ==========
  const { orderItemDtoList } = usePersistOrderStore();
  const maxAvailableReward = useRewardStore(
    (state) => state.maxAvailableReward
  );
  const paymentPrice = usePaymentStore((state) => state.paymentPrice);
  const getRequestBody = useOrderStore((state) => state.getRequestBody);
  const agreePrivacy = useOrderStore((state) => state.agreePrivacy);
  const addToast = useToastStore((state) => state.addToast);

  // ========== 데이터 페칭 ==========
  const { data: generalOrderData } = useGetGeneralOrder({
    orderItemDtoList,
  });

  // ========== 커스텀 훅 ==========
  const updateOrderStores = useUpdateOrderStores();
  const { control, setValue } = useOrderForm<OrderFormValues>(
    getOrderSchema(maxAvailableReward),
    defaultOrderValues
  );
  const { processPayment, isProcessing } = useGeneralPayment({
    generalOrderSheetData: generalOrderData,
  });

  // ========== 사이드 이펙트 ==========
  // 데이터 로딩 완료시 상태 업데이트
  useEffect(() => {
    if (generalOrderData) {
      updateOrderStores(generalOrderData);
    }
  }, [generalOrderData, updateOrderStores]);

  // ========== 이벤트 핸들러 ==========
  const scrollToTerms = () => {
    scrollToElement(termsRef.current);
  };

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
    console.log("requestBody", requestBody);
    await processPayment(requestBody);
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
      <RewardUsage
        orderType={ORDER_TYPE.GENERAL}
        control={control}
        setValue={setValue}
        maxAvailableReward={maxAvailableReward}
      />
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
