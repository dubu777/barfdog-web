import Chips from "@/components/common/chips/Chips";
import Text from "@/components/common/text/Text";
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
import { useToastStore } from "@/store/useToastStore";


interface RecipeDetailModalProps {
  recipeTempData: RecipeTempData;
  dogName: string;
  dailyRecommendKcal: number;
  recipeDto: RecipeDto;
  subscribeId: number;
  onApplyLocal: (packGrams: number, packPrice: number) => void;
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
  const toast = useToastStore((s) => s.addToast);

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
    toast("레시피를 담았어요", "above-button");
    onCommit();
    onClose();
  }
  
  return (
    <FullModalWrapper isVisible={isOpen} handleClose={onClose} headerBackgroundColor="gray50">
      <div className={commonWrapper({ direction: "col", gap: 8 })}>
        <Image
          src={recipeTempData.imageUrl}
          width={140}
          height={140}
          alt={recipeTempData.name}
          priority
        />
        <div>
          <Text type="title4" block>{recipeTempData.name}</Text>
          <Text type="headline4" color="gray500" block>
            {recipeTempData.englishName}
          </Text>
        </div>
        <div className={commonWrapper({ direction: "row", gap: 4 })}>
          {recipeTempData.ingredients.map((text, idx) => (
            <Chips
              key={idx}
              variant="solid"
              color="gray200"
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
        secondaryButtonLabel="이전"
        onPrimaryClick={handleCommit}
        onSecondaryClick={onClose}
        primaryButtonSize="lg"
      />
    </FullModalWrapper>
  );
}
