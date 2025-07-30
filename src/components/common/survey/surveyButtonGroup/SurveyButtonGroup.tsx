import React from "react";
import DefaultText from "@/components/common/defaultText/DefaultText";
import CheckIcon from "public/images/survey/check_small.svg";
import CloseIcon from "public/images/survey/close_small.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import InfoBox from "@/components/common/infoBox/InfoBox";
import { commonWrapper } from "@/styles/common.css";
import { surveyButtonGroupText } from "./SurveyButtonGroup.css";

interface SurveyButtonGroupProps {
  title?: string;
  error?: string;
  info?: string;
  direction?: "row" | "col";
  isMultiple?: boolean;
  children: React.ReactNode;
  isWrap?: boolean;
}

export default function SurveyButtonGroup({
  title,
  error,
  info,
  direction = "row",
  children,
  isMultiple = false,
  isWrap = false,
}: SurveyButtonGroupProps) {
  const specialErrorMessage =
    "몸무게가 작은 아이의 경우 급여량이 적게 계산될 수 있어요. 포장은 20g부터 가능하지만, 급여는 계산된 양에 맞춰 나눠주시면 됩니다.";

  return (
    <div
      className={commonWrapper({ direction: "col", gap: 8, align: "start" })}
    >
      {title && (
        <DefaultText type="headline4" color="gray800">
          {title}
        </DefaultText>
      )}
      {isMultiple === true && (
        <DefaultText
          type="label2"
          color="gray500"
          className={surveyButtonGroupText}
        >
          *복수응답가능
        </DefaultText>
      )}
      <div
        className={commonWrapper({
          direction,
          gap: 8,
          wrap: isWrap ? "wrap" : undefined,
          justify: isWrap ? "start" : "center",
        })}
      >
        {children}
      </div>
      {(error || info) && (
        <div className={commonWrapper({ align: "center", justify: "start" })}>
          {error === specialErrorMessage ? (
            <InfoBox text={error} color="gray" type="info" fullWidth />
          ) : (
            <>
              <SvgIcon
                src={error ? CloseIcon : CheckIcon}
                color="red"
                size={19}
              />
              <DefaultText type="caption" color={error ? "red" : "blue500"}>
                {error || info}
              </DefaultText>
            </>
          )}
        </div>
      )}
    </div>
  );
}
