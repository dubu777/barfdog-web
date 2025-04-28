import { commonWrapper } from "@/styles/common.css";
import { forwardRef } from "react";
import { recipeDetailSection } from "../RecipeDetailModal.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { getNameWithPossessiveSuffix } from "@/utils";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import InputField from "@/components/common/inputField/InputField";
import Button from "@/components/common/button/Button";

interface MealAmountSelectorProps {
  dogName: string;
  recipeId: number;
}

const MealAmountSelector = forwardRef<HTMLDivElement, MealAmountSelectorProps>(
  function MealAmountSelector({ dogName, recipeId }, ref) {
    const summary = useSubscriptionStore((s) => s.priceSummary[recipeId]);
    return (
      <section ref={ref} className={recipeDetailSection}>
        <DefaultText type="title4">{getNameWithPossessiveSuffix(dogName)}의<br/>한 끼 추천 급여량을 계산했어요</DefaultText>
        <div className={commonWrapper({ direction: "row", justify: "between", padding: 16, backgroundColors: "gray50", borderRadius: 8 })}>
          <div className={commonWrapper({ direction: "col", gap: 4, width: "auto", align: "start" })}>
          <DefaultText type="label2" color="gray900">한 끼 추천 급여량</DefaultText>
          <DefaultText type="label2" color="red">구독 급여량</DefaultText>
          <DefaultText type="label2" color="red">한 팩당 가격</DefaultText>
          </div>
          <div className={commonWrapper({ direction: "col", gap: 4, width: "auto", align: "end" })}>
          <DefaultText type="label2" color="gray900">{summary.packGrams}g</DefaultText>
          <DefaultText type="label2" color="red">{summary.packGrams}g</DefaultText>
          <DefaultText type="label2" color="red">{summary.packPrice.toLocaleString()}원</DefaultText>
          </div>
        </div>
        <DefaultText type="label2">
          급여량 수정
        </DefaultText>
        <InputField />
        <Button type="primary" size="inputButton" buttonColor="red" >적용</Button>
      </section>
    );
  }
);

MealAmountSelector.displayName = "MealAmountSelector";

export default MealAmountSelector;