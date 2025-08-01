import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "../DietAnalysisResult.css";
import Card from "@/components/common/card/Card";
import { commonWrapper } from "@/styles/common.css";
import { SecondResultResponse } from "@/types/dietAnalysis";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import CheckIcon from "public/images/survey/check_small.svg";
import Divider from "@/components/common/divider/Divider";
import { RECIPE_EFFICACY_DATA_MAP } from "@/constants/dietAnalysis";

interface DietReasonProps {
  secondResponse: SecondResultResponse;
}

export default function DietReason({ secondResponse }: DietReasonProps) {
  const { symptom } =
    RECIPE_EFFICACY_DATA_MAP[secondResponse.recipeEfficacyList[0]];
  return (
    <div
      className={commonWrapper({ direction: "col", gap: 20, padding: "0/20" })}
    >
      <div className={commonWrapper({ justify: "between" })}>
        <DefaultText type="title3">
          왜 <span className={styles.pointText}>바프독 레시피</span>를
          <br />
          추천할까요?
        </DefaultText>
        <div className={styles.tempIconStyle} />
      </div>
      <Card shadow="strong" padding={"20/16"} gap={20} align="start">
        <div
          className={commonWrapper({
            direction: "col",
            align: "start",
            gap: 2,
          })}
        >
          <DefaultText type="headline2" applyLineHeight={false}>
            <div className={commonWrapper({ justify: "start", gap: 2 })}>
              <div className={styles.pointTextBox}>
                {secondResponse.dogName}
              </div>
              의 <div className={styles.pointTextBox}>{symptom}</div>고민은
            </div>
          </DefaultText>
          <DefaultText type="headline2" applyLineHeight={false}>
            아래가 원인 일 수 있어요
          </DefaultText>
        </div>
        <div
          className={commonWrapper({
            direction: "col",
            align: "start",
            gap: 4,
          })}
        >
          {secondResponse.firstHealthConcernsCauseList.map((cause) => (
            <div
              key={cause}
              className={commonWrapper({ justify: "start", gap: 2 })}
            >
              <SvgIcon src={CheckIcon} color="gray900" />
              <DefaultText type="body2" color="gray800">
                {cause}
              </DefaultText>
            </div>
          ))}
        </div>
        <Divider thickness={1} color="gray200" />
        <DefaultText type="headline4" color="gray800">
          바프독은 사료를 만들지 않습니다
          <br />
          <DefaultText type="label3" className={styles.underlineText}>
            한 끼의 건강한 식사
          </DefaultText>
          를 만드는 바프독 레시피로
          <br />
          우리 아이에게 필수 영양을 보충해 주세요
        </DefaultText>
        <div className={commonWrapper({ gap: 8 })}>
          {secondResponse.recipeEfficacyList.map((efficacy) => {
            const { icon } = RECIPE_EFFICACY_DATA_MAP[efficacy];

            return (
              <Card key={efficacy} shadow="light" padding={12} gap={4}>
                <SvgIcon src={icon} size={64} />
                <DefaultText type="body3" color="gray800" align="center">
                  {efficacy}
                </DefaultText>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
