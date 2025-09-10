import { commonWrapper } from "@/styles/common.css";
import CheckIcon from "public/images/healthNote/body-check/notice-check.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Text from "@/components/common/text/Text";
import { RECIPES_INFO } from "@/constants/recipes";

interface RecipeEfficacyProps {
  recipeId: number;
  efficacyList?: {
    title: string;
    description: string;
  }
}

export default function RecipeEfficacy({ 
  recipeId, 
  efficacyList
}: RecipeEfficacyProps) {
  const efficacyData = efficacyList ?? RECIPES_INFO[recipeId].efficacy;
  return (
    <div className={commonWrapper({ direction: 'col', padding: '40/20', align: 'start', gap: 20 })}>
      <Text type="title4">레시피의 효능</Text>
      <div className={commonWrapper({ direction: 'col', gap: 20 })}>
        {efficacyData.map((efficacy) => (
          <div key={efficacy.title} className={commonWrapper({ gap: 6, align: 'start', justify: 'start' })}>
            <SvgIcon src={CheckIcon} size={24} color="blue400" />
            <div className={commonWrapper({ direction: 'col', gap: 8, align: 'start' })}>
              <Text type="headline2">{efficacy.title}</Text>
              <Text type="body3" color="gray500">{efficacy.description}</Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}