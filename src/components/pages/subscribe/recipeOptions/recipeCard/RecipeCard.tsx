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
import { useFormContext } from "react-hook-form";
import RecipeDetailModal from "../../modal/recipeDetailModal/RecipeDetailModal";
import useModal from "@/hooks/useModal";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";

interface RecipeCardProps {
  recipeTempData: RecipeTempData;
  recipeDto: RecipeDto;
  recommendId: number;
  dailyRecommendKcal: number;
  subscribeId: number;
  inedibleFood: string;
  dogName: string;
}

export default function RecipeCard({
  recipeTempData,
  recipeDto,
  dailyRecommendKcal,
  subscribeId,
  recommendId,
  inedibleFood,
  dogName,
}: RecipeCardProps) {
  const setPriceSummary = useSubscriptionStore((state) => state.setPriceSummary);
  const {isOpen, onClose, onToggle} = useModal();
  const isRecommend = recommendId === recipeTempData.id;
  const ingredientsText = recipeTempData.ingredients
    ?.filter((i) => i.trim() !== "")
    .join(", ");

  const [priceBreakdown, setPriceBreakdown] =
    useState<SubscriptionPriceBreakdown>({
      packGrams: 0,
      packPrice: 0,
      pricePer10g: 0,
    });
  console.log("레시피", recipeDto);

  useEffect(() => {
    const { recommended, custom } = calculateSubscriptionPrice({
      dailyRecommendKcal,
      recipeDto,
      subscribeId,
      // customPackGrams: 200
    });
    const target = custom ?? recommended;
    // 필요한 두 필드만 뽑아서 저장
    setPriceSummary(recipeTempData.id, {
      packGrams: target.packGrams,
      packPrice: target.packPrice,
      pricePer10g: target.pricePer10g,
    });
  }, [dailyRecommendKcal, recipeDto, subscribeId]);
  const isSelected = false;
  const handleToggleRecipe = () => {
    if (!isSelected) {
      onToggle();
    }
  };
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
          <div className={commonWrapper({ gap: 4, justify: "start" })}>
            <Chips variant="solid" color="gray700" size="sm" borderRadius="sm">
              추천 급여량 {priceBreakdown.packGrams}g
            </Chips>
            <Chips variant="solid" color="gray700" size="sm" borderRadius="sm">
              10g당 {priceBreakdown.pricePer10g.toLocaleString()}원
            </Chips>
          </div>
        </div>
      </div>
      <div className={commonWrapper({ gap: 4, justify: "end" })}>
      <div className={styles.recipeGramInputBox}>
          <DefaultText type="headline4" color="gray700">
            {priceBreakdown.packGrams}g
          </DefaultText>
        </div>
        <div className={styles.recipeGramInputBox}>
          <DefaultText type="headline4" color="gray700">
            한 팩 가격{priceBreakdown.packPrice.toLocaleString()}원
          </DefaultText>
        </div>
        <Button type="primary" variant="outline" size="sm" textColor={isSelected ? "gray900" : "red"} onClick={handleToggleRecipe}>
          {isSelected ? "빼기" : "담기"}
        </Button>
      </div>
      <RecipeDetailModal isOpen={isOpen} onClose={onClose} recipeTempData={recipeTempData} dogName={dogName}/>
    </motion.div>
  );
}
