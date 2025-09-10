import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import InfoBox from "@/components/common/infoBox/InfoBox";
import InfoText from "@/components/common/typography/infoText/InfoText";
import { RECIPES_INFO } from "@/constants/recipes";

interface AllIngredientsProps {
  recipeId: number;
  totalIngredients?: string;
}
export default function AllIngredients({
  recipeId,
  totalIngredients = RECIPES_INFO[recipeId].totalIngredientsInfo,
}: AllIngredientsProps) {
  return (
    <div className={commonWrapper({ direction: 'col', gap: 26, align: 'start' })}>
      <div className={commonWrapper({ direction: 'col', gap: 8, align: 'start' })}>
        <Text type="headline2">전 성분</Text>
        <Text type="body3" color="gray500">{totalIngredients}</Text>
      </div>
      <InfoText
        color='gray500' 
        text='원재료 수급 사정에 따라 원산지가 일부 변동 될 수있으나 고품질의 재료로 대체하여 사용합니다.  GMO 및 중국산 원료 등은 사용하지 않습니다.'
      />
      <InfoBox
        fullWidth
        text={(
          <div className={commonWrapper({ direction: 'col', gap: 2, align: 'start' })}>
            <Text type='label3' color='gray700'>오메가-3는 추가 급여해 주세요</Text>
            <Text type='caption2' color='gray700'>오메가-3는 공기 접촉 시 산패가 시작되어 레시피에 포함하지 않으니 추가 급여를 권장합니다</Text>
          </div>
        )}
      />
    </div>
  );
}