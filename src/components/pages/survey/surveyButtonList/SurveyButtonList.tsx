import * as styles from "./SurveyButtonList.css";
import { surveyTitle } from "@/app/survey/Survey.css";
import { getNameWithPossessiveSuffix2 } from "@/utils";
import SurveyButton from "../surveyButton/SurveyButton";

interface SurveyButtonListProps {
  options: readonly {
    id: string;
    value: string | boolean | number;
    label: string;
  }[];
  selectedValue: string | boolean | number | (string | number | boolean)[] | null;
  onChange: (value: string | number | boolean | (string | number | boolean)[]) => void;
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
      if (clickedValue === "NONE") {
        // "NONE" 선택 시 다른 값은 모두 제거하고 "NONE"만 선택합니다.
        onChange(["NONE"]);
      } else {
        // "NONE" 이외의 값 선택 시 기존 선택에서 "NONE"은 제거하고 토글합니다.
        const currentSelection = Array.isArray(selectedValue)
          ? selectedValue
          : [];
        const filteredSelection = currentSelection.filter(
          (item) => item !== "NONE"
        );
        const alreadySelected = filteredSelection.includes(clickedValue);
        const newSelection = alreadySelected
          ? filteredSelection.filter((item) => item !== clickedValue)
          : [...filteredSelection, clickedValue];
        onChange(newSelection);
      }
    } else {
      onChange(clickedValue);
    }
    // 선택한 값이 "NONE"이면, handleNextStep이 정의되어 있을 경우 호출
    if (clickedValue === "NONE" && handleNextStep) {
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
          id={option.id}
          value={option.value}
          isChecked={
            isMultiSelect
              ? Array.isArray(selectedValue) && selectedValue.includes(option.value)
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
