import { DIET_ANALYSIS_FORM_INFO, surveyTitles } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, useFormContext } from "react-hook-form";
import SurveyTitle from "../surveyTitle/SurveyTitle";
import ImageButton from "../imageButton/ImageButton";
import SurveyGridButtonGroup from "../surveyGridButtonGroup/SurveyGridButtonGroup";
import { useSurveyRankOption } from "@/hooks/survey/\buseSurveyRankOption";

interface SurveyStepProps {
  handleChange: () => void;
  petName: string;
}

export default function SurveyStep11({
  handleChange,
  petName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  return (
    <>
      <Controller
        name="step11.healthConcerns"
        control={control}
        render={({ field }) => {
          // field.value 는 string[] 이어야 합니다.
          const selected: string[] = field.value || [];
          const { onToggle, isDisabled, getRank, onReselect } =
            useSurveyRankOption<string>(
              selected,
              (next) => {
                field.onChange(next);
                handleChange();
              },
              3
            );

          return (
            <>
              <SurveyTitle
                petName={petName}
                config={surveyTitles.step11}
                onReselect={onReselect}
              />
              <SurveyGridButtonGroup>
                {DIET_ANALYSIS_FORM_INFO.dogLifestyle.healthConcerns.options.map(
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
                      onToggle={onToggle}
                      display="grid1"
                    />
                  )
                )}
              </SurveyGridButtonGroup>
            </>
          );
        }}
      />
    </>
  );
}
