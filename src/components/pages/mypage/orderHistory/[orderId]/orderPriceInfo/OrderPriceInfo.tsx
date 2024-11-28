import * as styles from "../orderDetail/OrderDetail.css";
import { OrderDetailDto } from "@/types/order";
import Accordion from "@/components/common/accordion/Accordion";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";

const OrderPriceInfo = ({ orderDto }: { orderDto: OrderDetailDto }) => {
  return (
    <>
    <Accordion
      title={
        <div className={styles.orderPriceBox}>
          <span>{orderDto.deliveryPrice === 0 ? '무료배송' : '유료배송'}</span>
          <span>
            {orderDto.deliveryPrice !== 0 &&
              <em className={styles.totalPrice}>상품비 {orderDto.orderPrice?.toLocaleString()}원 + 배송비 {orderDto.deliveryPrice?.toLocaleString()}원</em>
            }
            총 {(orderDto.deliveryPrice + orderDto.orderPrice).toLocaleString()}원
          </span>
        </div>
      }
      open
      showArrow={false}
    >
      <DefaultButton
        type='grayBorder'
        borderRadius='sm'
      >
        동일하게 재 주문
      </DefaultButton>
    </Accordion>
      <Accordion
        open
        showArrow={false}
        title={
          <div className={styles.orderPriceBox}>
            <span>냉동 배송 완료</span>
            <div>
              <span>
                {orderDto?.deliveryCode === 'EPOST' ? '우체국' : '대한통운'}
              </span>
              {orderDto.deliveryNumber ?
                <button className={styles.deliveryButton({ isButton: true })}>배송조회</button>
                : <span className={styles.deliveryButton({ isButton: false })}>발급 전</span>
              }
            </div>
          </div>
        }
      >
      </Accordion>
    </>
  );
};

export default OrderPriceInfo;