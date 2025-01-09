'use client';
import * as styles from "./OrderHistoryList.css";
import Badge from "@/components/common/badge/Badge";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { ORDER_STATUS, PAYMENT } from "@/constants";
import { formatDate } from "@/utils/dateUtils";
import { GeneralOrderData, SubscriptionOrderData, MergeOrderData } from "@/types/order";
import { DefaultObjectType } from "@/types/common";

const orderContents: DefaultObjectType[] = [
  {
    name: '주문명',
    value: 'orderName',
    id: 'orderName',
  },
  {
    name: '주문 번호',
    value: 'orderId',
    id: 'orderId',
  },
  {
    name: '결제 방법',
    value: 'payment',
    id: 'payment',
  },
  {
    name: '결제 금액',
    value: 'orderPrice',
    id: 'orderPrice',
  },
  {
    name: '주문 상태',
    value: 'orderStatus',
    id: 'orderStatus',
  },
]

const OrderHistoryList = ({ orderList }: { orderList: MergeOrderData }) => {
  return (
    <ul className={styles.orderListContainer}>
      {orderList.map(item => {
        const type = (item as SubscriptionOrderData).recipeDto !== undefined ? 'subscribe' : 'general';
        const orderId = type === 'general' ? item.orderDto?.id : item.orderDto?.orderId;
        return (
          <li key={orderId}>
            <div className={styles.itemHeader}>
              <p>{formatDate(item.orderDto?.orderDate, 'fullDateTimeKR')}</p>
              <Badge color={item.orderDto.orderStatus === 'BEFORE_PAYMENT' ? 'redBorder' : undefined}>
                {ORDER_STATUS[item.orderDto.orderStatus as keyof typeof ORDER_STATUS]}
              </Badge>
            </div>
            <div className={styles.itemContents}>
              {orderContents.map(content => {
                const orderValue = {
                  orderName: 
                    type === 'general'
                      ? (item as GeneralOrderData).itemNameList?.length > 1
                        ? `${(item as GeneralOrderData).itemNameList[0].name}외 ${(item as GeneralOrderData).itemNameList.length - 1}건`
                        : (item as GeneralOrderData).itemNameList[0].name
                      : (item as SubscriptionOrderData).recipeDto.recipeName,
                  orderId: item.orderDto.merchantUid,
                  payment: type === 'general' ? '' : PAYMENT[(item as SubscriptionOrderData).orderDto.paymentMethod as keyof typeof PAYMENT] || '-',
                  orderPrice: `${item.orderDto.paymentPrice.toLocaleString()}원`,
                  orderStatus: ORDER_STATUS[item.orderDto.orderStatus as keyof typeof ORDER_STATUS],
                }
                return (
                  <dl key={content.id} className={styles.itemContent}>
                    <dt className={styles.contentTitle}>{content.name}</dt>
                    <dd>{orderValue[content.value as keyof typeof orderValue]}</dd>
                  </dl>
                )
              })}
            </div>
            <div className={styles.itemButtonControls}>
              <DefaultButton
                type='blackBorder'
                size='sm'
                borderRadius='sm'
                linkUrl={`/mypage/orderHistory/${orderId}?type=${type}`}
              >
                주문 상세
              </DefaultButton>
              {item.orderDto.orderStatus === 'BEFORE_PAYMENT' &&
                <DefaultButton
                  type='blackBorder'
                  size='sm'
                  borderRadius='sm'
                >
                  구독하기
                </DefaultButton>
              }
            </div>
          </li>
        )
      })}
    </ul>
  );
};

export default OrderHistoryList;