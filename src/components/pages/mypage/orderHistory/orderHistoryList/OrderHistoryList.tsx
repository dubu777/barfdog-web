'use client';
import * as styles from "./OrderHistoryList.css";
import Badge from "@/components/common/badge/Badge";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { ORDER_STATUS, PAYMENT } from "@/constants";
import { formatDate } from "@/utils/dateUtils";
import { GeneralOrderData, SubscribeOrderData } from "@/types/order";
import { DefaultObjectType } from "@/types/common";

const orderContents: DefaultObjectType[] = [
  {
    name: '주문명',
    value: 'orderName',
  },
  {
    name: '주문 번호',
    value: 'orderId',
  },
  {
    name: '결제 방법',
    value: 'payment',
  },
  {
    name: '결제 금액',
    value: 'orderPrice',
  },
  {
    name: '주문 상태',
    value: 'orderStatus',
  },
]

const OrderHistoryList = ({ orderList }: { orderList: GeneralOrderData[] | SubscribeOrderData[]  }) => {
  return (
    <ul className={styles.orderListContainer}>
      {orderList.map(item => {
        const type = item.recipeDto ? 'subscribe' : 'general';
        const orderId = item.orderDto?.id ? item.orderDto?.id : item.orderDto?.orderId;
        return (
          <li key={orderId}>
            <div className={styles.itemHeader}>
              <p>{formatDate(item.orderDto?.orderDate, 'fullDateTimeKR')}</p>
              <Badge color={item.orderDto.orderStatus === 'BEFORE_PAYMENT' && 'red'}>
                {ORDER_STATUS[item.orderDto.orderStatus]}
              </Badge>
            </div>
            <div className={styles.itemContents}>
              {orderContents.map(content => {
                const orderValue = {
                  orderName: type === 'general'
                    ? item.itemNameList?.length > 1
                      ? `${item?.itemNameList[0].name}외 ${item.itemNameList.length - 1}건`
                      : item.itemNameList[0].name
                    : item.recipeDto.recipeName,
                  orderId: item.orderDto.merchantUid,
                  payment: type === 'general' ? '' : PAYMENT[item.orderDto.paymentMethod],
                  orderPrice: `${item.orderDto.paymentPrice.toLocaleString()}원`,
                  orderStatus: ORDER_STATUS[item.orderDto.orderStatus],
                }
                return (
                  <dl key={content.value} className={styles.itemContent}>
                    <dt className={styles.contentTitle}>{content.name}</dt>
                    <dd>{orderValue[content.value]}</dd>
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