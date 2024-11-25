import * as styles from "../orderDetail/OrderDetail.css";
import Accordion from "@/components/common/accordion/Accordion";
import { DefaultObjectType } from "@/types/common";
import { OrderDetailDto } from "@/types/order";
import { formatDate } from "@/utils/dateUtils";
import { ORDER_STATUS } from "@/constants";

interface OrderGeneralInfoProps {
  type: string;
  orderDto: OrderDetailDto;
}

const OrderGeneralInfo = ({ type, orderDto }: OrderGeneralInfoProps) => {
  const orderInfoList: DefaultObjectType[] = [
    {name: '주문상태', value: ORDER_STATUS[orderDto.orderStatus]},
    {name: '주문번호', value: orderDto.merchantUid},
    {
      name: '주문(결제)일시',
      value: formatDate(type === 'subscribe' ? orderDto.orderDate : orderDto.paymentDate, 'fullDateTime')},
    {
      name: '배송정보',
      value: type === 'subscribe'
        ? '정기 구독 배송'
        : `${orderDto.package ? '묶음 배송' : '일반 배송'} ${orderDto.package ? '(정기구독 배송 시, 함께 배송)' : ''}`
    },
  ]
  return (
    <Accordion title='주문정보'>
      <ul className={styles.orderInfoContainer}>
        {orderInfoList.map(info => (
          <li key={info.name} className={styles.orderInfo({})}>
            <p className={styles.infoTitle}>{info.name}</p>
            <p>{info.value}</p>
          </li>
        ))}
      </ul>
    </Accordion>
  );
};

export default OrderGeneralInfo;