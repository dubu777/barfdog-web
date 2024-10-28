import * as styles from "@/components/pages/main/main.css";
import axiosInstance from "@/api/axiosInstance";
import MainRecommendRecipes from "@/components/pages/main/MainRecommendRecipes";
import HealthCheckSlider from "@/components/pages/main/slider/HealthCheckSlider";

interface MainRecipesDataProps {
  id: number;
  name: string;
  description: string;
  uiNameKorean: string;
  uiNameEnglish: string;
  filename1: string;
  filename2: string;
  imageUrl1: string;
  imageUrl2: string;
}

export interface RecipeDetailDataProps extends RecipesDataProps {
  description: string;
  leaked: string;
  ingredients: string;
  modifiedDate: string;
  gramPerKcal: number;
  pricePerGram: number;
  inStock: boolean;
}

const MainRecommend = async ({ mainRecipesData }: { mainRecipesData: MainRecipesDataProps }) => {
  const recipesResponse = await axiosInstance.get('/api/recipes');
  const recipesDetailData = recipesResponse.data._embedded.recipeListResponseDtoList.sort((a, b) => a.id - b.id);
  const finalRecipeData: RecipeDetailDataProps = recipesDetailData.map((recipe, index) => recipe.id === mainRecipesData[index].id ? {'imageUrl': mainRecipesData[index].imageUrl2, ...recipe} : recipe);

  return (
    <article className={styles.mainRecommendWrapper}>
      <>
        <h2
          className={styles.mainTitle({ size: 'titleLg' })}
          style={{ marginBottom: '4px' }}
        >
          반려견 건강에 고민이 있다면?
        </h2>
        <p
          className={styles.mainDescription({ size: 'sm' })}
        >
          75만 데이터를 분석한 AI 추천 맞춤 식단 구독
        </p>
      </>
      <div className={styles.recommendSlideContainer}>
        <HealthCheckSlider />
        <MainRecommendRecipes recipeData={finalRecipeData}/>
      </div>
    </article>
  );
};

export default MainRecommend;