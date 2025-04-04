import Image from "next/image";
import * as styles from "./RecipeCard.css";
import { RecipeTempData } from "@/constants";
import { motion } from "framer-motion";
import RecipeBadge from "./recipeBadge/RecipeBadge";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Button from "@/components/common/button/Button";

interface RecipeCardProps {
  recipeTempData: RecipeTempData;
  recommendId: number;
  selectedRecipes: number[];
  inedibleFood: string;
  onRecipeCardSelect: (recipeId: number) => void;
}

export default function RecipeCard({
  recipeTempData,
  recommendId,
  selectedRecipes,
  inedibleFood,
  onRecipeCardSelect,
}: RecipeCardProps) {
  const isRecommend = recommendId === recipeTempData.id;
  const ingredientsText = recipeTempData.ingredients
    ?.filter((i) => i.trim() !== "")
    .join(", ");

  return (
    <motion.div
      className={styles.recipeCardContainer({
        isSelected: selectedRecipes.includes(recipeTempData.id),
      })}
      whileHover={{
        y: -1,
        boxShadow: "2px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
      transition={{
        duration: 0.2,
      }}
      onClick={() => onRecipeCardSelect(recipeTempData.id)}
    >
      <div className={styles.recipeCardTitleWrapper}>
        <DefaultText type="headline2">{recipeTempData.name}</DefaultText>
        <Button type="assistive" variant="text" size="sm" >
          자세히
        </Button>
      </div>
      <div className={styles.recipeCardContentWrapper}>
      <div className={styles.recipeCardLeftWrapper}>
        <div className={styles.ingredientsWrapper}>
          <DefaultText type="body2">주재료</DefaultText>
          <DefaultText type="body2">{ingredientsText}</DefaultText>
        </div>
        <div className={styles.recipeCardBadgeWrapper}>
          {recipeTempData.efficacy.map((text, idx) => (
            <Button key={idx} type="assistive" variant="outline" size="sm">
              {text}
            </Button>
          ))}
        </div>
      </div>
      <Image
        src={recipeTempData.imageURL}
        alt="레시피 이미지"
        width={88}
        height={88}
        priority
      />
      </div>
      <RecipeBadge
        ingredientsText={ingredientsText}
        isRecommend={isRecommend}
        inedibleFood={inedibleFood}
      />

    </motion.div>
  );
}
