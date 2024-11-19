import * as styles from "./MainRecommend.css";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { RecipeDetailDataProps } from "@/components/pages/main/mainRecommend/MainRecommend";
import MainText from "@/components/pages/main/mainText/MainText";

const MainRecipesSlider = ({ recipeData, selectedHealthDetail }: { recipeData: RecipeDetailDataProps[], selectedHealthDetail: HealthCheckDetailProps }) => {
  const recipeFilterData = recipeData.filter(recipe => selectedHealthDetail.recommendRecipes?.some(recommend => recipe.name.includes(recommend)));
  return (
    <Swiper
      slidesPerView='auto'
      spaceBetween={18}
      className={styles.recommendSlideList({ type: 'recipes' })}
    >
      {recipeFilterData.map(recipe => (
        <SwiperSlide
          key={recipe.id}
          className={styles.recommendSlideBox({ type: 'recipes' })}
          style={{ width: 'auto !important' }}
        >
          <Link href={`/store/${recipe.id}`}>
            <Image
              src={recipe.imageUrl}
              alt={recipe.name}
              width={163}
              height={163}
              priority={false}
              className={styles.recommendSlideImage({ type: 'recipes' })}
            />
            <div className={styles.recipesContentBox}>
              <div style={{ marginTop: '5px' }}>
                <MainText type='description' size='sm' color='black' weight='normal' align='left'>
                  {recipe.name}
                </MainText>
              </div>
              <MainText className={styles.recipesPrice} type='description' size='sm' color='black' weight='normal' align='left'>
                <span>1팩당 (100g)</span>
                <span>{(recipe.pricePerGram * 100).toLocaleString('ko-KR')}원</span>
              </MainText>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainRecipesSlider;