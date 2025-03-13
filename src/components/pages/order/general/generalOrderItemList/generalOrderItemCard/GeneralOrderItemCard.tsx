import { GeneralOrderItem } from "@/types";
import Image from "next/image";
import * as styles from "../../../subscription/subscriptionOrderItemList/orderItemCard/OrderItemCard.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { formatNumberWithCommas } from "@/utils";

interface GeneralOrderItemCardProps {
  orderItemData: GeneralOrderItem;
}

export default function GeneralOrderItemCard({
  orderItemData,
}: GeneralOrderItemCardProps) {
  return (
    <div className={styles.OrderItemCardContainer}>
      <div className={styles.OrderItemCardImageWrapper}>
        <Image
          src="/images/recipe/lamb_and_beef.png"
          alt="임시"
          width={88}
          height={88}
          priority
        />
      </div>
      <div className={styles.OrderItemContentWrapper}>
        <div className={styles.OrderItemInfoWrapper}>
          <DefaultText type="label2">{orderItemData.name}</DefaultText>
          <DefaultText type="body3">
            구매수량 | {orderItemData.amount}개
          </DefaultText>
        </div>
        <DefaultText type="headline2">
          {formatNumberWithCommas(orderItemData.orderLinePrice)}원
        </DefaultText>
      </div>
    </div>
  );
}
