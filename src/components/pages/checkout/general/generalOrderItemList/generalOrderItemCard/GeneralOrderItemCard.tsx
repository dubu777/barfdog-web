import { GeneralOrderItem } from "@/types";
import Image from "next/image";
import * as styles from "../../../subscription/subscriptionOrderItemList/orderItemCard/OrderItemCard.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { formatNumberWithCommas } from "@/utils";
import Chips from "@/components/common/chips/Chips";
import Divider from "@/components/common/divider/Divider";
import { commonWrapper } from "@/styles/common.css";

interface GeneralOrderItemCardProps {
  orderItemData: GeneralOrderItem;
}

export default function GeneralOrderItemCard({
  orderItemData,
}: GeneralOrderItemCardProps) {
  const baseImageUrl = process.env.NEXT_PUBLIC_S3_URL;
  return (
    <div className={styles.orderItemCardContainer}>
      <div className={commonWrapper({ gap: 8, justify: "start" })}>
        <Image
          src={`${baseImageUrl}${orderItemData.itemImageFilename}`}
          alt="임시"
          width={88}
          height={88}
          priority
          className={styles.orderItemCardImage}
        />
        <div className={styles.orderItemContentWrapper}>
          <div className={styles.orderItemInfoWrapper}>
            <DefaultText type="label2">{orderItemData.name}</DefaultText>
            <DefaultText type="body3">
              구매수량 | {orderItemData.amount}개
            </DefaultText>
          </div>
          <DefaultText type="headline2">
            {formatNumberWithCommas(orderItemData.itemOriginalPrice)}원
          </DefaultText>
        </div>
      </div>
      <div
        className={commonWrapper({ gap: 4, direction: "col", align: "start" })}
      >
        {orderItemData.optionDtoList?.map((option) => (
          <div key={option.optionId} className={styles.orderOptionWrapper}>
            <Chips variant="outlined">추가상품</Chips>
            <div
              className={commonWrapper({
                gap: 4,
                direction: "col",
                align: "start",
              })}
            >
              <div className={commonWrapper({ gap: 8, justify: "start" })}>
                <DefaultText type="body3" color="gray700">
                  {option.name}
                </DefaultText>
                <Divider direction="vertical" thickness={1} color="gray300" />
                <DefaultText type="body3" color="gray700">
                  {option.amount}개
                </DefaultText>
              </div>
              <DefaultText type="label3">
                {formatNumberWithCommas(option.price)}원
              </DefaultText>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
