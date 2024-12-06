import * as styles from "../orderDetail/OrderDetail.css";
import Image from "next/image";
import Accordion from "@/components/common/accordion/Accordion";
import { MergeOrderAndRecipe, OrderDetailDto, OrderItemDtoList } from "@/types/order";

interface OrderItemProps {
  item: OrderDetailDto | OrderItemDtoList;
  recipeNames?: string;
}

const OrderItemsInfo = ({ orderDetailData }: { orderDetailData: MergeOrderAndRecipe }) => {
  const { orderDto, recipeNames, orderItemDtoList } = orderDetailData;
  const OrderItem = ({ item, recipeNames }: OrderItemProps) => {
    const { itemId, itemName, thumbnailUrl } = item;
    const isOrderDetailDto = (item: OrderItemDtoList | OrderDetailDto): item is OrderDetailDto => {
      return (item as OrderDetailDto).oneMealGramsPerRecipe !== undefined;
    };
    return (
      item && 
      <li key={itemId} className={styles.orderItem}>
        {thumbnailUrl && <Image src={thumbnailUrl} alt={itemName || ''} width={80} height={80} />}
        <div className={styles.itemInfo}>
          <p>
            {!recipeNames ? '[일반상품]' : '[정기구독]'} {item.itemName ? item.itemName : recipeNames}
          </p>
          <p>
            {!recipeNames
              ? `${(item as OrderItemDtoList).finalPrice?.toLocaleString()}원 | ${(item as OrderItemDtoList).amount}개`
              : isOrderDetailDto(item) 
                ? item.oneMealGramsPerRecipe?.split(',').map((value: string) => `${value}g`).join(',') 
                : '-'
            }
          </p>
        </div>
      </li>
    )
  }
  return (
    <Accordion title={`주문번호 ${orderDto.merchantUid}`} open>
      <ul className={styles.orderItemList}>
        {recipeNames ?
          <OrderItem item={orderDto} recipeNames={recipeNames} />
          : orderItemDtoList?.map(item => <OrderItem key={item.itemId} item={item} />)
        }
      </ul>
    </Accordion>
  );
};

export default OrderItemsInfo;