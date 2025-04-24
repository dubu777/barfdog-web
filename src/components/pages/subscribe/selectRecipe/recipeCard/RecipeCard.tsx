import Image from "next/image";
import * as styles from "./RecipeCard.css";
import { RecipeTempData } from "@/constants";
import { motion } from "framer-motion";
import RecipeBadge from "./recipeBadge/RecipeBadge";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Button from "@/components/common/button/Button";
import { commonWrapper } from "@/styles/common.css";
import Chips from "@/components/common/chips/Chips";
import { RecipeDto } from "@/types";
import {
  calculateSubscriptionPrice,
  SubscriptionPriceBreakdown,
} from "@/utils/subscription/calculateSubscriptionPrice";
import { useEffect, useState } from "react";

interface RecipeCardProps {
  recipeTempData: RecipeTempData;
  recipeDto: RecipeDto;
  recommendId: number;
  dailyRecommendKcal: number;
  subscribeId: number;
  selectedRecipes: number[];
  inedibleFood: string;
  onRecipeCardSelect: (recipeId: number) => void;
}

export default function RecipeCard({
  recipeTempData,
  recipeDto,
  dailyRecommendKcal,
  subscribeId,
  recommendId,
  selectedRecipes,
  inedibleFood,
  onRecipeCardSelect,
}: RecipeCardProps) {
  const isRecommend = recommendId === recipeTempData.id;
  const ingredientsText = recipeTempData.ingredients
    ?.filter((i) => i.trim() !== "")
    .join(", ");
  const isSelected = selectedRecipes.includes(recipeTempData.id);
  const [recommended, setRecommended] = useState<SubscriptionPriceBreakdown>({
    packGrams: 0,
    packPrice: 0,
  });
console.log("레시피", recipeDto);

  useEffect(() => {
    const { recommended } = calculateSubscriptionPrice({
      dailyRecommendKcal,
      recipeDto,
      subscribeId,
    });
    setRecommended(recommended);
  }, [dailyRecommendKcal, recipeDto, subscribeId]);

  return (
    <motion.div
      className={styles.recipeCardContainer({
        isSelected,
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
      <RecipeBadge ingredientsText={ingredientsText} />
      <div className={commonWrapper({ direction: "row", gap: 12 })}>
        <Image
          src={recipeTempData.imageURL}
          alt="레시피 이미지"
          width={88}
          height={88}
          priority
        />
        <div
          className={commonWrapper({
            direction: "col",
            gap: 8,
            align: "start",
          })}
        >
          <div
            className={commonWrapper({
              direction: "col",
              gap: 2,
              align: "start",
            })}
          >
            <DefaultText type="headline2">{recipeTempData.name}</DefaultText>
            <DefaultText type="caption">
              {recipeTempData.englishName}
            </DefaultText>
          </div>

          <div className={commonWrapper({ gap: 4, justify: "start" })}>
            {recipeTempData.efficacy.map((text, idx) => (
              <Chips
                key={idx}
                variant="solid"
                color="blue50"
                size="sm"
                borderRadius="lg"
              >
                {text}
              </Chips>
            ))}
          </div>
        </div>
      </div>
      <div className={commonWrapper({ gap: 4, justify: "end" })}>
        <div className={styles.recipeGramInputBox}>
          <DefaultText type="headline4" color="gray700">
            {recommended.packGrams}g
          </DefaultText>
        </div>
        <div className={styles.recipeGramInputBox}>
          <DefaultText type="headline4" color="gray700">
            {recommended.packPrice.toLocaleString()}원
          </DefaultText>
        </div>
        <Button type="primary" variant="outline" size="sm">
          {isSelected ? "빼기" : "담기"}
        </Button>
      </div>
    </motion.div>
  );
}
