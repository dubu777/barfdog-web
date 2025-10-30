import { DIET_ANALYSIS_FORM_INFO, SURVEY_TITLES } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { useController, useFormContext } from "react-hook-form";
import SurveyTitle from "@/components/domain/survey/surveyTitle/SurveyTitle";
import ImageButton from "../imageButton/ImageButton";
import SurveyGridButtonGroup from "../../../../domain/survey/surveyGridButtonGroup/SurveyGridButtonGroup";
import { useSurveyRankOption } from "@/hooks/survey/useSurveyRankOption";

interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
}

export default function SurveyStep10({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  const { field: concernsField } = useController({
    name: "step10.healthConcerns",
    control,
  });

  const selected = (concernsField.value as string[]) ?? [];
  const { onToggle, isDisabled, getRank, onReselect } =
    useSurveyRankOption<string>(
      selected,
      (next) => {
        concernsField.onChange(next);
        handleChange();
      },
      3
    );

  return (
    <>
      <SurveyTitle
        dogName={dogName}
        config={SURVEY_TITLES.step10}
        onReselect={onReselect}
      />
      <SurveyGridButtonGroup>
        {DIET_ANALYSIS_FORM_INFO.lifestyle.healthConcerns.options.map(
          (option) => (
            <ImageButton
              key={option.value}
              label={option.label}
              value={option.value}
              inputType="rank"
              defaultSvg={option.Icon}
              selectedSvg={option.SelectedIcon}
              isChecked={selected.includes(option.value)}
              rank={getRank(option.value)}
              disabled={isDisabled(option.value)}
              onToggle={() => onToggle(option.value)}
              display="grid1"
            />
          )
        )}
      </SurveyGridButtonGroup>
    </>
  );
}
