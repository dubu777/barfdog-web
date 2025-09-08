import Text from "@/components/common/text/Text";
import { commonWrapper } from "@/styles/common.css";
import * as styles from "../DietAnalysisResult.css";
import { RecommendRecipeRankDto } from "@/types/dietAnalysis";
import RecommendedRecipeCard from "../card/recommendedRecipeCard/RecommendedRecipeCard";
import BowlIcon from "public/images/dietAnalysis/feed-bowl.svg";

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
        <Text type="title3">
          {dogName}에게 <span className={styles.pointText}>딱 맞는</span>
          <br />
          <span className={styles.pointText}>건강한 식사를</span> 만나보세요
        </Text>
        <BowlIcon />
      </div>
      {recommendRecipeList.map((recipe) => (
        <RecommendedRecipeCard
          key={recipe.recommendRecipeId}
          recipe={recipe}
          dogName={dogName}
        />
      ))}
    </div>
  );
}
