"use client";

import PaymentMethod from "../paymentMethod/PaymentMethod";
import { ORDER_TYPE } from "@/constants";

import OrderSummary from "../orderSummary/OrderSummary";
import DeliveryAddress from "../deliveryAddress/DeliveryAddress";
import OrderItem from "../orderItem/OrderItem";
import Divider from "@/components/common/divider/Divider";
import RewardUsage from "../reward/RewardUsage";
import { useOrderStore } from "@/store/order/useOrderStore";
import {
  SaveSubscriptionOrderRequest,
  SubscriptionIamportResponse,
} from "@/types";
import { useUpdateSubscriptionOrderBody } from "@/hooks/useUpdateSubscriptionOrderBody";
import {
  buildSubscriptionPaymentRequest,
  usePayment,
} from "@/hooks/usePayment";
import useDeviceState from "@/hooks/useDeviceState";
import { useSaveSubscriptionOrder } from "@/api/order/mutations/useSaveSubscriptionOrder";
import { calculateOriginPrice } from "@/utils/order/calculateOriginPrice";
import { useGetSubscriptionOrder } from "@/api/order/queries/useGetSubscriptionOrder";
import { useCreateIamportSubscriptionPayment } from "@/api/iamport/mutations/useCreateIamportSubscriptionPayment";

interface SubscriptionOrderContainerProps {
  subscribeId: number;
}

export default function SubscriptionOrderContainer({
  subscribeId,
}: SubscriptionOrderContainerProps) {
  const { subscriptionOrderBody, getRequestBody } = useOrderStore();

  const { data: subscriptionOrderSheetData } =
    useGetSubscriptionOrder(subscribeId);
  const { mutateAsync: saveSubscriptionOrder } = useSaveSubscriptionOrder();
  const { mutateAsync: createIamportSubscriptionPayment } =
    useCreateIamportSubscriptionPayment();
  const { requestIamportPayment } = usePayment();
  const { isMobileDevice } = useDeviceState();
  const originPrice = calculateOriginPrice(
    subscriptionOrderSheetData.subscribeDto.nextPaymentPrice,
    subscriptionOrderSheetData.subscribeDto.plan
  );

  // 구독 구매 페이지 정보 초기값 없데이트
  useUpdateSubscriptionOrderBody(subscriptionOrderSheetData);

  const handlePaymentSubmit = async () => {
    try {
      const requestBody = getRequestBody(
        ORDER_TYPE.SUBSCRIPTION
      ) as SaveSubscriptionOrderRequest;

      console.log("requestBody", requestBody);

      // 주문 정보 저장 요청
      const saveSubscriptionResponse = await saveSubscriptionOrder({
        subscribeId,
        body: requestBody,
      });

      console.log("saveSubscriptionOrder", saveSubscriptionResponse);
      

      if (saveSubscriptionResponse.status !== 200) {
        throw new Error(`구독 주문 저장 실패 (status: ${saveSubscriptionResponse.status})`);
      }
console.log();

      // 아임포트 결제 요청 데이터 생성
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
          const { success, customer_uid, error_msg } = res;

          if (success) {
            const orderData = {
              customer_uid,
              merchant_uid: saveSubscriptionResponse.data.merchantUid, // 서버로부터 받은 주문번호
              amount: requestBody.paymentPrice, //  ! [중요] 결제금액 변경(변조) 여부 검증 대상.
              name: paymentData.itemName,
              buyer_name: paymentData.buyer_name,
              buyer_tel: paymentData.buyer_tel,
              buyer_email: paymentData.buyer_email, // 구매자 이메일
              buyer_addr: paymentData.buyer_addr, // 구매자 주소
              buyer_postcode: paymentData.buyer_postcode,
            };

            try {
              // 아임포트(subscribe/payment/again) 빌링키 발급 및 결제
              const iamportResponse = await createIamportSubscriptionPayment(
                orderData
              );
              console.log("아임포트 결제 성공", iamportResponse);

              const { code, response, message } = iamportResponse;
              
              if (code !== 0) {
                throw new Error(`서버 결제 완료 처리 실패: ${message}`);
              }

              console.log("결제 성공", response);
            } catch (error) {
              console.error("createIamportSubscriptionPayment-실패", error);
            }
          }
        },
      });
    } catch (error) {
      console.error("saveSubscriptionOrder-error", error);
    }
  };

  // // 결제 요청
  // const handlePaymentSubmit = () => {
  //   const requestBody = getRequestBody(
  //     ORDER_TYPE.SUBSCRIPTION
  //   ) as SaveSubscriptionOrderRequest;
  //   console.log("requestBody", requestBody);

  //   saveSubscriptionOrder(
  //     { subscribeId, body: requestBody },
  //     {
  //       onSuccess: (data) => {
  //         console.log("saveSubscriptionOrder", data);

  //         if (data.status === 200) {
  //           const paymentData = buildSubscriptionPaymentRequest({
  //             requestBody: requestBody as SaveSubscriptionOrderRequest,
  //             subscriptionOrderSheetData,
  //             isMobileDevice,
  //           });
  //           requestIamportPayment({
  //             orderType: ORDER_TYPE.SUBSCRIPTION,
  //             paymentData,
  //             callback: (response) => {
  //               const res = response as SubscriptionIamportResponse;
  //               const { success, customer_uid, error_msg, merchant_uid } = res;
  //               // 포트원 결제 성공 시
  //               console.log("res", res);

  //               if (success) {
  //                 const orderData = {
  //                   customer_uid,
  //                   merchant_uid, // 서버로부터 받은 주문번호
  //                   amount: requestBody.paymentPrice, //  ! [중요] 결제금액 변경(변조) 여부 검증 대상.
  //                   name: paymentData.itemName,
  //                   buyer_name: paymentData.buyer_name,
  //                   buyer_tel: paymentData.buyer_tel,
  //                   buyer_email: paymentData.buyer_email, // 구매자 이메일
  //                   buyer_addr: paymentData.buyer_addr, // 구매자 주소
  //                   buyer_postcode: paymentData.buyer_postcode,
  //                 };
  //                 createIamportSubscriptionPayment(orderData, {
  //                   onSuccess: (data) => {
  //                     console.log(
  //                       "createIamportSubscriptionPayment-성공",
  //                       data
  //                     );

  //                     // code기 0이면 성공, 0이 아니면 실패
  //                     const { code, response, message } = data;
  //                     if (code === 0) {
  //                       console.log("결제 성공", response);
  //                       return;
  //                     } else {
  //                       console.error("결제 실패", message);
  //                     }
  //                     // window.location.href = `/order/order-completed`;
  //                   },
  //                   onError: (err) => {
  //                     console.error(
  //                       "createIamportSubscriptionPayment-실패",
  //                       err
  //                     );
  //                   },
  //                 });
  //                 console.log("결제 성공", res);
  //               } else {
  //                 console.error("결제 실패", res);
  //               }
  //             },
  //           });
  //         }
  //       },
  //       onError: (err) => {
  //         console.error("saveSubscriptionOrder-error", err);
  //       },
  //     }
  //   );
  // };

  return (
    <div>
      <DeliveryAddress orderType={ORDER_TYPE.SUBSCRIPTION} />
      <Divider />
      <OrderItem
        orderType={ORDER_TYPE.SUBSCRIPTION}
        subscriptionOrderSheetData={subscriptionOrderSheetData}
      />
      <Divider />
      <OrderSummary
        orderType={ORDER_TYPE.SUBSCRIPTION}
        orderPrice={originPrice}
        freeCondition={undefined}
        deliveryPrice={undefined}
        plan={subscriptionOrderSheetData.subscribeDto.plan}
      />
      <Divider />
      <RewardUsage />
      <Divider />
      <PaymentMethod />
      <button
        style={{ width: "100%", height: "50px", backgroundColor: "gray" }}
        onClick={handlePaymentSubmit}
      >
        결제하기
      </button>
    </div>
  );
}
