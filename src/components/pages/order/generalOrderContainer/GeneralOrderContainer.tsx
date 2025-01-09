"use client";

// import * as styles from "./OrderInfo.css";

import { useEffect, useState } from "react";
import { usePaymentStore } from "@/store/usePaymentStore";
import { PG_TYPE } from "@/constants/payment";
import OrderInfo from "../orderContainer/orderInfo/OrderInfo";
import PackageSelection from "../orderContainer/packageSelection/PackageSelection";
import PaymentMethod from "../orderContainer/paymentMethod/PaymentMethod";
import { usePersistOrderStore } from "@/store/usePersistOrderStore";
import { useGetGeneralOrderSheet } from "@/api/order/queries/useGetGeneralOrderSheet";
import { useCreateGeneralOrder } from "@/api/order/mutations/useCreateGeneralOrder";
import { GeneralOrderItem, GeneralOrderSheetResponse } from "@/types";
import { useOrderStore } from "@/store/useOrderStore";
import { BundleDeliverySelector } from "./bundleDeliverySelector/BundleDeliverySelector";
import { ORDER_TYPE } from "@/constants";

interface GeneralOrderContainerProps {}

export default function GeneralOrderContainer({}: GeneralOrderContainerProps) {
  // 상태관리
  const { paymentMethod } = usePaymentStore();
  const { updateOrderBody, isBundleDelivery, setIsBundleDelivery } = useOrderStore();
  const { orderItemList } = usePersistOrderStore();
  const [orderSheetData, setOrderSheetData] =
    useState<GeneralOrderSheetResponse | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);


  // API 호출 ( 일반 결제 시트 정보 가져오기, 일반 결제 정보 저장 )
  const { mutate: getGeneralOrderSheet } = useGetGeneralOrderSheet();
  const { mutate: createGeneralOrder } = useCreateGeneralOrder();

  const requestBody = {
    orderItemDtoList: orderItemList,
  };

  // 일반 결제 시트 정보 가져온 후, 일반 결제 request body 업데이트
  useEffect(() => {
    getGeneralOrderSheet(requestBody, {
      onSuccess: (data) => {
        setOrderSheetData(data);
        console.log("getGeneralOrderSheet data", data);

        // 초기 상태 업데이트
        updateOrderBody({
          orderItemDtoList: data.orderItemDtoList.map((item) => ({
            itemId: item.itemId,
            amount: item.amount,
            selectOptionDtoList: (item.optionDtoList ?? []).map((option) => ({
              itemOptionId: option.optionId,
              amount: option.amount,
            })),
            memberCouponId: null,
            discountAmount: 0,
            finalPrice: item.orderLinePrice,
          })),
          deliveryDto: isBundleDelivery
            ? {
                name: null,
                phone: null,
                zipcode: null,
                street: null,
                detailAddress: null,
                request: null,
              }
            : {
                name: data.name,
                phone: data.phoneNumber,
                zipcode: data.defaultAddress.zipcode,
                street: data.defaultAddress.street,
                detailAddress: data.defaultAddress.detailAddress,
                request: "",
              },
          deliveryId: isBundleDelivery ? data.deliveryId : null,
          orderPrice: data.orderPrice,
          deliveryPrice: data.deliveryPrice,
          discountTotal: 0,
          discountReward: 0,
          discountCoupon: 0,
          overDiscount: 0,
          paymentPrice: data.orderPrice,
          brochure: data.brochure,
        }, ORDER_TYPE.GENERAL);
      },
    });
  }, [getGeneralOrderSheet, orderItemList, isBundleDelivery]);

  console.log("orderItemList", orderItemList);

  // 결제 관련 코드 ========================================================
  // 포트원 스크립트 로드 및 로드 확인
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;

    script.onload = () => {
      setIsScriptLoaded(true); // 스크립트 로드 완료 상태 업데이트
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePaymentSubmit = () => {};

  // 일반 결제 요청 함수
  const generalPayment = () => {
    // if (!isScriptLoaded || !window.IMP) {
    //   console.error("IMP 스크립트가 로드되지 않았습니다.");
    //   return;
    // }
    // const IMP = window.IMP;
    // IMP.init(process.env.NEXT_PUBLIC_IAMPORT_CODE);
    // IMP.request_pay({
    //   pg: pgType.GENERAL[paymentMethod],
    //   pay_method: paymentMethod,
    //   merchant_uid: "merchant_" + new Date().getTime(),
    //   name: "주문명:결제테스트",
    //   amount: 14000,
    //   buyer_email: "",
    //   buyer_name: "구매자",
    //   buyer_tel: "010-1234-5678",
    //   buyer_addr: "서울특별시 강남구 신사동 661-16",
    //   buyer_postcode: "06018",
    //   m_redirect_url: "https://www.yourdomain.com/payments/complete",
    // }, function (res) {
    //   if (res.success) {
    //     var msg = "결제가 완료되었습니다.";
    //     msg += "고유ID : " + res.imp_uid;
    //     msg += "상점 거래ID : " + res.merchant_uid;
    //     msg += "결제 금액 : " + res.paid_amount;
    //     msg += "카드 승인번호 : " + res.apply_num;
    //   } else {
    //     var msg = "결제에 실패하였습니다.";
    //     msg += "에러내용 : " + res.error_msg;
    //   }
    //   alert(msg);
    // }
    // );
  };

  // 결제 관련 코드 ========================================================

  return (
    <div>
      <OrderInfo type={ORDER_TYPE.GENERAL} generalOrderSheetData={orderSheetData} />
      <BundleDeliverySelector
        isBundleDelivery={isBundleDelivery}
        setIsBundleDelivery={setIsBundleDelivery}
      />
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
