import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import { NutrientValues } from "@/types/recipes";
import { NUTRIENT_CONDITION, NUTRIENT_MAP } from "@/constants/recipes";

interface NutrientProps {
  nutrient: NutrientValues;
  kcalPerGrams: number;
}
export default function Nutrient({ nutrient, kcalPerGrams }: NutrientProps) {
  const nutrientList = Object.entries(NUTRIENT_MAP);
  return (
    <div className={commonWrapper({ direction: 'col', gap: 8, align: 'start' })}>
      <div className={commonWrapper({ gap: 4, align: 'center', justify: 'start' })}>
        <Text type="headline2">등록 성분량</Text>
        <Text type="caption" color='gray700'>
          (100g당 / {kcalPerGrams}kcal)
        </Text>
      </div>
      <div className={commonWrapper({ direction: 'col', gap: 4, align: 'center' })}>
        <Divider thickness={1} color="gray900" />
        <div className={commonWrapper({ direction: 'row' })}>
          {nutrientList.map(([key, value]) => (
            <Text key={key} type="caption" align='center' style={{ width: `calc(100% / ${nutrientList.length})` }}>
              {value.label}
            </Text>
          ))}
        </div>
        <Divider thickness={1} color="gray900" />
        <div className={commonWrapper({ direction: 'row' })}>
          {nutrientList.map(([key, value]) => (
            <Text key={key} type="caption2" color='gray700' align='center' style={{ width: `calc(100% / ${nutrientList.length})` }}>
              {nutrient[key]}%<br />
              {NUTRIENT_CONDITION[value.condition]}
            </Text>
          ))}
        </div>
        <Divider thickness={1} color="gray900" />
      </div>
    </div>
  );
}