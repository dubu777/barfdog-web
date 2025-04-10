import * as styles from "./SurveyButtonList.css";
import { surveyTitle } from "@/app/survey/Survey.css";
import { getNameWithPossessiveSuffix2 } from "@/utils";
import SurveyButton from "../surveyButton/SurveyButton3";
import { NONE_VALUE } from "@/constants";

interface SurveyButtonListProps {
  options: readonly {
    id: string;
    value: string | boolean | number;
    label: string;
  }[];
  selectedValue:
    | string
    | boolean
    | number
    | (string | number | boolean)[]
    | null;
  onChange: (
    value: string | number | boolean | (string | number | boolean)[]
  ) => void;
  handleNextStep?: () => void;
  title: string;
  petName: string;
  layoutType?: "row" | "col" | "grid";
  isMultiSelect?: boolean;
}

export default function SurveyButtonList({
  options,
  selectedValue,
  layoutType = "row",
  onChange,
  handleNextStep,
  title,
  petName,
  isMultiSelect = false,
}: SurveyButtonListProps) {
  const fullTitle = getNameWithPossessiveSuffix2(petName, title);

  const handleButtonClick = (clickedValue: string | number | boolean) => {
    if (isMultiSelect) {
      if (clickedValue === NONE_VALUE) {
        // "NONE" 선택 시 다른 값은 모두 제거하고 "NONE"만 선택.
        onChange([NONE_VALUE]);
      } else {
        // 현재 선택값을 Set으로 변환 (selectedValue가 배열이 아닐 경우 빈 배열로 처리)
        const currentSet = new Set(
          Array.isArray(selectedValue) ? selectedValue : []
        );
        // "NONE" 값은 항상 제거
        currentSet.delete(NONE_VALUE);
  
        // 클릭한 값이 이미 선택되어 있으면 제거, 아니면 추가
        if (currentSet.has(clickedValue)) {
          currentSet.delete(clickedValue);
        } else {
          currentSet.add(clickedValue);
        }
  
        // 업데이트된 선택값을 배열로 변환하여 onChange 호출
        onChange(Array.from(currentSet));
      }
    } else {
      onChange(clickedValue);
    }
    // 선택한 값이 "NONE"이면, handleNextStep 호출
    if (clickedValue === NONE_VALUE && handleNextStep) {
      handleNextStep();
    }
  };

  return (
    <div className={styles.surveyButtonListContainer}>
      {title && <h2 className={surveyTitle}>{fullTitle}</h2>}
      <div className={styles.surveyButtonListWrapper({ type: layoutType })}>
        {options.map((option) => (
          <SurveyButton
            key={option.id}
            value={option.value}
            isChecked={
              isMultiSelect
                ? Array.isArray(selectedValue) &&
                  selectedValue.includes(option.value)
                : selectedValue === option.value
            }
            label={option.label}
            layoutType={layoutType}
            onChange={() => handleButtonClick(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
