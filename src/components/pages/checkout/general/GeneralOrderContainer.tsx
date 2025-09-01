"use client";

import { useEffect, useRef, useState } from "react";
import { usePersistOrderStore } from "@/store/order/usePersistOrderStore";
import { useGetGeneralOrder } from "@/api/order/queries/useGetGeneralOrder";
import { SaveGeneralOrderRequest } from "@/types";
import { useUpdateOrderStores } from "@/utils/order/updateOrderStores";
import DeliveryAddress from "../common/deliveryAddress/DeliveryAddress";
import Divider from "@/components/common/divider/Divider";

import { ORDER_MESSAGE, ORDER_TYPE } from "@/constants";
import { useOrderStore } from "@/store/order/useOrderStore";
import PaymentMethod from "../common/paymentMethod/PaymentMethod";
import RewardUsage from "../common/reward/RewardUsage";
import OrderSummary from "../common/orderSummary/OrderSummary";
import {
  defaultOrderValues,
  getOrderSchema,
  OrderFormValues,
} from "@/utils/validation/rewardValidation";
import { useRewardStore } from "@/store/order/useRewardStore";
import { useOrderForm } from "@/hooks/order/useOrderForm";
import GeneralOrderItemList from "./generalOrderItemList/GenaralOrderItemList";
import BundleDeliverySelector from "./bundleDeliverySelector/BundleDeliverySelector";
import CouponSelector from "../common/couponSelector/CouponSelector";
import OrderTerms from "../common/orderTerms/OrderTerms";
import OrderSection from "../common/orderSection/OrderSection";
import Text from "@/components/common/text/Text";
import { formatNumberWithCommas } from "@/utils";
import FooterButton from "@/components/common/footerButton/FooterButton";
import { useGeneralPayment } from "@/hooks/order/useGeneralPayment";
import { useToastStore } from "@/store/useToastStore";
import { usePaymentStore } from "@/store/order/usePaymentStore";
import { scrollToElement } from "@/utils/scrollToElement";

export default function GeneralOrderContainer() {
  // 상태관리 -------->
  const maxAvailableReward = useRewardStore(
    (state) => state.maxAvailableReward
  );
  const paymentPrice = usePaymentStore((state) => state.paymentPrice);
  const getRequestBody = useOrderStore((state) => state.getRequestBody);
  const agreePrivacy = useOrderStore((state) => state.agreePrivacy);
  const { orderItemDtoList } = usePersistOrderStore();
  const addToast = useToastStore((state) => state.addToast);
  const [showTermsErrors, setShowTermsErrors] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);

  const scrollToTerms = () => {
    scrollToElement(termsRef.current);
  };

  // <--------- 상태관리

  // 서버 호출 react query -------->
  const updateOrderStores = useUpdateOrderStores();
  const { data: generalOrderData } = useGetGeneralOrder({
    orderItemDtoList,
  });

  const { control, setValue } = useOrderForm<OrderFormValues>(
    getOrderSchema(maxAvailableReward),
    defaultOrderValues
  );

  // 데이터 로딩 완료시 상태 업데이트
  useEffect(() => {
    if (generalOrderData) {
      updateOrderStores(generalOrderData);
    }
  }, [generalOrderData, updateOrderStores]);

  const { processPayment, isProcessing } = useGeneralPayment({
    generalOrderSheetData: generalOrderData,
  });

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
