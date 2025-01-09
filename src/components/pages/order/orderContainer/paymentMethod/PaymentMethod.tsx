"use client";

import * as styles from "./PaymentMethod.css";
import { useOrderStore } from "@/store/useOrderStore";

interface PaymentMethodProps {

}

export default function PaymentMethod({}: PaymentMethodProps) {

  const {paymentMethod, setPaymentMethod} = useOrderStore();

  return (
    <div className={styles.paymentMethodContainer}>
      <h1>결제수단 선택 컴포넌트</h1>

      <button
        className={styles.paymentMethodBox({ selected: paymentMethod ===  "NAVER_PAY"})}
        onClick={() => setPaymentMethod("NAVER_PAY")}
      >
        네이버페이
      </button>
      <button
        className={styles.paymentMethodBox({ selected: paymentMethod === "KAKAO_PAY" })}
        onClick={() => setPaymentMethod("KAKAO_PAY")}
      >
        카카오페이
      </button>
      <button
        className={styles.paymentMethodBox({ selected: paymentMethod === "CREDIT_CARD" })}
        onClick={() => setPaymentMethod("CREDIT_CARD")}
      >
        신용카드
      </button>
    </div>
  );
}
