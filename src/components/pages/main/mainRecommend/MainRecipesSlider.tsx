import * as styles from "./MainRecommend.css";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { RecipeDto, SelectedHealthInfo } from "@/types";
import Text from "@/components/common/text/Text";

interface MainRecipesSliderProps {
  recipeData: RecipeDto[];
  selectedHealthDetail: SelectedHealthInfo;
}

const MainRecipesSlider = ({ recipeData, selectedHealthDetail }: MainRecipesSliderProps ) => {
  const recipeFilterData: RecipeDto[] = recipeData.filter(recipe => selectedHealthDetail.recommendRecipes?.some(recommend => recipe.name.includes(recommend)));
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
              src={recipe.imgUrl}
              alt={recipe.name}
              width={163}
              height={163}
              priority={false}
              className={styles.recommendSlideImage({ type: 'recipes' })}
            />
            <div className={styles.recipesContentBox}>
              <div style={{ marginTop: '5px' }}>
                <Text type='description' size='sm' color='black' weight='normal' align='left'>
                  {recipe.name}
                </Text>
              </div>
              <Text className={styles.recipesPrice} type='description' size='sm' color='black' weight='normal' align='left'>
                <span>1팩당 (100g)</span>
                <span>{(recipe.pricePerGram * 100).toLocaleString('ko-KR')}원</span>
              </Text>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainRecipesSlider;