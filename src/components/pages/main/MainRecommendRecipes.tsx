'use client';

import * as mainStyles from "@/components/pages/main/main.css";
import RecipesRecommendSlider from "@/components/pages/main/slider/RecipesRecommendSlider";
import { RecipeDetailDataProps } from "@/components/pages/main/MainRecommend";
import { HealthCheckDetailProps, HealthCheckList } from "@/constants/mainData";
import { useSelectedHealthStore } from "@/store/mainStore";

const MainRecommendRecipes = ({ recipeData }: { recipeData: RecipeDetailDataProps }) => {
  const { selectedHealth } = useSelectedHealthStore();
  const selectedHealthDetail: HealthCheckDetailProps = HealthCheckList.find(v => v.key === selectedHealth.key);
  return (
    <>
      <div className={mainStyles.resultList}>
        <h3 className={mainStyles.mainTitle({ size: 'lg', weight: 'normal' })} style={{ marginBottom: '4px' }}>
          <b className={mainStyles.pointColor}>{selectedHealthDetail.name} </b>
          에 대한 고민이 있으신가요?
        </h3>
        <p className={mainStyles.mainDescription({ size: 'sm' })}>{selectedHealthDetail.description}</p>
      </div>
      <RecipesRecommendSlider
        recipeData={recipeData}
        selectedHealthDetail={selectedHealthDetail}
      />
    </>
  );
};

export default MainRecommendRecipes;