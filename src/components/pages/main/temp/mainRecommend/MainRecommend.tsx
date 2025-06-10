import * as styles from "./MainRecommend.css";
import MainRecommendRecipes from "@/components/pages/main/temp/mainRecommend/MainRecommendRecipes";
import MainHealthCheckSlider from "@/components/pages/main/temp/mainRecommend/MainHealthCheckSlider";
import { useGetMainInfo } from "@/api/main/queries/useGetMainInfo";
import { useGetRecipeList } from "@/api/recipes/queries/useGetRecipeList";
import { MainRecipeDto, RecipeDto } from "@/types";
import Text from "@/components/common/text/Text";

const MainRecommend = () => {
  const { data: mainInfoData } = useGetMainInfo();
  const mainRecipesData: MainRecipeDto[] = mainInfoData?.recipeDtoList ?? [];
  console.log(mainInfoData)
  const { data: recipesDetailData } = useGetRecipeList();
  const finalRecipeData: RecipeDto[] 
    = (recipesDetailData ?? []).map((recipe, index) => 
      recipe.id === mainRecipesData[index]?.id
        ? { ...recipe, imgUrl: mainRecipesData[index].imageUrl2 } 
        : recipe
      );

  return (
    <article className={styles.mainRecommendWrapper}>
      <>
        <div className={styles.recommendTitle}>
          <Text type='title' size='titleLg' weight='bold'>
            반려견 건강에 고민이 있다면?
          </Text>
        </div>
        <Text type='description' size='sm' color='grey'>
          75만 데이터를 분석한 AI 추천 맞춤 식단 구독
        </Text>
      </>
      <div className={styles.recommendSlideContainer}>
        <MainHealthCheckSlider />
        <MainRecommendRecipes recipeData={finalRecipeData}/>
      </div>
    </article>
  );
};

export default MainRecommend;