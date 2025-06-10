"use client";

import { useEffect, useRef, useState } from "react";
import { usePersistOrderStore } from "@/store/order/usePersistOrderStore";
import { useGetGeneralOrder } from "@/api/order/queries/useGetGeneralOrder";
import { SaveGeneralOrderRequest, GeneralOrderSheetResponse } from "@/types";
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
import DefaultText from "@/components/common/defaultText/DefaultText";
import { formatNumberWithCommas } from "@/utils";
import FooterButton from "@/components/common/footerButton/FooterButton";
import { initialGeneralOrderSheetResponse } from "@/config/orderInitialValues";
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
  const { orderItemDtoList, clearOrderItemDtoList } = usePersistOrderStore();
  const [generalOrderSheetData, setGeneralOrderSheetData] =
    useState<GeneralOrderSheetResponse>(initialGeneralOrderSheetResponse);
  const addToast = useToastStore((state) => state.addToast);
  const [showTermsErrors, setShowTermsErrors] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);

  const scrollToTerms = () => {
    scrollToElement(termsRef.current);
  };

  console.log("generalOrderSheetData", generalOrderSheetData);

  // <--------- 상태관리

  // 서버 호출 react query -------->
  const { mutateAsync: getGeneralOrderMutate } = useGetGeneralOrder();

  const { control, setValue } = useOrderForm<OrderFormValues>(
    getOrderSchema(maxAvailableReward),
    defaultOrderValues
  );

  const { processPayment, isProcessing } = useGeneralPayment({
    generalOrderSheetData,
  });

  // 일반 결제 주문 정보 데이터 가져오기
  // post 요청이기 때문에 useEffect로 로컬스토리지에 있는 orderItemDtoList를 request body로 호출
  useEffect(() => {
    if (orderItemDtoList.length > 0) {
      getGeneralOrderMutate({ orderItemDtoList }).then((data) => {
        setGeneralOrderSheetData(data);
      });
    }
  }, [orderItemDtoList]);

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
      {generalOrderSheetData.orderStatus !== "UNSUBSCRIBE_ORDER" && (
        <>
          <BundleDeliverySelector
            bundleDeliveryAddress={generalOrderSheetData.deliveryAddress}
            orderStatus={generalOrderSheetData.orderStatus}
          />
          <Divider />
        </>
      )}
      <GeneralOrderItemList
        orderItemDtoList={generalOrderSheetData.orderItemDtoList}
      />
      <Divider />
      <CouponSelector
        orderType={ORDER_TYPE.GENERAL}
        orderPrice={generalOrderSheetData.orderPrice}
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
        originPrice={generalOrderSheetData.orderPrice}
        appliedDefaultDiscountPrice={generalOrderSheetData.orderPrice}
        freeCondition={generalOrderSheetData.freeCondition}
        deliveryPrice={generalOrderSheetData.deliveryPrice}
        orderItemDtoList={generalOrderSheetData.orderItemDtoList}
      />
      <Divider />
      <OrderTerms
        orderType={ORDER_TYPE.GENERAL}
        showErrors={showTermsErrors}
        ref={termsRef}
      />
      <OrderSection padding="20px">
        <DefaultText type="headline2">{ORDER_MESSAGE.CONFIRM}</DefaultText>
      </OrderSection>
      <FooterButton isDisabled={isProcessing} onClick={handlePaymentSubmit}>
        {isProcessing
          ? "결제 처리 중..."
          : `${formatNumberWithCommas(paymentPrice)}원 결제하기`}
      </FooterButton>
    </>
  );
}
