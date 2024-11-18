import Image from "next/image";
import * as styles from "./RecipeCard.css";
import { ID_TO_INGREDIENT_LIST, RecipeTempData } from "@/constants";
import { subscribeText } from "../RecipeSelection.css";
import { motion } from "framer-motion";
import RecipeBadge from "./recipeBadge/RecipeBadge";

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
  console.log(recipeTempData, "recipeTempData");

  const isRecommend = recommendId === recipeTempData.id;
  return (
    <motion.div
      className={styles.recipeCardContainer({
        isSelected: selectedRecipes.includes(recipeTempData.id),
      })}
      whileHover={{
        y: -3,
        boxShadow: "4px 8px 18px rgba(0, 0, 0, 0.1)",
      }}
      transition={{
        duration: 0.2,
      }}
      onClick={() => onRecipeCardSelect(recipeTempData.id)}
    >
      <RecipeBadge
        ingredientList={ID_TO_INGREDIENT_LIST[recipeTempData.id]}
        isRecommend={isRecommend}
        inedibleFood={inedibleFood}
      />
      <div className={styles.recipeImageWrapper}>
        <Image
          src={recipeTempData.imageURL}
          alt="레시피 이미지"
          width={155}
          height={155}
        />
      </div>
      <div className={styles.recipeDescriptionWrapper}>
        <div className={styles.recipeTitleWrapper}>
          <p className={subscribeText({ type: "recipeTitle" })}>
            {recipeTempData.name}
          </p>
        </div>
        <div className={styles.recipeDescripionBox}>
          {recipeTempData.description.map((text, idx) => (
            <p
              key={`${text}-${idx}`}
              className={subscribeText({ type: "description" })}
            >
              {text}
            </p>
          ))}
        </div>
        {/* <button className={styles.detailButton}>자세히 알아보기</button> */}
        <button className={subscribeText({ type: "link" })}>
          자세히 알아보기
        </button>
      </div>
    </motion.div>
  );
}
