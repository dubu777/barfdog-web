import Card from "@/components/common/card/Card";
import Chips from "@/components/common/chips/Chips";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";
import { RecommendRecipeRankDto } from "@/types/dietAnalysis";

interface RecommendedRecipeCardProps {
  recipe: RecommendRecipeRankDto;
}

export default function RecommendedRecipeCard({
  recipe,
}: RecommendedRecipeCardProps) {
  return (
    <Card shadow="strong" padding={"20/16"} gap={20}>
      <div className={commonWrapper({ justify: "start", gap: 8 })}>
        <Chips variant="solid" color="red" borderRadius="lg" size="md">
          {recipe.rank}위
        </Chips>
        <DefaultText type="headline2" color="gray800">
          {recipe.uiNameKorean}
        </DefaultText>
      </div>
    </Card>
  );
}
