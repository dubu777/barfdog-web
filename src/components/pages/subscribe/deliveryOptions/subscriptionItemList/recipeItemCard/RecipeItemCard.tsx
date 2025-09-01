import { commonWrapper } from "@/styles/common.css";
import * as styles from "./RecipeItemCard.css";
import Text from "@/components/common/text/Text";
import Image from "next/image";
import { RecipeTempData } from "@/constants";

interface RecipeItemCardProps {
  packGrams: number;
  originPrice: number;
  packCount: number;
  mealFrequency: 1 | 2;
  deliveryCycle: 2 | 4;
  recipeTempData: RecipeTempData;
}

export default function RecipeItemCard({
  packGrams,
  originPrice,
  packCount,
  mealFrequency,
  deliveryCycle,
  recipeTempData,
}: RecipeItemCardProps) {
  const mealFrequencyText = mealFrequency === 1 ? "하루 한 끼" : "하루 두 끼";
  return (
    <div className={styles.itemCardContainer}>
      <Image
        src={recipeTempData.imageUrl}
        alt={recipeTempData.name}
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
          <Text type="headline2" block>{recipeTempData.name}</Text>
          <Text
            type="body3"
            color="gray600"
            block
          >{`${packGrams}g | ${mealFrequencyText} | ${deliveryCycle}주 | ${packCount}팩`}</Text>
        </div>
        <Text type="label3">{originPrice.toLocaleString()}원</Text>
      </div>
    </div>
  );
}
