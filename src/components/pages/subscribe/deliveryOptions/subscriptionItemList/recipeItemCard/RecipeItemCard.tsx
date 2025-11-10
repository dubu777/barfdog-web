import { commonWrapper, marginStyles } from "@/styles/common.css";
import * as styles from "./RecipeItemCard.css";
import Text from "@/components/ui/text/Text";
import Image from "next/image";
import { DeliveryPlan, MealPlan } from "@/types";
import { DELIVERY_PLAN_LABEL, MEAL_PLAN_LABEL } from "@/constants";

interface RecipeItemCardProps {
  mealPlan: MealPlan;
  deliveryPlan: DeliveryPlan;
  displayImageUrl: string;
  recipeName: string;
  originalPrice: number;
  packCount: number;
  gramsPerMeal: number;
}

export default function RecipeItemCard({
  mealPlan,
  deliveryPlan,
  displayImageUrl,
  recipeName,
  originalPrice,
  packCount,
  gramsPerMeal,
}: RecipeItemCardProps) {
  return (
    <div className={styles.itemCardContainer}>
      <Image
        src={displayImageUrl}
        alt={recipeName}
        width={76}
        height={76}
        priority
        className={styles.itemCardImage}
      />
      <div
        className={commonWrapper({
          direction: "col",
          justify: "between",
          align: "start",
        })}
      >
        <div>
          <Text type="headline2" block className={marginStyles({ bottom: 4 })}>
            {recipeName}
          </Text>
          <Text
            type="body3"
            color="gray600"
            block
            className={marginStyles({ bottom: 6 })}
          >{`${gramsPerMeal}g | ${MEAL_PLAN_LABEL[mealPlan]} | ${DELIVERY_PLAN_LABEL[deliveryPlan]} | ${packCount}팩`}</Text>
        </div>
        <Text type="label3">{originalPrice.toLocaleString()}원</Text>
      </div>
    </div>
  );
}
