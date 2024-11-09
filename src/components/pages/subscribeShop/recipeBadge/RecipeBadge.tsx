"use client";

import { useSearchParams } from "next/navigation";
import * as styles from "./RecipeBadge.css";
import { ID_TO_INEDIBLE_FOOD } from "@/constants";

interface RecipeBadgeProps {
  ingredientList: string[];
  isRecommend: boolean;
}

export default function RecipeBadge({
  ingredientList,
  isRecommend,
}: RecipeBadgeProps) {
  const searchParams = useSearchParams();
  const inedibleFoodIds = searchParams.get("inedibleFood");
  console.log("inedibleFood in badge", inedibleFoodIds);
  console.log("ingredientList in badge", ingredientList);

  const inedibleFoodNames = inedibleFoodIds
    ?.split(",")
    .map((id) => ID_TO_INEDIBLE_FOOD[id.trim()])
    .filter((name) => name !== undefined);

  const hasInedibleIngredient = inedibleFoodNames?.some((name) =>
    ingredientList.includes(name)
  );
  console.log(
    "정보",
    hasInedibleIngredient,
    inedibleFoodNames,
    ingredientList,
    isRecommend
  );

  const badgeType = isRecommend
    ? "recommend"
    : hasInedibleIngredient
    ? "inedible"
    : null;

  if (!badgeType) return null;

  const badgeText = badgeType === "recommend" ? "추천!" : "못먹는 재료";

  return (
    <div className={styles.recipeBadgeContainer({ type: badgeType })}>
      {badgeText}
    </div>
  );
}