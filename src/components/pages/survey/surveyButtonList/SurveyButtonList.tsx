import * as styles from "./SurveyButtonList.css";
import { surveyTitle } from "@/app/survey/Survey.css";
import { getNameWithPossessiveSuffix } from "@/utils";
import SurveyButton from "../surveyButton/SurveyButton";

interface SurveyButtonListProps {
  options: readonly {
    id: string;
    value: string | boolean | number;
    label: string;
  }[];
  selectedValue: string | boolean | number | (string | number | boolean)[] | null;
  onChange: (value: string | number | boolean | (string | number | boolean)[]) => void;
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
  title,
  petName,
  isMultiSelect = false,
}: SurveyButtonListProps) {
  const fullTitle = getNameWithPossessiveSuffix(petName, title);

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
          onChange={onChange}
        />
      ))}
      </div>

    </div>
  );
}
