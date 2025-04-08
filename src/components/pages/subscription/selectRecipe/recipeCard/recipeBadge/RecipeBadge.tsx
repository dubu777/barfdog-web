"use client";

import * as styles from "./RecipeBadge.css";

interface RecipeBadgeProps {
  ingredientsText: string;
  isRecommend: boolean;
  inedibleFood: string;
}

export default function RecipeBadge({
  ingredientsText,
  isRecommend,
  inedibleFood,
}: RecipeBadgeProps) {

  if (!ingredientsText) return

  return (
    <div className={styles.recipeBadgeContainer}>
      '{ingredientsText}' 못 먹는 재료가 포함되어 있어요!
    </div>
  );
}