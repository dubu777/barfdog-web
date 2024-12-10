import * as styles from "./MainRecommend.css";
import MainRecommendRecipes from "@/components/pages/main/mainRecommend/MainRecommendRecipes";
import MainHealthCheckSlider from "@/components/pages/main/mainRecommend/MainHealthCheckSlider";
import MainText from "@/components/pages/main/mainText/MainText";
import { useGetMainInfo } from "@/api/main/queries/useGetMainInfo";
import { useGetRecipeList } from "@/api/recipes/queries/useGetRecipeList";
import { MainRecipeDto, RecipeDto } from "@/types/main";

const MainRecommend = () => {
  const { data: mainInfoData } = useGetMainInfo();
  const { recipeDtoList: mainRecipesData }: MainRecipeDto[] = mainInfoData;

  const { data: recipesDetailData } = useGetRecipeList();
  const finalRecipeData: RecipeDto[] = recipesDetailData.map((recipe, index) => recipe.id === mainRecipesData[index].id ? {'imgUrl': mainRecipesData[index].imageUrl2, ...recipe} : recipe);

  return (
    <article className={styles.mainRecommendWrapper}>
      <>
        <div style={{ marginBottom: '4px' }}>
          <MainText type='title' size='titleLg'>
            반려견 건강에 고민이 있다면?
          </MainText>
        </div>
        <MainText type='description' size='sm' color='grey'>
          75만 데이터를 분석한 AI 추천 맞춤 식단 구독
        </MainText>
      </>
      <div className={styles.recommendSlideContainer}>
        <MainHealthCheckSlider />
        <MainRecommendRecipes recipeData={finalRecipeData}/>
      </div>
    </article>
  );
};

export default MainRecommend;