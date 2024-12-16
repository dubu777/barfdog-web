'use client'

import { useGetOrderSheet } from "@/api/order/queries/useGetOrderSheet";
// import * as styles from "./OrderInfo.css";
import OrderInfo from "./orderInfo/OrderInfo";


interface OrderContainerProps {
  subscribeId: number;
}

export default function OrderContainer({subscribeId}: OrderContainerProps) {
  const { data: orderSheetData } = useGetOrderSheet(subscribeId);

  console.log('orderSheetData', orderSheetData);
  
  return(
    <div >
      <OrderInfo />
    </div>
  )
}