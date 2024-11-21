import * as styles from "../orderDetail/OrderDetail.css";
import Image from "next/image";
import Accordion from "@/components/common/accordion/Accordion";
import { OrderDetailProps } from "../orderDetail/OrderDetail";

const OrderItemsInfo = ({ orderDetailData }: { orderDetailData: OrderDetailProps }) => {
  const { orderDto, recipeNames, orderItemDtoList } = orderDetailData;
  const OrderItem = ({ item, recipeNames }) => (
    <li key={item.itemId} className={styles.orderItem}>
      <Image src={item.thumbnailUrl} alt={item.itemName} width={80} height={80} />
      <div className={styles.itemInfo}>
        <p>
          {!recipeNames ? '[일반상품]' : '[정기구독]'} {item.itemName ? item.itemName : recipeNames}
        </p>
        <p>
          {!recipeNames
            ? `${item.finalPrice?.toLocaleString()}원 | ${item.amount}개`
            : item.oneMealGramsPerRecipe.split(',').map((value, index) => `${value}g`).join(',')
          }
        </p>
      </div>
    </li>
  )
  return (
    <Accordion title={`주문번호 ${orderDto.merchantUid}`} open>
      <ul className={styles.orderItemList}>
        {recipeNames ?
          <OrderItem item={orderDto} recipeNames={recipeNames} />
          : orderItemDtoList?.map(item => <OrderItem item={item} />)
        }
      </ul>
    </Accordion>
  );
};

export default OrderItemsInfo;