import { forwardRef } from "react";
import { commonWrapper } from "@/styles/common.css";
import CheckIcon from "public/images/healthNote/body-check/notice-check.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Text from "@/components/common/text/Text";
import { RECIPES_INFO } from "@/constants/recipes";
import { recipeEfficacyWrapper } from "../Recipe.css";

interface RecipeEfficacyProps {
  recipeId: number;
  efficacyList?: {
    title: string;
    description: string;
  };
}

const RecipeEfficacy = forwardRef<HTMLDivElement, RecipeEfficacyProps>(
  function RecipeEfficacy({ recipeId, efficacyList }, ref) {
    const efficacyData = efficacyList ?? RECIPES_INFO[recipeId].efficacy;
    return (
      <section ref={ref} className={recipeEfficacyWrapper}>
        <Text type="title4">레시피의 효능</Text>
        <div className={commonWrapper({ direction: "col", gap: 20 })}>
          {efficacyData.map((efficacy) => (
            <div
              key={efficacy.title}
              className={commonWrapper({
                gap: 6,
                align: "start",
                justify: "start",
              })}
            >
              <SvgIcon src={CheckIcon} size={24} color="blue400" />
              <div
                className={commonWrapper({
                  direction: "col",
                  gap: 8,
                  align: "start",
                })}
              >
                <Text type="headline2">{efficacy.title}</Text>
                <Text type="body3" color="gray500">
                  {efficacy.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
);

RecipeEfficacy.displayName = "RecipeEfficacy";

export default RecipeEfficacy;
