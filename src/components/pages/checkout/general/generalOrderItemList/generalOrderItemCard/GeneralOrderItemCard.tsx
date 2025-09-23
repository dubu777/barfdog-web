import { GeneralOrderItem } from "@/types";
import Image from "next/image";
import * as styles from "./GeneralOrderItemCard.css";
import Text from "@/components/common/text/Text";
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
  return (
    <div className={styles.orderItemCardContainer}>
      <div className={commonWrapper({ gap: 8, justify: "start" })}>
        <Image
          src={orderItemData.itemImageFilename.url}
          alt="임시"
          width={88}
          height={88}
          priority
          className={styles.orderItemCardImage}
        />
        <div className={styles.orderItemContentWrapper}>
          <div className={styles.orderItemInfoWrapper}>
            <Text type="label2">{orderItemData.name}</Text>
            <Text type="body3">구매수량 | {orderItemData.amount}개</Text>
          </div>
          <Text type="headline2">
            {formatNumberWithCommas(orderItemData.itemOriginalPrice)}원
          </Text>
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
                <Text type="body3" color="gray700">
                  {option.name}
                </Text>
                <Divider direction="vertical" thickness={1} color="gray300" />
                <Text type="body3" color="gray700">
                  {option.amount}개
                </Text>
              </div>
              <Text type="label3">
                {formatNumberWithCommas(option.price)}원
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
