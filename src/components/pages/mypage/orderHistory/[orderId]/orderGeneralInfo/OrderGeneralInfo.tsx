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
  console.log(orderDto)
  const orderInfoList: DefaultObjectType[] = [
    {id: '주문상태', name: '주문상태', value: ORDER_STATUS[orderDto?.orderStatus as keyof typeof ORDER_STATUS] || '-'},
    {id: '주문번호', name: '주문번호', value: orderDto.merchantUid},
    {
      id: '주문(결제)일시',
      name: '주문(결제)일시',
      value: formatDate(
        type === 'subscribe' ? 
        orderDto.orderDate ?? ''
        : orderDto.paymentDate ?? '', 
        'fullDateTime'
      )
    },
    {
      id: '배송정보',
      name: '배송정보',
      value: type === 'subscribe'
        ? '정기 구독 배송'
        : `${orderDto.package ? '묶음 배송' : '일반 배송'} ${orderDto.package ? '(정기구독 배송 시, 함께 배송)' : ''}`
    },
  ]
  return (
    orderDto && <Accordion title='주문정보'>
      <ul className={styles.orderInfoContainer}>
        {orderInfoList.map(info => (
          <li key={info.id} className={styles.orderInfo({})}>
            <p className={styles.infoTitle}>{info.name}</p>
            <p>{info.value}</p>
          </li>
        ))}
      </ul>
    </Accordion>
  );
};

export default OrderGeneralInfo;