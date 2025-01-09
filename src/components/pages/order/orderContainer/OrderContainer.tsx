'use client'


import { useGetSubscriptionOrderSheet } from "@/api/order/queries/useGetSubscriptionOrderSheet";
// import * as styles from "./OrderInfo.css";
import OrderInfo from "./orderInfo/OrderInfo";
import PackageSelection from "./packageSelection/PackageSelection";
import PaymentMethod from "./paymentMethod/PaymentMethod";
import { useEffect, useState } from "react";
import { usePaymentStore } from "@/store/usePaymentStore";
import { PG_TYPE } from "@/constants/payment";
import { calcOrderSheetPrices } from "@/utils/order/calculatePaymentDetail";
import { ORDER_TYPE } from "@/constants";
import { useOrderStore } from "@/store/useOrderStore";


interface OrderContainerProps {
  subscribeId: number;
}

export default function OrderContainer({subscribeId}: OrderContainerProps) {
  const { data: subscriptionOrderSheetData } = useGetSubscriptionOrderSheet(subscribeId);
  const { paymentMethod } = usePaymentStore();
  const {deliveryDto} = useOrderStore();
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
  // const {} = calcOrderSheetPrices();
  console.log('subscriptionOrderSheetData', subscriptionOrderSheetData);

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
  
  const handlePaymentSubmit = () => {
    
  }

  // 일반 결제 요청 함수
  const generalPayment = () => {
    if (!isScriptLoaded || !window.IMP) {
      console.error("IMP 스크립트가 로드되지 않았습니다.");
      return;
    }

    const IMP = window.IMP;
    IMP.init(process.env.NEXT_PUBLIC_IAMPORT_CODE);

    IMP.request_pay({
      pg: PG_TYPE.GENERAL[paymentMethod],
      pay_method: paymentMethod,
      merchant_uid: "merchant_" + new Date().getTime(),
      name: "주문명:결제테스트",
      amount: 14000,
      buyer_email: "",
      buyer_name: "구매자",
      buyer_tel: "010-1234-5678",
      buyer_addr: "서울특별시 강남구 신사동 661-16",
      buyer_postcode: "06018",
      m_redirect_url: "https://www.yourdomain.com/payments/complete",
    }
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
    );
  }

  
  

// 결제 관련 코드 ========================================================

  return(
    <div >
      <OrderInfo orderType={ORDER_TYPE.SUBSCRIPTION} subscriptionOrderSheetData={subscriptionOrderSheetData} deliveryDto={deliveryDto}/>
      <PackageSelection />
      <PaymentMethod />
      <button onClick={handlePaymentSubmit}>결제하기</button>
    </div>
  )
}