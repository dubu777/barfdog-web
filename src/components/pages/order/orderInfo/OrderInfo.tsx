'use client'

import { useGetOrderSheet } from "@/api/order/queries/useGetOrderSheet";
import * as styles from "./OrderInfo.css";
import { useGetOrderAddress } from "@/api/order/queries/useGetOrderAddress";


interface OrderInfoProps {

}

export default function OrderInfo({}: OrderInfoProps) {
  const { data: addressData } = useGetOrderAddress();
  console.log('addressData', addressData);
  
  return(
    <div className={styles.OrderInfoContainer}>

    </div>
  )
}