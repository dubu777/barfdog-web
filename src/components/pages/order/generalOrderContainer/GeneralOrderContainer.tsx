"use client";

import { useEffect } from "react";
import { usePersistOrderStore } from "@/store/order/usePersistOrderStore";
import {
  useCachedGeneralOrder,
  useGetGeneralOrder,
} from "@/api/order/queries/useGetGeneralOrder";
import { useCreateGeneralOrder } from "@/api/order/mutations/useCreateGeneralOrder";
import { CreateGeneralOrderRequest, GeneralPortOneResponse } from "@/types";
import BundleDeliverySelector from "../bundleDeliverySelector/BundleDeliverySelector";
import DeliveryAddress from "../deliveryAddress/DeliveryAddress";
import Divider from "@/components/common/divider/Divider";

import { ORDER_TYPE } from "@/constants";
import { useSuccessGeneralPayment } from "@/api/order/mutations/useSuccessGeneralPayment";
import { useFailGeneralPayment } from "@/api/order/mutations/useFailGeneralPayment";
import { useOrderStore } from "@/store/order/useOrderStore";
import PaymentMethod from "../paymentMethod/PaymentMethod";
import RewardUsage from "../reward/RewardUsage";
import OrderSummary from "../orderSummary/OrderSummary";
import OrderItem from "../orderItem/OrderItem";
import { createGeneralPaymentData, usePayment } from "@/hooks/usePayment";
import useDeviceState from "@/hooks/useDeviceState";

interface GeneralOrderContainerProps {}


export default function GeneralOrderContainer({}: GeneralOrderContainerProps) {
  // 상태관리
  const { generalOrderBody, getRequestBody } = useOrderStore();
  const { orderItemDtoList, clearOrderItemDtoList } = usePersistOrderStore();
  const { mutate: createGeneralOrder } = useCreateGeneralOrder();
  const { mutate: fetchGeneralOrder } = useGetGeneralOrder();
  const { mutate: successGeneralPayment } = useSuccessGeneralPayment();
  const { mutate: failGeneralPayment } = useFailGeneralPayment();
  const { data: generalOrderSheetData } = useCachedGeneralOrder({
    orderItemDtoList,
  });
  const { isMobileDevice } = useDeviceState();
  const { requestPayment } = usePayment();

  useEffect(() => {
    if (orderItemDtoList && orderItemDtoList.length > 0) {
      fetchGeneralOrder({ orderItemDtoList });
    }
  }, [orderItemDtoList]);

// 결제 요청 함수
const handlePaymentSubmit = () => {
  const requestBody = getRequestBody(ORDER_TYPE.GENERAL);

  // 일반 주문 생성 후 결제 요청
  createGeneralOrder(requestBody as CreateGeneralOrderRequest, {
    onSuccess: (data) => {
      if (data.status === 200) {
        const paymentData = createGeneralPaymentData({
          requestBody: requestBody as CreateGeneralOrderRequest,
          id: data.data.id,
          merchantUid: data.data.merchantUid,
          generalOrderSheetData,
          isMobileDevice,
        });

        requestPayment({
          orderType: ORDER_TYPE.GENERAL,
          paymentData,
          callback: (response) => {
            const res = response as GeneralPortOneResponse;
            // 포트원 결제 성공
            if (res.success) {
              successGeneralPayment(
                {
                  id: data.data.id,
                  body: {
                    impUid: res.imp_uid,
                    merchantUid: res.merchant_uid,
                    discountReward: requestBody.discountReward,
                  },
                },
                {
                  onSuccess: () => {
                    window.location.href = `/order/order-completed`;
                    clearOrderItemDtoList();
                  },
                }
              );
            } else {
              failGeneralPayment(data.data.id);
              console.error("결제 실패:", res.error_msg);
              window.location.href = `/order/order-failed`;
            }
          },
        });
      } else {
        console.error("결제 요청 실패: 서버 검증 실패");
      }
    },
    onError: (err) => {
      console.error("createGeneralOrder-error", err);
    },
  });
};

  return (
    <div>
      <DeliveryAddress
        orderType={ORDER_TYPE.GENERAL}
      />
      <Divider />
      <BundleDeliverySelector
        deliveryId={generalOrderBody.deliveryId}
        deliveryDto={generalOrderBody.deliveryDto}
      />
      <Divider />
      <OrderItem
        orderType={ORDER_TYPE.GENERAL}
        generalOrderSheetData={generalOrderSheetData}
      />
      <Divider />
      <OrderSummary
        orderType={ORDER_TYPE.GENERAL}
        orderPrice={generalOrderSheetData.orderPrice}
        freeCondition={generalOrderSheetData.freeCondition}
        deliveryPrice={generalOrderSheetData.deliveryPrice}
        orderItemDtoList={generalOrderSheetData.orderItemDtoList}
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




//   // 아임포트 스크립트 로드
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://cdn.iamport.kr/v1/iamport.js";
//     script.async = true;
//     script.onload = () => setIsScriptLoaded(true);

//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

// // 포트원 request data 생성 함수  
//   const createPaymentData = (
//     requestBody: CreateGeneralOrderRequest,
//     id: number,
//     merchantUid: string
//   ) => {

//     const itemList = generalOrderSheetData.orderItemDtoList;
//     const firstItemName = `${itemList[0].name}`;
//     const itemName = `${firstItemName} ${
//       itemList.length > 1 ? `외 ${itemList.length - 1}개` : ""
//     }`;

//     const baseData = {
//       pg: PG_TYPE.GENERAL[paymentMethod],
//       pay_method: PAYMENT_METHOD[paymentMethod],
//       merchant_uid: merchantUid,
//       name: itemName,
//       amount: requestBody.paymentPrice,
//       buyer_email: generalOrderSheetData.email,
//       buyer_name: generalOrderSheetData.name,
//       buyer_tel: requestBody.deliveryDto.phone,
//       buyer_addr: `${requestBody.deliveryDto.street}, ${requestBody.deliveryDto.detailAddress}`,
//       buyer_postcode: requestBody.deliveryDto.zipcode,
//       m_redirect_url: `${window.location.origin}/order/loading/${id}`,
//     };

//     if (paymentMethod === "NAVER_PAY") {
//       const naverPayData = getNaverPayGeneralPaymentParam({
//         items: generalOrderSheetData.orderItemDtoList,
//         isMobile: isMobileDevice,
//       });

//       if (!naverPayData) throw new Error("네이버페이 결제 데이터 생성 실패");

//       return { ...baseData, ...naverPayData };
//     }

//     return baseData;
//   };


//   // 일반 결제 요청 함수
//   const generalPayment = ({
//     requestBody,
//     id,
//     merchantUid,
//   }: GeneralPaymentProps) => {
//     if (!isScriptLoaded || !window.IMP) {
//       console.error("IMP 스크립트가 로드되지 않았습니다.");
//       return;
//     }

//     const IMP = window.IMP;
//     IMP.init(process.env.NEXT_PUBLIC_IAMPORT_CODE);

//   try {
//       const paymentData = createPaymentData(requestBody, id, merchantUid);

//       IMP.request_pay(paymentData, async (res: GeneralPortOneResponse) => {
//         const { success, imp_uid, merchant_uid, error_msg } = res;
//         if (success) {
//           successGeneralPayment(
//             {
//               id,
//               body: {
//                 impUid: imp_uid,
//                 merchantUid: merchant_uid,
//                 discountReward: requestBody.discountReward,
//               },
//             },
//             {
//               onSuccess: () => {
//                 window.location.href = `/order/order-completed`;
//                 clearOrderItemDtoList();
//               },
//             }
//           );
//         } else {
//           failGeneralPayment(id);
//           console.error("결제 실패:", error_msg);
//           window.location.href = `/order/order-failed`;
//         }
//       });
//     } catch (error) {
//       console.error("결제 데이터 생성 오류:", error);
//     }
//   };

//   // 결제하기 클릭시 호출
//   const handlePaymentSubmit = () => {
//     const requestBody = getRequestBody(ORDER_TYPE.GENERAL);
//     console.log("requestBody>>>>>>>>>>>>>>>>>>>>>>>>>", requestBody);
//     createGeneralOrder(requestBody as CreateGeneralOrderRequest, {
//       onSuccess: (data) => {
//         console.log("createGeneralOrder????????????????", data);
//         if (data.status === 200) {
//           generalPayment({
//             requestBody: requestBody as CreateGeneralOrderRequest,
//             id: data.data.id,
//             merchantUid: data.data.merchantUid,
//           });
//         } else {
//           console.error("결제 요청 실패: 서버 검증 실패");
//         }
//       },
//       onError: (err) => {
//         console.log("createGeneralOrder-error", err);
//       },
//     });
//   };
