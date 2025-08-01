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

interface RecommendedRecipeCardProps {
  recipe: RecommendRecipeRankDto;
  dogName: string;
}

export default function RecommendedRecipeCard({
  recipe,
  dogName,
}: RecommendedRecipeCardProps) {
  console.log("recipe", recipe.recommendRecipeImgUrl);
  const symptoms = ["임시 데이터1", "임시 데이터2"];
  return (
    <Card shadow="strong" padding={"20/16"} gap={20}>
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
        <div className={commonWrapper({ justify: "start", gap: 4 })}>
          {symptoms.map((symptom) => (
            <Chips key={symptom} variant="solid" color="gray100">
              {symptom}
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
        <div className={styles.healthTipGridWrapper}>
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
            임시 데이터 임시 데이터
          </DefaultText>
          <DefaultText
            type="body3"
            color="gray700"
            className={styles.descriptionGrid}
          >
            {recipe.recommendRecipeDescription}
          </DefaultText>
        </div>
      </div>
    </Card>
  );
}
