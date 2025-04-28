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

interface RecipeDetailModalProps {
  recipeTempData: RecipeTempData;
  dogName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function RecipeDetailModal({
  recipeTempData,
  dogName,
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
          <MealAmountSelector ref={refs.amount} recipeId={recipeTempData.id} dogName={dogName}/>
          <RecipeBenefits ref={refs.benefits}/>
          <RecipeIngredientsList ref={refs.ingredients}/>
      </div>
    </FullModalWrapper>
  );
}
