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
  SubscriptionPortOneResponse,
} from "@/types";
import { useUpdateSubscriptionOrderBody } from "@/hooks/useUpdateSubscriptionOrderBody";
import { createSubscriptionPaymentData, usePayment } from "@/hooks/usePayment";
import useDeviceState from "@/hooks/useDeviceState";
import { useSaveSubscriptionOrder } from "@/api/order/mutations/useSaveSubscriptionOrder";
import { calculateOriginPrice } from "@/utils/order/calculateOriginPrice";
import { useGetSubscriptionOrder } from "@/api/order/queries/useGetSubscriptionOrder";
import { useCreateSubscriptionOrder } from "@/api/order/mutations/useCreateSubscriptionOrder";

interface SubscriptionOrderContainerProps {
  subscribeId: number;
}

export default function SubscriptionOrderContainer({
  subscribeId,
}: SubscriptionOrderContainerProps) {
  const { subscriptionOrderBody, getRequestBody } = useOrderStore();

  const { data: subscriptionOrderSheetData } =
    useGetSubscriptionOrder(subscribeId);
  const { mutate: saveSubscriptionOrder } = useSaveSubscriptionOrder();
  const { mutate: createSubscriptionOrder } = useCreateSubscriptionOrder();

  const { requestPayment } = usePayment();
  const { isMobileDevice } = useDeviceState();
  const originPrice = calculateOriginPrice(
    subscriptionOrderSheetData.subscribeDto.nextPaymentPrice,
    subscriptionOrderSheetData.subscribeDto.plan
  );

  // 구독 구매 페이지 정보 초기값 없데이트
  useUpdateSubscriptionOrderBody(subscriptionOrderSheetData);

  // 결제 요청
  const handlePaymentSubmit = () => {
    const requestBody = getRequestBody(
      ORDER_TYPE.SUBSCRIPTION
    ) as SaveSubscriptionOrderRequest;
    console.log("requestBody", requestBody);

    saveSubscriptionOrder(
      { subscribeId, body: requestBody },
      {
        onSuccess: (data) => {
          console.log("saveSubscriptionOrder", data);

          if (data.status === 200) {
            const paymentData = createSubscriptionPaymentData({
              requestBody: requestBody as SaveSubscriptionOrderRequest,
              subscriptionOrderSheetData,
              isMobileDevice,
            });
            requestPayment({
              orderType: ORDER_TYPE.SUBSCRIPTION,
              paymentData,
              callback: (response) => {
                const res = response as SubscriptionPortOneResponse;
                const { success, customer_uid, error_msg, merchant_uid } = res;
                // 포트원 결제 성공 시
                console.log("res", res);

                if (success) {
                  const orderData = {
                    customer_uid,
                    merchant_uid, // 서버로부터 받은 주문번호
                    amount: requestBody.paymentPrice, //  ! [중요] 결제금액 변경(변조) 여부 검증 대상.
                    name: paymentData.itemName,
                    buyer_name: paymentData.buyer_name,
                    buyer_tel: paymentData.buyer_tel,
                    buyer_email: paymentData.buyer_email, // 구매자 이메일
                    buyer_addr: paymentData.buyer_addr, // 구매자 주소
                    buyer_postcode: paymentData.buyer_postcode,
                  }
                  createSubscriptionOrder(
                    orderData,
                    {
                      onSuccess: (data) => {
                        console.log("createSubscriptionOrder-success", data);
                        // window.location.href = `/order/order-completed`;
                      },
                      onError: (err) => {
                        console.error("createSubscriptionOrder-error", err);
                      }
                    }
                  )
                  console.log("결제 성공", res);
                } else {
                  console.error("결제 실패", res);
                }
              },
            });
          }
        },
        onError: (err) => {
          console.error("saveSubscriptionOrder-error", err);
        },
      }
    );
  };

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

// console.log("subscriptionOrderSheetData", subscriptionOrderSheetData);
// console.log("subscriptionOrderBody", subscriptionOrderBody);

// useEffect(() => {
//   const script = document.createElement("script");
//   script.src = "https://cdn.iamport.kr/v1/iamport.js";
//   script.async = true;

//   script.onload = () => {
//     setIsScriptLoaded(true);
//   };

//   document.body.appendChild(script);

//   return () => {
//     document.body.removeChild(script);
//   };
// }, []);

// const subscriptionPayment = ({
//   requestBody,
//   id,
//   merchantUid,
//   customerUid,
//   subscribeId,
// }: SubscriptionPaymentProps) => {
//   if (!isScriptLoaded || !window.IMP) {
//     console.error("IMP 스크립트가 로드되지 않았습니다.");
//     return;
//   }
//   const IMP = window.IMP;
//   IMP.init(process.env.NEXT_PUBLIC_IAMPORT_CODE);

//   const itemName = subscriptionOrderSheetData.recipeNameList.join(", ");

//   // 포트원 request
//   const paymentData = {
//     pg: PG_TYPE.SUBSCRIPTION[paymentMethod],
//     pay_method: PAYMENT_METHOD["CREDIT_CARD"],
//     merchant_uid: null, // 주문번호
//     amount: getPaymentDisplayAmount({
//       paymentMethod,
//       originAmount: requestBody.paymentPrice,
//     }),
//     customer_uid: customerUid,
//     name: itemName,
//     buyer_email: subscriptionOrderSheetData.email,
//     buyer_name: subscriptionOrderSheetData.name,
//     buyer_tel: requestBody.deliveryDto.phone,
//     buyer_addr: `${requestBody.deliveryDto.street}, ${requestBody.deliveryDto.detailAddress}`,
//     buyer_postcode: requestBody.deliveryDto.zipcode,
//     m_redirect_url: `${window.location.origin}/order/loading/subscribe`,
//   };

//   IMP.request_pay(paymentData, async (res: SubscriptionPortOneResponse) => {
//     const { success, customer_uid, error_code, error_msg } = res;
//     if (success) {
//       // 결제 성공
//       try {
//       } catch (error) {
//         console.error("결제 성공 처리 에러", error);
//       }
//     } else {
//       // 결제 실패 시 처리
//       try {
//         console.error("결제 실패:", error_msg);
//         window.location.href = `/order/order-failed`;
//       } catch (error) {
//         console.error("결제 실패 처리 에러", error);
//       }
//     }
//   });
// };

// const handlePaymentSubmit = () => {
//   const requestBody = getRequestBody(ORDER_TYPE.SUBSCRIPTION);
//   saveSubscriptionOrder(requestBody as SaveSubscriptionOrderRequest, {
//     onSuccess: (data) => {
//       console.log("createGeneralOrder????????????????", data);
//       if (data.status === 200) {
//         subscriptionPayment({
//           requestBody: requestBody as SaveSubscriptionOrderRequest,
//           id: data.data.id,
//           merchantUid: data.data.merchantUid,
//           customerUid: customerUid,
//           subscribeId: subscribeId,
//         });
//       } else {
//         console.error("결제 요청 실패: 서버 검증 실패");
//       }
//     },
//     onError: (err) => {
//       console.log("createGeneralOrder-error", err);
//     },
//   });
// };
