"use client";

import PaymentMethod from "../../common/paymentMethod/PaymentMethod";
import { ORDER_MESSAGE, ORDER_TYPE } from "@/constants";
import DeliveryAddress from "../../common/deliveryAddress/DeliveryAddress";
import Divider from "@/components/common/divider/Divider";
import { useOrderStore } from "@/store/order/useOrderStore";
import {
  SaveSubscriptionOrderRequest,
  SubscriptionIamportRequest,
  SubscriptionIamportResponse,
} from "@/types";
import { useInitializeSubscriptionOrder } from "@/hooks/order/useInitializeSubscriptionOrder";
import { usePayment } from "@/hooks/usePayment";
import useDeviceState from "@/hooks/useDeviceState";
import { useSaveSubscriptionOrder } from "@/api/order/mutations/useSaveSubscriptionOrder";
import { calculateOriginPrice } from "@/utils/order/calculateOriginPrice";
import { useGetSubscriptionOrder } from "@/api/order/queries/useGetSubscriptionOrder";
import { useCreateIamportSubscriptionPayment } from "@/api/iamport/mutations/useCreateIamportSubscriptionPayment";
import { useValidateSubscriptionPayment } from "@/api/order/mutations/useValidateSubscriptionPayment";
import { useInvalidSubscriptionPayment } from "@/api/order/mutations/useInvalidSubscriptionPayment";
import { useSuccessSubscriptionPayment } from "@/api/order/mutations/useSuccessSubscriptionPayment";
import { useFailSubscriptionPayment } from "@/api/order/mutations/useFailSubscriptionPayment";
import { useRouter } from "next/navigation";
import OrderSummary from "../../common/orderSummary/OrderSummary";
import RewardUsage from "../../common/reward/RewardUsage";
import {
  defaultOrderValues,
  getOrderSchema,
  OrderFormValues,
} from "@/utils/validation/rewardValidation";
import { useRewardStore } from "@/store/order/useRewardStore";
import DefaultText from "@/components/common/defaultText/DefaultText";
import OrderSection from "../../common/orderSection/OrderSection";
import { formatNumberWithCommas } from "@/utils";
import CouponSelector from "../../common/couponSelector/CouponSelector";
import OrderTerms from "../../common/orderTerms/OrderTerms";
import FooterButton from "@/components/common/footerButton/FooterButton";
import { useFormHandler } from "@/hooks/useFormHandler";
import SubscriptionNotice from "../subscriptionNotice/SubscriptionNotice";
import { useEffect, useRef, useState } from "react";
import { buildSubscriptionPaymentRequest } from "@/store/order/paymentUtils";
import { useSubscriptionPayment } from "@/hooks/order/useSubscriptionPayment";
import { useToastStore } from "@/store/useToastStore";
import { usePaymentStore } from "@/store/order/usePaymentStore";

interface SubscriptionOrderContainerProps {
  subscribeId: number;
}
interface handleIamportPaymentResponseParams {
  res: SubscriptionIamportResponse;
  merchant_uid: string;
  orderId: number;
  paymentData: SubscriptionIamportRequest;
  requestBody: SaveSubscriptionOrderRequest;
}

export default function SubscriptionOrderContainer({
  subscribeId,
}: SubscriptionOrderContainerProps) {
  const router = useRouter();
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
  const { mutateAsync: saveOrder } = useSaveSubscriptionOrder();
  const { mutateAsync: createIamportPayment } =
    useCreateIamportSubscriptionPayment();
  const { mutateAsync: validatePayment } = useValidateSubscriptionPayment();
  const { mutateAsync: invalidPayment } = useInvalidSubscriptionPayment();
  const { mutateAsync: successPayment } = useSuccessSubscriptionPayment();
  const { mutateAsync: failPayment } = useFailSubscriptionPayment();
  console.log("subscriptionOrderSheetData", subscriptionOrderSheetData);
  // <------- 서버 호출

  // 커스텀 훅 & 유틸 함수 ------>

  // 구독 구매 페이지 정보 초기값 없데이트
  useInitializeSubscriptionOrder(subscriptionOrderSheetData);
  const { requestIamportPayment } = usePayment();
  const { isMobileDevice } = useDeviceState();
  const originPrice = calculateOriginPrice(
    subscriptionOrderSheetData.subscribeDto.nextPaymentPrice,
    subscriptionOrderSheetData.subscribeDto.plan
  );
  const { control, watch, errors, setValue } = useFormHandler<OrderFormValues>(
    getOrderSchema(maxAvailableReward),
    defaultOrderValues
  );
  // <------- 커스텀 훅 & 유틸 함수

  // 결제 함수 ========>

  // 개선된 결제 코드
  // const { processPayment, isProcessing } = useSubscriptionPayment({
  //   subscribeId,
  //   subscriptionOrderSheetData,
  //   isMobileDevice,
  // });

  // const handlePaymentSubmit = async () => {
  //   const requestBody = getRequestBody(ORDER_TYPE.SUBSCRIPTION) as SaveSubscriptionOrderRequest;
  //   await processPayment(requestBody);
  // };

  // 아임포트 결제 응답 처리
  const handleIamportPaymentResponse = async ({
    res,
    merchant_uid,
    orderId,
    paymentData,
    requestBody,
  }: handleIamportPaymentResponseParams) => {
    const { success, customer_uid, error_msg } = res;
    if (!success) {
      console.error("아임포트 결제 실패", error_msg);
      router.push("/order/order-failed");
      return;
    }
    const orderData = {
      customer_uid,
      merchant_uid,
      amount: requestBody.paymentPrice,
      name: paymentData.name,
      buyer_name: paymentData.buyer_name,
      buyer_tel: paymentData.buyer_tel,
      buyer_email: paymentData.buyer_email,
      buyer_addr: paymentData.buyer_addr,
      buyer_postcode: paymentData.buyer_postcode,
    };

    try {
      // 아임포트 최종 결제(빌링키 발급) 요청
      const iamportResponse = await createIamportPayment(orderData);
      console.log("아임포트 결제 성공", iamportResponse);

      const { code, response: finalResponse, message } = iamportResponse;
      //
      if (code !== 0) {
        throw new Error(`서버 결제 완료 처리 실패: ${message}`);
      }

      // 결제 최종 응답이 없거나 상태가 "paid"가 아니면 바로 실패 처리
      if (!finalResponse || finalResponse.status !== "paid") {
        const failReason = finalResponse?.fail_reason || "알 수 없는 결제 실패";
        throw new Error(`결제 실패: ${failReason}`);
      }
      console.log("결제 성공 - createIamportPayment", finalResponse);

      // 최종 검증을 위한 본문 구성
      const finalBody = {
        customerUid: customer_uid,
        discountReward: requestBody.discountReward,
        impUid: finalResponse.imp_uid,
        merchantUid: merchant_uid,
      };

      // 결제 금액 검증
      const isValidPayment = await validatePayment({
        orderId,
        impUid: finalResponse.imp_uid,
      });
      console.log("validateSubscriptionPayment", isValidPayment);

      // 결제 검증 성공 시 최종 결제 완료 처리
      if (isValidPayment) {
        const successResponse = await successPayment({
          orderId,
          body: finalBody,
        });
        console.log(
          "successSubscriptionPayment-결제 최종 성공",
          successResponse
        );
        // router.push("/order/order-completed");
      } else {
        // 검증 실패 시 invalidPayment (재검증 및 주문 취소) 처리 후, 실패 처리 API 호출
        const invalidResponse = await invalidPayment({
          orderId,
          body: finalBody,
        });
        console.log(
          "invalidSubscriptionPayment-결제 재 검증 및 실패 처리",
          invalidResponse
        );
        // 실패 처리 API 호출
        const failResponse = await failPayment(orderId);
        console.log("failSubscriptionPayment-결제 실패 처리", failResponse);
        // router.push("/order/order-failed");
      }
    } catch (error) {
      console.error("createIamportPayment-실패", error);
      // router.push("/order/order-failed");
    }
  };

  // 결제 요청 함수
  const handlePaymentSubmit = async () => {
    if (!agreePrivacy || !agreeSubscription) {
      setShowTermsErrors(true);
      addToast("결제 필수 사항에 동의해 주세요", "above-button", 3000);
      setTimeout(scrollToTerms, 100);
      return;
    }
    try {
      const requestBody = getRequestBody(
        ORDER_TYPE.SUBSCRIPTION
      ) as SaveSubscriptionOrderRequest;

      console.log("requestBody", requestBody);

      // 주문 정보 저장 요청
      const saveSubscriptionResponse = await saveOrder({
        subscribeId,
        body: requestBody,
      });

      if (saveSubscriptionResponse.status !== 200) {
        throw new Error(
          `구독 주문 저장 실패 (status: ${saveSubscriptionResponse.status})`
        );
      }

      console.log("saveOrder", saveSubscriptionResponse);

      // 아임포트 결제 요청 데이터 빌드
      const paymentData = buildSubscriptionPaymentRequest({
        requestBody: requestBody as SaveSubscriptionOrderRequest,
        subscriptionOrderSheetData,
        isMobileDevice,
      });

      // 아임포트 결제 등록 요청
      requestIamportPayment({
        orderType: ORDER_TYPE.SUBSCRIPTION,
        paymentData,
        callback: async (response) => {
          console.log("아임포트 결제 응답", response);
          const res = response as SubscriptionIamportResponse;
          await handleIamportPaymentResponse({
            res,
            merchant_uid: saveSubscriptionResponse.data.merchantUid,
            orderId: saveSubscriptionResponse.data.id,
            paymentData,
            requestBody,
          });
        },
      });
    } catch (error) {
      console.error("saveOrder-error", error);
      // router.push("/order/order-failed");
    }
  };
  // <========== 결제 함수

  const handleTest = () => {
    const requestBody = getRequestBody(
      ORDER_TYPE.SUBSCRIPTION
    ) as SaveSubscriptionOrderRequest;

    console.log("requestBody", requestBody);
  };
  return (
    <>
      <DeliveryAddress />
      <Divider />
      {/* <SubscriptionOrderItemList
        subscriptionOrderSheetData={subscriptionOrderSheetData}
      /> */}
      <Divider />
      {/* <DeliverySchedule /> */}
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
      />
      <Divider />
      <PaymentMethod />
      <Divider />
      <OrderSummary
        orderType={ORDER_TYPE.SUBSCRIPTION}
        originPrice={originPrice}
        appliedDefaultDiscountPrice={subscriptionOrderSheetData.subscribeDto.nextPaymentPrice}
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
        <DefaultText type="headline2">{ORDER_MESSAGE.CONFIRM}</DefaultText>
      </OrderSection>
      <Divider />
      <SubscriptionNotice />
      {/* <FooterButton isDisabled={false} onClick={handleTest}>
        {formatNumberWithCommas(paymentPrice)}원 결제하기
      </FooterButton> */}
      <FooterButton isDisabled={false} onClick={handlePaymentSubmit}>
        {formatNumberWithCommas(paymentPrice)}원 결제하기
      </FooterButton>
    </>
  );
}
