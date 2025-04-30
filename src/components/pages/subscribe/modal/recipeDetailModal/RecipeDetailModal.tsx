import Chips from "@/components/common/chips/Chips";
import DefaultText from "@/components/common/defaultText/DefaultText";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import { recipeDetailTab, RecipeTempData } from "@/constants";
import { commonWrapper } from "@/styles/common.css";
import Image from "next/image";
import * as styles from "./RecipeDetailModal.css";
import TabBar from "@/components/common/tabBar/TabBar";
import MealAmountSelector from "./mealAmountSelector/MealAmountSelector";
import RecipeBenefits from "./recipeBenefits/RecipeBenefits";
import RecipeIngredientsList from "./recipeIngredients/RecipeIngredients";
import { useRef } from "react";
import { scrollToElement } from "@/utils/scrollToElement";
import { RecipeDto } from "@/types";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";

interface RecipeDetailModalProps {
  recipeTempData: RecipeTempData;
  dogName: string;
  dailyRecommendKcal: number;
  recipeDto: RecipeDto;
  subscribeId: number;
  onApplyLocal: (packGrams: number, orderPrice: number) => void;
  onCommit: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function RecipeDetailModal({
  recipeTempData,
  dogName,
  dailyRecommendKcal,
  recipeDto,
  subscribeId,
  onApplyLocal,
  onCommit,
  isOpen,
  onClose,
}: RecipeDetailModalProps) {
  const refs: Record<string, React.RefObject<HTMLDivElement>> = {
    amount: useRef(null),
    benefits: useRef(null),
    ingredients: useRef(null),
  };

  const tabs = recipeDetailTab.map((tab) => ({
    ...tab,
    onInit: () => scrollToElement(refs[tab.value!].current),
  }));

  const handleCommit = () => {
    onCommit();
    onClose();
  }
  
  return (
    <FullModalWrapper isVisible={isOpen} handleClose={onClose}>
      <div className={commonWrapper({ direction: "col", gap: 8 })}>
        <Image
          src={recipeTempData.imageURL}
          width={140}
          height={140}
          alt={recipeTempData.name}
          priority
        />
        <div>
          <DefaultText type="title4">{recipeTempData.name}</DefaultText>
          <DefaultText type="headline4" color="gray500">
            {recipeTempData.englishName}
          </DefaultText>
        </div>
        <div className={commonWrapper({ direction: "row", gap: 4 })}>
          {recipeTempData.ingredients.map((text, idx) => (
            <Chips
              key={idx}
              variant="solid"
              color="blue50"
              size="sm"
              borderRadius="sm"
            >
              {text}
            </Chips>
          ))}
        </div>
      </div>
      <div className={styles.recipeDetailContentWrapper}>
        <div className={styles.recipeDetailTabBarWrapper}>
          <TabBar variant="text" tabs={tabs} />
        </div>
        <MealAmountSelector
          ref={refs.amount}
          recipeId={recipeTempData.id}
          dogName={dogName}
          dailyRecommendKcal={dailyRecommendKcal}
          recipeDto={recipeDto}
          subscribeId={subscribeId}
          onApply={onApplyLocal}
        />
        <RecipeBenefits ref={refs.benefits} />
        <RecipeIngredientsList ref={refs.ingredients} />
      </div>
      <ButtonDocked
        type="dual-button"
        primaryButtonLabel="레시피 담기"
        secondaryButtonLabel="취소"
        onPrimaryClick={handleCommit}
        onSecondaryClick={onClose}
        primaryButtonSize="lg"
      />
    </FullModalWrapper>
  );
}
