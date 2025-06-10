import React from "react";
import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "./SurveyButtonGroup.css"; // 필요에 따라 스타일 작성
import CheckIcon from "public/images/survey/check_small.svg";
import CloseIcon from "public/images/survey/close_small.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import InfoBox from "@/components/common/infoBox/InfoBox";
import { surveyButtonWrapper } from "../surveySteps/SurveySteps.css";

interface SurveyButtonGroupProps {
  title?: string;
  error?: string;
  info?: string;
  children: React.ReactNode;
}

export default function SurveyButtonGroup({
  title,
  error,
  info,
  children,
}: SurveyButtonGroupProps) {
  const specialErrorMessage =
    "몸무게가 작은 아이의 경우 급여량이 적게 계산될 수 있어요. 포장은 20g부터 가능하지만, 급여는 계산된 양에 맞춰 나눠주시면 됩니다.";

  return (
    <div className={surveyButtonWrapper}>
      {title && (
        <DefaultText type="headline4" color="gray800">
          {title}
        </DefaultText>
      )}
      <div className={styles.surveyButtonContainer}>
        {children}
      </div>
      {(error || info) && (
        <div className={styles.surveyErrorWrapper}>
          {error === specialErrorMessage ? (
            <InfoBox text={error} color="gray" type="info" fullWidth />
          ) : (
            <>
              <SvgIcon src={error ? CloseIcon : CheckIcon} size={19} />
              <DefaultText type="caption" color={error ? "red" : "blue"}>
                {error || info}
              </DefaultText>
            </>
          )}
        </div>
      )}
    </div>
  );
}
