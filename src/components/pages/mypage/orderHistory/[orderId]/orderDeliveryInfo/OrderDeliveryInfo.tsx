import * as styles from "../orderDetail/OrderDetail.css";
import { DefaultObjectType } from "@/types/common";
import { OrderDetailDto } from "@/types/order";
import Accordion from "@/components/common/accordion/Accordion";

interface OrderGeneralInfoProps {
  type: string;
  orderDto: OrderDetailDto;
}

const OrderDeliveryInfo = ({ type, orderDto }: OrderGeneralInfoProps) => {
  const orderDeliveryInfoList: DefaultObjectType[] = [
    {name: '받는분', value: type === 'subscribe' ? orderDto.recipientName : orderDto.name},
    {name: '핸드폰', value: type === 'subscribe' ? orderDto.recipientPhone : orderDto.phone},
    {name: '배송방법', value: '택배배송'},
    {name: '배송주소', value: `${orderDto.street} ${orderDto.detailAddress}`},
    {name: '배송요청사항', value: orderDto.request ? orderDto.request : '-'},
  ]
  return (
    <Accordion title='배송정보'>
      <ul className={styles.orderInfoContainer}>
        {orderDeliveryInfoList.map(info => (
          <li key={info.name} className={styles.orderInfo({})}>
            <p className={styles.infoTitle}>{info.name}</p>
            <p>{info.value}</p>
          </li>
        ))}
      </ul>
    </Accordion>
  );
};

export default OrderDeliveryInfo;