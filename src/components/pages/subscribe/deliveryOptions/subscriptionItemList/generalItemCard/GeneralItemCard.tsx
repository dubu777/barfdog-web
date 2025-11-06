import { commonWrapper } from "@/styles/common.css";
import * as styles from "../recipeItemCard/RecipeItemCard.css";
import Image from "next/image";
import { SubscribeGeneralItem } from "@/types";
import Text from "@/components/ui/text/Text";

interface GeneralItemCardProps {
  amount: number;
  originPrice: number;
  generalTempData: SubscribeGeneralItem;
}

export default function GeneralItemCard({
  amount,
  originPrice,
  generalTempData,
}: GeneralItemCardProps) {
  return (
    <div className={styles.itemCardContainer}>
      <Image
        src={generalTempData.imageUrl}
        alt={generalTempData.name}
        width={76}
        height={76}
        priority
      />
            <div
              className={commonWrapper({
                direction: "col",
                gap: 6,
                justify: "start",
                align: "start",
              })}
            >
              <div>
                <Text type="headline2" block>{generalTempData.name}</Text>
                <Text
                  type="body3"
                  color="gray600"
                  block
                >구독 수량 | {amount}개</Text>
              </div>
              <Text type="label3">{originPrice.toLocaleString()}원</Text>
            </div>
    </div>
  );
}
