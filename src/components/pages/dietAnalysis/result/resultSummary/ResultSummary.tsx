import { commonWrapper } from "@/styles/common.css";
import * as styles from "../DietAnalysisResult.css";
import Text from "@/components/ui/text/Text";
import { FirstResultResponse } from "@/types/dietAnalysis";
import Card from "@/components/ui/card/Card";
import DotIcon from "public/images/dietAnalysis/square-dot.svg";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Chips from "@/components/ui/chips/Chips";
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
  HEALTH_CONCERN_IMAGE_MAP,
  SNACK_COUNT_LEVEL_MAP,
} from "@/constants/dietAnalysis";
import { HealthConcernType } from "@/types";

interface ResultSummaryProps {
  dogName: string;
  firstResponse: FirstResultResponse;
  firstHealthConcerns: HealthConcernType & "NONE";
}

export default function ResultSummary({
  dogName,
  firstResponse,
  firstHealthConcerns,
}: ResultSummaryProps) {
  const date = "2024-12-24";
  const ConcernIcon =
    firstHealthConcerns !== "NONE"
      ? HEALTH_CONCERN_IMAGE_MAP[firstHealthConcerns]
      : null;
  return (
    <div className={commonWrapper({ direction: "col" })}>
      <div className={styles.resultSummaryTop}>
        <Text type="body3" color="gray0">
          {firstResponse.surveyReportModifiedDate}
        </Text>
        <Text type="title3" color="gray0">
          보호자님의 응답을 바탕으로
          <br />
          {dogName}의 건강 고민을 분석했어요
        </Text>
      </div>
      <div className={styles.resultCardWrapper}>
        <Card
          shadow="strong"
          padding={16}
          gap={20}
          borderRadius={16}
          className={styles.resultSummaryCard}
        >
          {ConcernIcon && (
            <SvgIcon
              src={ConcernIcon}
              className={styles.healthConcernsImageWrapper}
            />
          )}
          <div
            className={commonWrapper({
              direction: "col",
              gap: 8,
              align: "start",
            })}
          >
            <Text type="headline2" color="gray800">
              아래의 증상이 자주 나타나나요?
            </Text>
            <div
              className={commonWrapper({
                direction: "col",
                gap: 2,
                align: "start",
              })}
            >
              {firstResponse.firstHealthConcernSymptomList.map((symptom) => (
                <div
                  key={symptom}
                  className={commonWrapper({
                    gap: 4,
                    justify: "start",
                  })}
                >
                  <SvgIcon src={DotIcon} size={24} />
                  <Text type="body2" color="gray800" applyLineHeight={false}>
                    {symptom}
                  </Text>
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
            <Text type="headline4">그 외 증상</Text>
            <div
              className={commonWrapper({
                justify: "start",
                gap: 4,
                wrap: "wrap",
              })}
            >
              {firstResponse.healthConcernOtherSymptomList.map((symptom) => (
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
          <Card className={resultCardStyle} padding={12} gap={12}>
            <div className={commonWrapper({ gap: 6, justify: "start" })}>
              <SvgIcon src={WarningIcon} />
              <Text type="headline2">알러지</Text>
            </div>
            <div className={commonWrapper({ gap: 6, justify: "start" })}>
              {firstResponse.foodAllergyTypes.map((food) => (
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
