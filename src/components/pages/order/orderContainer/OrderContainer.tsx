'use client'


import { useGetSubscriptionOrderSheet } from "@/api/order/queries/useGetSubscriptionOrderSheet";
// import * as styles from "./OrderInfo.css";
import OrderInfo from "./orderInfo/OrderInfo";
import PackageSelection from "./packageSelection/PackageSelection";


interface OrderContainerProps {
  subscribeId: number;
}

export default function OrderContainer({subscribeId}: OrderContainerProps) {
  const { data: orderSheetData } = useGetSubscriptionOrderSheet(subscribeId);

  console.log('orderSheetData', orderSheetData);
  
  return(
    <div >
      <OrderInfo />
      <PackageSelection />
    </div>
  )
}