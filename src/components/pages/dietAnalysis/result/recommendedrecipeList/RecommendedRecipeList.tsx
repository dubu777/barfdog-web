import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";
import * as styles from "../DietAnalysisResult.css";
import Card from "@/components/common/card/Card";
import {
  RecommendRecipeRankDto,
  ThirdResultResponse,
} from "@/types/dietAnalysis";
import RecommendedRecipeCard from "../card/recommendedRecipeCard/RecommendedRecipeCard";

interface RecommendedRecipeListProps {
  dogName: string;
  recommendRecipeList: RecommendRecipeRankDto[];
}

export default function RecommendedRecipeList({
  dogName,
  recommendRecipeList,
}: RecommendedRecipeListProps) {
  return (
    <div
      className={commonWrapper({ direction: "col", gap: 20, padding: "0/20" })}
    >
      <div className={commonWrapper({ justify: "between" })}>
        <DefaultText type="title3">
          {dogName}에게 <span className={styles.pointText}>딱 맞는</span>
          <br />
          <span className={styles.pointText}>건강한 식사를</span> 만나보세요
        </DefaultText>
        <div className={styles.tempIconStyle} />
      </div>
      {recommendRecipeList.map((recipe) => (
        <RecommendedRecipeCard key={recipe.recommendRecipeId} recipe={recipe} />
      ))}
    </div>
  );
}
