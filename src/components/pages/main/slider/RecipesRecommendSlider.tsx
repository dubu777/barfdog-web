import React from 'react';
import * as mainStyles from "@/components/pages/main/main.css";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { RecipeDetailDataProps } from "@/components/pages/main/MainRecommend";
import { HealthCheckDetailProps } from "@/constants/mainData";

const RecipesRecommendSlider = ({ recipeData, selectedHealthDetail }: { recipeData: RecipeDetailDataProps[], selectedHealthDetail: HealthCheckDetailProps }) => {
  const recipeFilterData: RecipeDetailDataProps[] = recipeData.filter(recipe => selectedHealthDetail.recommendRecipes?.some(recommend => recipe.name.includes(recommend)));
  return (
    <Swiper
      slidesPerView='auto'
      spaceBetween={18}
      className={mainStyles.recommendSlideList({ type: 'recipes' })}
    >
      {recipeFilterData.map(recipe => (
        <SwiperSlide
          key={recipe.id}
          className={mainStyles.recommendSlideBox({ type: 'recipes' })}
          style={{ width: 'auto !important' }}
        >
          <Link href={`/store/${recipe.id}`}>
            <Image
              src={recipe.imageUrl}
              alt={recipe.name}
              width={163}
              height={163}
              priority={false}
              className={mainStyles.recommendSlideImage({ type: 'recipes' })}
            />
            <div className={mainStyles.recipesContentBox}>
              <p className={mainStyles.mainDescription({ size: 'sm', color: 'black', weight: 'normal', align: 'left' })}>
                {recipe.name}
              </p>
              <p
                className={`${mainStyles.recipesPrice} ${mainStyles.mainDescription({ size: 'sm', color: 'black', weight: 'normal', align: 'left' })}`}
                style={{ marginTop: '5px' }}
              >
                <span>1팩당 (100g)</span>
                <span>{(recipe.pricePerGram * 100).toLocaleString('ko-KR')}원</span>
              </p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RecipesRecommendSlider;