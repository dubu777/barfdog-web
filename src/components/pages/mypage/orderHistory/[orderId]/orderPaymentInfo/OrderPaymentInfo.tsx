import { Fragment } from "react";
import * as styles from "../orderDetail/OrderDetail.css";
import Accordion from "@/components/common/accordion/Accordion";
import { DefaultObjectType } from "@/types/common";
import { OrderDetailDto } from "@/types/order";
import { PAYMENT, PaymentMethod} from "@/constants";

interface OrderPaymentInfoProps {
  type: string;
  orderDto: OrderDetailDto;
}

const OrderPaymentInfo = ({ type, orderDto }: OrderPaymentInfoProps) => {
  const orderPaymentList: DefaultObjectType[] = [
    { id: '주문 금액', name: '주문 금액', value: `${orderDto.orderPrice.toLocaleString()}원` || '-' },
    { id: '배송비', name: '배송비', value: type === 'subscribe' ? '정기 구독 무료' : orderDto.deliveryPrice },
    {
      id: '총 할인금액',
      name: '총 할인금액',
      value: `
        ${orderDto.discountTotal > 0 ? '-' : ''} 
        ${(orderDto.discountTotal - (orderDto.overDiscount || 0)).toLocaleString()}원`
      ,
      child: [
        {
          id: '⌞ 등급할인',
          name: '⌞ 등급할인',
          value: `
            ${orderDto.discountGrade > 0 ? '-' : ''} 
            ${orderDto.discountGrade?.toLocaleString()}원`
          ,
          visible: type === 'subscribe',
        },
        {
          id: '⌞ 적립금 사용',
          name: '⌞ 적립금 사용',
          value: `
            ${orderDto.discountReward > 0 ? '-' : ''} 
            ${orderDto.discountReward?.toLocaleString()}원`
          ,
          visible: true,
        },
        {
          id: '⌞ 쿠폰 사용',
          name: '⌞ 쿠폰 사용',
          value: `
            ${orderDto.discountCoupon > 0 ? '-' : ''} 
            ${orderDto.discountCoupon?.toLocaleString()}원`
          ,
          visible: true,
        },
        {
          id: '⌞ 쿠폰 할인 소멸',
          name: '⌞ 쿠폰 할인 소멸',
          value: `+ ${orderDto.overDiscount?.toLocaleString()}원`,
          visible: orderDto.overDiscount > 0,
        },
      ]

    },
    { id: '결제 금액', name: '결제 금액', value: `${orderDto.paymentPrice.toLocaleString()}원` },
    {
      id: '적립예정금액',
      name: '적립예정금액',
      value:
        `${orderDto.saveReward 
          ? orderDto.saveReward?.toLocaleString() 
          : orderDto.saveRewardTotal 
            ? orderDto.saveRewardTotal?.toLocaleString() 
            : 0}원` }
    ,
    { id: '결제 방법', name: '결제 방법', value: PAYMENT[orderDto.paymentMethod as PaymentMethod] || '-' },
  ]
  return (
    <Accordion title='결제정보'>
      <ul className={styles.orderInfoContainer}>
        {orderPaymentList.map(paymentInfo => (
          <Fragment key={paymentInfo.id} >
            <li className={styles.orderInfo({ discountInfo: false })}>
              <p className={styles.infoTitle}>{paymentInfo.name}</p>
              <p>{paymentInfo.value}</p>
            </li>
            {paymentInfo.child && paymentInfo.child?.map(discountInfo => (
              discountInfo.visible &&
              <li key={discountInfo.id} className={styles.orderInfo({ discountInfo: true })}>
                <p className={styles.infoTitle}>{discountInfo.name}</p>
                <p>{discountInfo.value}</p>
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
    </Accordion>
  );
};

export default OrderPaymentInfo;