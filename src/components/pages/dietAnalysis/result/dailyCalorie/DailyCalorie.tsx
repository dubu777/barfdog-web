import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";
import * as styles from "../DietAnalysisResult.css";
import ScaleIcon from "public/images/dietAnalysis/scale.svg";
import CheckIcon from "public/images/icons/check_small.svg";
import ThumbsIcon from "public/images/dietAnalysis/thumbs-up.svg";
import Card from "@/components/common/card/Card";
import Divider from "@/components/common/divider/Divider";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { DAILY_CALORIE_TEXT } from "@/constants/dietAnalysis";

interface DailyCalorieProps {
  dogName: string;
  dailyCalorie: number;
}

export default function DailyCalorie({
  dogName,
  dailyCalorie,
}: DailyCalorieProps) {
  return (
    <div
      className={commonWrapper({ direction: "col", gap: 20, padding: "0/20" })}
    >
      <div className={commonWrapper({ justify: "between" })}>
        <DefaultText type="title3">
          {dogName}의 건강 상태에 <br />
          따른 <span className={styles.pointText}>추천 식사량</span>이에요
        </DefaultText>
        <ScaleIcon />
      </div>
      <Card shadow="strong" padding={"20/16"} gap={20}>
        <div className={commonWrapper({ justify: "between" })}>
          <div
            className={commonWrapper({
              direction: "col",
              align: "start",
              gap: 2,
            })}
          >
            <DefaultText type="headline2" applyLineHeight={false}>
              <div className={commonWrapper({ justify: "start", gap: 2 })}>
                <div className={styles.pointTextBox}>{dogName}</div>의
              </div>
            </DefaultText>
            <DefaultText type="headline2" applyLineHeight={false}>
              하루 권장 칼로리
            </DefaultText>
            <div
              className={commonWrapper({
                justify: "start",
                gap: 2,
                align: "end",
              })}
            >
              <DefaultText type="display2" applyLineHeight={false}>
                <div className={styles.pointTextBox}>{dailyCalorie}</div>
              </DefaultText>
              <DefaultText type="headline2" applyLineHeight={false}>
                kcal
              </DefaultText>
            </div>
          </div>
          <ThumbsIcon />
        </div>
        <Divider thickness={1} color="gray200" />
        <div className={styles.calorieInfoBox}>
          {DAILY_CALORIE_TEXT.map((text, idx) => (
            <div
              key={idx}
              className={commonWrapper({
                justify: "start",
                align: "start",
                gap: 8,
              })}
            >
              <SvgIcon src={CheckIcon} size={24} color="gray700" />
              <DefaultText type="body3" color="gray700">
                {text}
              </DefaultText>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
