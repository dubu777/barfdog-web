'use client'

import { useGetOrderSheet } from "@/api/order/queries/useGetOrderSheet";
import * as styles from "../../../Order.css";
import OrderInfo from "@/components/pages/order/orderInfo/OrderInfo";

interface SubscriptionPageProps {
  params: {subscribeId: number}
}


export default function SubscriptionPage({
  params,
}: SubscriptionPageProps) {
  const { subscribeId } = params

const { data: orderSheetData } = useGetOrderSheet(subscribeId)
console.log('orderSheetData>>>', orderSheetData);

  return (
    <div className={styles.subscriptionContainer}>
      <OrderInfo />
  </div>
  )
}
