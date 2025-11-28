import { GeneralItem } from "@/types";
import Image from "next/image";
import * as styles from "./GeneralOrderItemCard.css";
import Text from "@/components/ui/text/Text";
import Chips from "@/components/ui/chips/Chips";
import Divider from "@/components/ui/divider/Divider";
import { commonWrapper } from "@/styles/common.css";

interface GeneralOrderItemCardProps {
  generalItem: GeneralItem;
}

export default function GeneralOrderItemCard({
  generalItem,
}: GeneralOrderItemCardProps) {
  return (
    <div className={styles.orderItemCardContainer}>
      <div className={commonWrapper({ gap: 8, justify: "start" })}>
        <Image
          src={generalItem.displayImageUrl.url}
          alt="임시"
          width={88}
          height={88}
          priority
          className={styles.orderItemCardImage}
        />
        <div
          className={commonWrapper({
            gap: 8,
            justify: "start",
            direction: "col",
          })}
        >
          <div className={commonWrapper({ direction: "col", align: "start" })}>
            <Text type="label2" color="gray700">
              {generalItem.name}
            </Text>
            <div className={commonWrapper({ gap: 8, justify: "start" })}>
              <Text type="body3" color="gray600">
                구매수량 | {generalItem.amount}개
              </Text>
            </div>
          </div>
          <div className={commonWrapper({ gap: 8, justify: "start" })}>
            <Text type="headline2">
              {generalItem.totalSalePrice.toLocaleString()}원
            </Text>
            {generalItem.totalDiscountProduct > 0 && (
              <Text type="body3" color="gray400" lineThrough>
                {generalItem.totalOriginalPrice.toLocaleString()}원
              </Text>
            )}
          </div>
        </div>
      </div>
      <div
        className={commonWrapper({ gap: 4, direction: "col", align: "start" })}
      >
        {generalItem.itemOptionList?.map((option) => (
          <div key={option.id} className={styles.orderOptionWrapper}>
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
                {option.totalOriginalPrice.toLocaleString()}원
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
