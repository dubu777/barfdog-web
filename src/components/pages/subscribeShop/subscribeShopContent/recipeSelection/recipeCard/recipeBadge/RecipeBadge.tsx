"use client";

import * as styles from "./RecipeBadge.css";

interface RecipeBadgeProps {
  ingredientList: string[];
  isRecommend: boolean;
  inedibleFood: string;
}

export default function RecipeBadge({
  ingredientList,
  isRecommend,
  inedibleFood,
}: RecipeBadgeProps) {

  const inedibleFoodNames = inedibleFood
    ?.split(",")
    .filter((name) => name !== undefined);

  const hasInedibleIngredient = inedibleFoodNames?.some((name) =>
    ingredientList.includes(name)
  );
  // console.log(
  //   "정보",
  //   hasInedibleIngredient,
  //   inedibleFoodNames,
  //   ingredientList,
  //   isRecommend
  // );

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