'use client';

import MainRecipesSlider from "@/components/pages/main/mainRecommend/MainRecipesSlider";
import MainText from "@/components/pages/main/mainText/MainText";
import { RecipeDetailDataProps } from "@/components/pages/main/mainRecommend/MainRecommend";
import { HealthCheckList } from "@/constants/mainData";
import { useMainStore } from "@/store/useMainStore";
import {pointColor} from "@/styles/common.css";

const MainRecommendRecipes = ({ recipeData }: { recipeData: RecipeDetailDataProps }) => {
  const { selectedHealth } = useMainStore();
  const selectedHealthDetail = HealthCheckList.find(v => v.key === selectedHealth.key);
  return (
    <>
      <div>
        <div style={{ marginBottom: '4px' }}>
          <MainText type='title' size='lg' weight='normal'>
            <b className={pointColor}>
              {selectedHealthDetail.name}&nbsp;
            </b>
            에 대한 고민이 있으신가요?
          </MainText>
        </div>
        <MainText type='description' size='sm' color='grey'>
          {selectedHealthDetail.description}
        </MainText>
      </div>
      <MainRecipesSlider
        recipeData={recipeData}
        selectedHealthDetail={selectedHealthDetail}
      />
    </>
  );
};

export default MainRecommendRecipes;