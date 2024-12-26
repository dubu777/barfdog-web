"use client";

import { usePaymentStore } from "@/store/usePaymentStore";
import * as styles from "./PaymentMethod.css";

export default function PaymentMethod() {
  const { paymentMethod, setPaymentMethod } = usePaymentStore();
  return (
    <div className={styles.paymentMethodContainer}>
      <h1>결제수단 선택 컴포넌트</h1>

      <button
        className={styles.paymentMethodBox({ selected: paymentMethod === "naverpay" })}
        onClick={() => setPaymentMethod("naverpay")}
      >
        네이버페이
      </button>
      <button
        className={styles.paymentMethodBox({ selected: paymentMethod === "kakaopay" })}
        onClick={() => setPaymentMethod("kakaopay")}
      >
        카카오페이
      </button>
      <button
        className={styles.paymentMethodBox({ selected: paymentMethod === "card" })}
        onClick={() => setPaymentMethod("card")}
      >
        신용카드
      </button>
    </div>
  );
}
