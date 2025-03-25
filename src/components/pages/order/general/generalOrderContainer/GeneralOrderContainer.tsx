"use client";

import { useEffect } from "react";
import { usePersistOrderStore } from "@/store/order/usePersistOrderStore";
import {
  useCachedGeneralOrder,
  useGetGeneralOrder,
} from "@/api/order/queries/useGetGeneralOrder";
import { useSaveGeneralOrder } from "@/api/order/mutations/useSaveGeneralOrder";
import { SaveGeneralOrderRequest, GeneralIamportResponse } from "@/types";
import DeliveryAddress from "../../common/deliveryAddress/DeliveryAddress";
import Divider from "@/components/common/divider/Divider";

import { ORDER_MESSAGE, ORDER_TYPE } from "@/constants";
import { useSuccessGeneralPayment } from "@/api/order/mutations/useSuccessGeneralPayment";
import { useFailGeneralPayment } from "@/api/order/mutations/useFailGeneralPayment";
import { useOrderStore } from "@/store/order/useOrderStore";
import PaymentMethod from "../../common/paymentMethod/PaymentMethod";
import { buildGeneralPaymentRequest, usePayment } from "@/hooks/usePayment";
import useDeviceState from "@/hooks/useDeviceState";
import { useRouter } from "next/navigation";
import RewardUsage from "../../common/reward/RewardUsage";
import OrderSummary from "../../common/orderSummary/OrderSummary";
import {
  defaultOrderValues,
  getOrderSchema,
  OrderFormValues,
} from "@/utils/validation/rewardValidation";
import { useRewardStore } from "@/store/order/useRewardStore";
import { useOrderForm } from "@/hooks/useOrderForm";
import GeneralOrderItemList from "../generalOrderItemList/GenaralOrderItemList";
import BundleDeliverySelector from "../bundleDeliverySelector/BundleDeliverySelector";
import CouponSelector from "../../common/couponSelector/CouponSelector";
import OrderTerms from "../../common/orderTerms/OrderTerms";
import OrderSection from "../../common/orderSection/OrderSection";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { formatNumberWithCommas } from "@/utils";
import { useDiscountStore } from "@/store/order/useDiscountStore";
import FooterButton from "@/components/common/footerButton/FooterButton";
import { useGetCouponList } from "@/api/mypage/queries/useGetCouponList";



interface handleIamportResponseParams {
  res: GeneralIamportResponse;
  orderId: number;
  requestBody: SaveGeneralOrderRequest;
}
export default function GeneralOrderContainer() {
  const router = useRouter();
  // 상태관리 -------->
  const { maxAvailableReward } = useRewardStore();
  const { paymentPrice } = useDiscountStore();
  const { generalOrderBody, getRequestBody } = useOrderStore();
  const { orderItemDtoList, clearOrderItemDtoList } = usePersistOrderStore();
  // <--------- 상태관리

  // 서버 호출 react query -------->
  const { data: generalOrderSheetData } = useCachedGeneralOrder({
    orderItemDtoList,
  });
  const { mutateAsync: getGeneralOrder } = useGetGeneralOrder();
  const { mutateAsync: createGeneralOrder } = useSaveGeneralOrder();
  const { mutateAsync: successGeneralPayment } = useSuccessGeneralPayment();
  const { mutateAsync: failGeneralPayment } = useFailGeneralPayment();
  console.log("generalOrderSheetData", generalOrderSheetData);
  // <------- 서버 호출

  // 커스텀 훅 & 유틸 함수 ------->
  const { isMobileDevice } = useDeviceState();
  // 포트원 구독, 일반 결제 커스텀 훅
  const { requestIamportPayment } = usePayment();

  const { control, watch, errors, setValue } = useOrderForm<OrderFormValues>(
    getOrderSchema(maxAvailableReward),
    defaultOrderValues
  );

  useEffect(() => {
    if (orderItemDtoList && orderItemDtoList.length > 0) {
      getGeneralOrder({ orderItemDtoList });
    }
  }, [orderItemDtoList]);
  // <-------- 커스텀 훅 & 유틸 함수

  // 결제 함수 ============>
  // 아임포트 결제 응답 처리
  const handleIamportResponse = async ({
    res,
    orderId,
    requestBody,
  }: handleIamportResponseParams) => {
    if (res.success) {
      console.log("결제 성공:", res);
      // 최종 결제 성공 처리
      await successGeneralPayment({
        id: orderId,
        body: {
          impUid: res.imp_uid,
          merchantUid: res.merchant_uid,
          discountReward: requestBody.discountReward,
        },
      });
      // 결제 성공 후 추가 작업(예: 페이지 이동, 상태 초기화)
      router.push("/order/order-completed");
      clearOrderItemDtoList();
    } else {
      // 결제 실패 처리
      await failGeneralPayment(orderId);
      console.error("결제 실패:", res);
      // 결제 실패 후 추가 작업(예: 페이지 이동)
      router.push("/order/order-failed");
    }
  };

  // 결제 요청
  const handlePaymentSubmit = async () => {
    const requestBody = getRequestBody(
      ORDER_TYPE.GENERAL
    ) as SaveGeneralOrderRequest;
    console.log("requestBody", requestBody);

    try {
      // 일반 주문 생성(저장) 요청
      const createOrderResponse = await createGeneralOrder(requestBody);

      if (createOrderResponse.status !== 200) {
        throw new Error("결제 요청 실패: 서버 검증 실패");
      }

      // 결제 요청 데이터 빌드
      const paymentData = buildGeneralPaymentRequest({
        requestBody: requestBody,
        id: createOrderResponse.data.id,
        merchantUid: createOrderResponse.data.merchantUid,
        generalOrderSheetData,
        isMobileDevice,
      });

      // iamport 결제 요청: 콜백 내 로직은 별도 함수로 분리
      requestIamportPayment({
        orderType: ORDER_TYPE.GENERAL,
        paymentData,
        callback: async (response) => {
          const res = response as GeneralIamportResponse;
          await handleIamportResponse({
            res,
            orderId: createOrderResponse.data.id,
            requestBody,
          });
        },
      });
    } catch (error) {
      console.error("createGeneralOrder 에러:", error);
      router.push("/order/order-failed");
    }
  };
  // <========== 결제 함수

  return (
    <div>
      <DeliveryAddress />
      <Divider />
      <BundleDeliverySelector
        deliveryId={generalOrderBody.deliveryId}
        deliveryDto={generalOrderBody.deliveryDto}
      />
      <Divider />
      <GeneralOrderItemList
        orderItemDtoList={generalOrderSheetData.orderItemDtoList}
      />
      <Divider />
      <CouponSelector
        orderType={ORDER_TYPE.GENERAL}
        orderPrice={generalOrderSheetData.orderPrice}
      />
      {/* 쿠폰 관련 함수 여기 있음 */}
      {/* <OrderItem
        orderType={ORDER_TYPE.GENERAL}
        generalOrderSheetData={generalOrderSheetData}
      /> */}
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
      <OrderTerms />
      <OrderSection padding="20px">
        <DefaultText type="headline2">{ORDER_MESSAGE.CONFIRM}</DefaultText>
      </OrderSection>
      <FooterButton isDisabled={false} onClick={handlePaymentSubmit}>
        {formatNumberWithCommas(paymentPrice)}원 결제하기
      </FooterButton>
    </div>
  );
}
