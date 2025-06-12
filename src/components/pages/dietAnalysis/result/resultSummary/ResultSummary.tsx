import { commonWrapper } from "@/styles/common.css";
import * as styles from "../DietAnalysisResult.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import {
  ActivityLevel,
  FirstResultResponse,
  SnackCountLevel,
} from "@/types/dietAnalysis";
import Card from "@/components/common/card/Card";
import DotIcon from "public/images/dietAnalysis/square-dot.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Chips from "@/components/common/chips/Chips";
import LevelGaugeCard from "../card/levelGaugeCard/LevelGaugeCard";
import SnackIcon from "public/images/healthNote/body-check/snack.svg";
import FootIcon from "public/images/dietAnalysis/footprint.svg";
import WarningIcon from "public/images/dietAnalysis/warning.svg";
import { resultCardStyle } from "../card/levelGaugeCard/LevelGaugeCard.css";
import { INEDIBLE_FOOD_LABELS } from "@/constants/recipe";
import CheckIcon from "public/images/survey/check_small.svg";
import CloseIcon from "public/images/survey/close_small.svg";
import {
  ACTIVITY_LEVEL_MAP,
  SNACK_COUNT_LEVEL_MAP,
} from "@/constants/dietAnalysis";

interface ResultSummaryProps {
  dogName: string;
  firstResponse: FirstResultResponse;
}

export default function ResultSummary({
  dogName,
  firstResponse,
}: ResultSummaryProps) {
  const date = "2024-12-24";
  return (
    <div className={commonWrapper({ direction: "col" })}>
      <div className={styles.resultSummaryTop}>
        <DefaultText type="body3" color="gray0">
          {date}
        </DefaultText>
        <DefaultText type="title3" color="gray0">
          보호자님의 응답을 바탕으로
          <br />
          {dogName}의 건강 고민을 분석했어요
        </DefaultText>
      </div>
      <div className={styles.resultCardWrapper}>
        <Card
          shadow="strong"
          padding={16}
          gap={20}
          borderRadius={16}
          className={styles.resultSummaryCard}
        >
          <div className={styles.tempImageStyle} />
          <div
            className={commonWrapper({
              direction: "col",
              gap: 8,
              align: "start",
            })}
          >
            <DefaultText type="headline2" color="gray800">
              아래의 증상이 자주 나타나나요?
            </DefaultText>
            <div
              className={commonWrapper({
                direction: "col",
                gap: 2,
                align: "start",
              })}
            >
              {firstResponse.firstHealthConcernsSymptomsList.map((symptom) => (
                <div
                  key={symptom}
                  className={commonWrapper({
                    gap: 4,
                    justify: "start",
                  })}
                >
                  <SvgIcon src={DotIcon} size={24} />
                  <DefaultText
                    type="body2"
                    color="gray800"
                    applyLineHeight={false}
                  >
                    {symptom}
                  </DefaultText>
                </div>
              ))}
            </div>
          </div>
          <div
            className={commonWrapper({
              direction: "col",
              gap: 12,
              align: "start",
            })}
          >
            <DefaultText type="headline4">그 외 증상</DefaultText>
            <div
              className={commonWrapper({
                justify: "start",
                gap: 4,
                wrap: "wrap",
              })}
            >
              {firstResponse.healthConcernsOtherSymptomsList.map((symptom) => (
                <Chips
                  key={symptom}
                  variant="solid"
                  color="gray100"
                  borderRadius="lg"
                >
                  {symptom}
                </Chips>
              ))}
            </div>
          </div>
          <div className={commonWrapper({ gap: 8 })}>
            <LevelGaugeCard
              label="활동량"
              icon={FootIcon}
              level={ACTIVITY_LEVEL_MAP[firstResponse.activityLevel]}
              segments={5}
              color="blue"
            />
            <LevelGaugeCard
              label="간식량"
              icon={SnackIcon}
              level={SNACK_COUNT_LEVEL_MAP[firstResponse.snackCountLevel]}
              segments={3}
              color="yellow"
            />
          </div>
          <Card shadow="none" className={resultCardStyle} padding={12} gap={12}>
            <div className={commonWrapper({ gap: 6, justify: "start" })}>
              <SvgIcon src={WarningIcon} />
              <DefaultText type="headline2">알러지</DefaultText>
            </div>
            <div className={commonWrapper({ gap: 6, justify: "start" })}>
              {firstResponse.inedibleFoodType.map((food) => (
                <Chips
                  key={food}
                  variant="solid"
                  color="pinkWhite"
                  borderRadius="lg"
                  className={styles.inedibleFoodChipStyle}
                >
                  <SvgIcon
                    src={food === "NONE" ? CloseIcon : CheckIcon}
                    color="pastelRed"
                    size={18}
                  />
                  {INEDIBLE_FOOD_LABELS[food]}
                </Chips>
              ))}
            </div>
          </Card>
        </Card>
      </div>
    </div>
  );
}
