import Text from "@/components/common/text/Text";
import MainRecipesSlider from "@/components/pages/main/temp/mainRecommend/MainRecipesSlider";
import { HealthCheckList } from "@/constants";
import { useMainStore } from "@/store/useMainStore";
import { pointColor } from "@/styles/common.css";
import { RecipeDto, SelectedHealthInfo } from "@/types";

const MainRecommendRecipes = ({ recipeData }: { recipeData: RecipeDto[] }) => {
  const { selectedHealth } = useMainStore();
  const selectedHealthDetail: SelectedHealthInfo = HealthCheckList.find(v => v.key === selectedHealth.key)!;

  return (
    <>
      <div>
        <div style={{ marginBottom: '4px' }}>
          <Text type='title' size='lg' weight='normal'>
            <b className={pointColor}>
              {selectedHealthDetail.name}&nbsp;
            </b>
            에 대한 고민이 있으신가요?
          </Text>
        </div>
        <Text type='description' size='sm' color='grey'>
          {selectedHealthDetail.description}
        </Text>
      </div>
      <MainRecipesSlider
        recipeData={recipeData}
        selectedHealthDetail={selectedHealthDetail}
      />
    </>
  );
};

export default MainRecommendRecipes;