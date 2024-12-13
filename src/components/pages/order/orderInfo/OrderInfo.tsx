'use client'

import { useGetOrderSheet } from "@/api/order/queries/useGetOrderSheet";
import * as styles from "./OrderInfo.css";
import { useGetAddress } from "@/api/order/queries/useGetAddress";


interface OrderInfoProps {

}

export default function OrderInfo({}: OrderInfoProps) {
  const { data: addressData } = useGetAddress();
  console.log('addressData', addressData);
  
  return(
    <div className={styles.OrderInfoContainer}>

    </div>
  )
}