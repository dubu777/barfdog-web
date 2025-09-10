import { commonWrapper } from "@/styles/common.css";
import InfoText from "@/components/common/typography/infoText/InfoText";
import DryMatter from "./dryMatter/DryMatter";
import Nutrient from "./nutrient/Nutrient";
import { RECIPES_INFO } from "@/constants/recipes";
import { DryMatterValues, NutrientValues } from "@/types/recipes";

interface GuaranteedAnalysisProps {
  recipeId: number;
  kcalPerGrams?: number;
  nutrient?: NutrientValues;
  dryMatter?: DryMatterValues;
} 
export default function GuaranteedAnalysis({
  recipeId,
  kcalPerGrams = RECIPES_INFO[recipeId].kcalPerGrams,
  nutrient = RECIPES_INFO[recipeId].nutrient,
  dryMatter = RECIPES_INFO[recipeId].dryMatter,
}: GuaranteedAnalysisProps) {
  return (
    <div className={commonWrapper({ direction: 'col', gap: 40, align: 'start' })}>
      <Nutrient nutrient={nutrient} kcalPerGrams={kcalPerGrams} />
      <DryMatter dryMatter={dryMatter} />
      <div className={commonWrapper({ direction: 'col', align: 'start' })}>
        <InfoText 
          type='caption2' 
          color='gray500' 
          text="바프독은 안정적인 수치를 위해 분기별로 성분분석을 진행하고 있으며, 분기별 수치는 변동될 수 있습니다." 
        />
        <InfoText 
          type='caption2' 
          color='gray500' 
          text="생산 주차에 따라 수치는 변동될 수 있으며, 안정적인 수치 유지를 위해 최선을 다하고 있습니다." 
        />
      </div>
    </div>
  );
}