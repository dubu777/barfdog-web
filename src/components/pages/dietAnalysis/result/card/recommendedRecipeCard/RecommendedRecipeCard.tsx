import Card from "@/components/common/card/Card";
import Chips from "@/components/common/chips/Chips";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";
import { RecommendRecipeRankDto } from "@/types/dietAnalysis";
import { resultCardStyle } from "../levelGaugeCard/LevelGaugeCard.css";
import Image from "next/image";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import ArrowIcon from "public/images/header/chevron-right.svg";
import CheckIcon from "public/images/healthNote/body-check/notice-check.svg";
import * as styles from "./RecommendedRecipeCard.css";
import {
  HEALTH_CONCERN_LABEL_MAP,
  INGREDIENT_ICON_MAP,
} from "@/constants/dietAnalysis";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

interface RecommendedRecipeCardProps {
  recipe: RecommendRecipeRankDto;
  dogName: string;
}

export default function RecommendedRecipeCard({
  recipe,
  dogName,
}: RecommendedRecipeCardProps) {
  return (
    <Card shadow="strong" padding={"20/16"} gap={20} borderRadius={16}>
      <div className={commonWrapper({ justify: "start", gap: 8 })}>
        <Chips variant="solid" color="red" borderRadius="lg" size="md">
          {recipe.rank}위
        </Chips>
        <DefaultText type="headline2" color="gray800">
          {recipe.uiNameKorean}
        </DefaultText>
      </div>
      <Card
        direction="row"
        justify="start"
        className={resultCardStyle}
        gap={12}
        padding={12}
      >
        <Image
          alt="레시피이미지"
          src={recipe.recommendRecipeImgUrl}
          width={76}
          height={76}
          priority
        />
        <div
          className={commonWrapper({ justify: "start", gap: 4, wrap: "wrap" })}
        >
          {recipe.healthConcernsList.map((concern) => (
            <Chips key={concern} variant="solid" color="gray100">
              {HEALTH_CONCERN_LABEL_MAP[concern]}
            </Chips>
          ))}
        </div>
        <SvgIcon src={ArrowIcon} size={20} color="gray600" />
      </Card>
      <div
        className={commonWrapper({ direction: "col", align: "start", gap: 12 })}
      >
        <DefaultText type="headline2" color="gray800">
          {dogName}의 건강 개선 가이드
        </DefaultText>
        {recipe.healthImprovements.map(
          (
            { healthConcernsExplanationTitle, healthConcernsExplanation },
            idx
          ) => (
            <div key={idx} className={styles.healthTipGridWrapper}>
              <SvgIcon
                src={CheckIcon}
                color="blue300"
                className={styles.iconGrid}
              />
              <DefaultText
                type="label4"
                color="gray800"
                className={styles.titleGrid}
              >
                {healthConcernsExplanationTitle}
              </DefaultText>
              <DefaultText
                type="body3"
                color="gray700"
                className={styles.descriptionGrid}
              >
                {healthConcernsExplanation}
              </DefaultText>
            </div>
          )
        )}
      </div>
      <Swiper
        slidesPerView="auto"
        spaceBetween={8}
        modules={[FreeMode]}
        freeMode={true}
        className={styles.ingredientSwiper}
      >
        {recipe.primaryIngredientList.map((ingredient, index) => (
          <SwiperSlide key={index} className={styles.ingredientSlide}>
            <div className={styles.ingredientItem}>
              <div className={styles.ingredientIcon}>
                <SvgIcon src={INGREDIENT_ICON_MAP[ingredient]} size={52} />
              </div>
              <DefaultText type="caption" color="gray700">
                {ingredient}
              </DefaultText>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  );
}
