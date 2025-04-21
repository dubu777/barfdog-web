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
    "바프독 맞춤 식단은 0.8kg 이상의 반려견에게 급여가 가능해요";

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
            <InfoBox text={error} color="red" type="help" fullWidth />
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
