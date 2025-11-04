import {
  NONE_VALUE,
  DIET_ANALYSIS_FORM_INFO,
  SURVEY_TITLES,
} from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { useController, useFormContext } from "react-hook-form";
import SurveyTitle from "@/components/domain/survey/surveyTitle/SurveyTitle";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyGridButtonGroup from "../../../../domain/survey/surveyGridButtonGroup/SurveyGridButtonGroup";
import ImageButton from "../imageButton/ImageButton";

interface SurveyStepProps {
  handleChange: () => void;
  handleNextStep: () => void;
  dogName: string;
}

export default function SurveyStep13({
  handleChange,
  handleNextStep,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  // healthIssues field controller
  const { field: healthIssuesField } = useController({
    name: "step13.healthIssues",
    control,
  });

  // Toggle option for health issues
  const { onToggle: onIssueToggle, isSelected: isIssueSelected } =
    useSurveyToggleOption<string>({
      selectedValue: healthIssuesField.value ?? null,
      mode: "checkbox",
      onChange: (value) => {
        healthIssuesField.onChange(value);
        handleChange();
      },
    });

  // Handle toggle and auto next step for NONE_VALUE
  const handleToggleAndNext = (value: string) => {
    onIssueToggle(value);
    if (value === NONE_VALUE) {
      handleNextStep();
    }
  };

  return (
    <>
      <SurveyTitle
        dogName={dogName}
        config={SURVEY_TITLES.step13}
        chipContent="마지막 질문이에요! 🎉"
        chipColor="red"
      />
      <SurveyGridButtonGroup infoBoxText="질병에 따라 급여가 불가할 수 있어, 질병이 있는 경우 필수로 체크해 주세요">
        {DIET_ANALYSIS_FORM_INFO.dogDietHealth.healthIssues.options.map(
          (option) => (
            <ImageButton
              key={option.value}
              label={option.label}
              value={option.value}
              inputType="checkbox"
              defaultSvg={option.Icon}
              selectedSvg={option.SelectedIcon}
              isChecked={isIssueSelected(option.value)}
              onToggle={() => handleToggleAndNext(option.value)}
              display="grid2"
            />
          )
        )}
      </SurveyGridButtonGroup>
    </>
  );
}
