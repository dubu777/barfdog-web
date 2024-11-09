import Image from "next/image";
import * as styles from "./RecipeCard.css";
import { ID_TO_INGREDIENT_LIST, RecipeTempData } from "@/constants";
import { subscribeText } from "../recipeSelection/RecipeSelection.css";
import { motion } from "framer-motion";
import RecipeBadge from "../recipeBadge/RecipeBadge";

interface RecipeCardProps {
  recipeTempData: RecipeTempData;
  recommendId: number;
}

export default function RecipeCard({ recipeTempData, recommendId }: RecipeCardProps) {
  console.log(recipeTempData, "recipeTempData");
  const isRecommend = recommendId === recipeTempData.id;
  return (
    <motion.div
      className={styles.recipeCardContainer}
      whileHover={{
        y: -3, // 살짝 커지게 설정
        boxShadow: "4px 8px 18px rgba(0, 0, 0, 0.1)", // 그림자 강조
      }}
      transition={{
        duration: 0.2,
      }}
    >
      <RecipeBadge ingredientList={ID_TO_INGREDIENT_LIST[recipeTempData.id]} isRecommend={isRecommend}/>
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
            <p key={`${text}-${idx}`} className={subscribeText({ type: "description" })}>{text}</p>
          ))}
        </div>
        {/* <button className={styles.detailButton}>자세히 알아보기</button> */}
        <button className={subscribeText({type: 'link'})}>자세히 알아보기</button>
      </div>
    </motion.div>
  );
}
