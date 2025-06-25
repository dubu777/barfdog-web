import { Controller, useFormContext } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import {
  GUT_CHECK_FORM_INFO,
  GUT_CHECK_TITLES,
} from "@/constants/healthNote/gutCheck";
import { GutCheckStepValues } from "@/utils/validation/gutCheckValidation";
import SurveyButtonGroup from "@/components/pages/survey/surveyButtonGroup/SurveyButtonGroup";
import Chips from "@/components/common/chips/Chips";

interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
}

export default function GutCheckStep16({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<GutCheckStepValues>();
  return (
    <>
      <SurveyTitle dogName={dogName} config={GUT_CHECK_TITLES.step16} />
      <Controller
        name="step16.petConcerns"
        control={control}
        render={({ field }) => {
          const { onToggle, isSelected } = useSurveyToggleOption({
            selectedValue: field.value,
            mode: "checkbox",
            onChange: (value) => {
              field.onChange(value);
              handleChange();
            },
          });
          return (
            <SurveyButtonGroup isWrap isMultiple>
              {GUT_CHECK_FORM_INFO.additionalInfo.petConcerns.options.map(
                (option) => {
                  const selected = isSelected(option.value);
                  return (
                    <Chips
                      key={option.value}
                      variant="solid"
                      color={selected ? "red" : "gray800"}
                      size="lg"
                      borderRadius="lg"
                      switchOff={!selected}
                      showCheckIcon={true}
                      onClick={() => onToggle(option.value)}
                    >
                      {option.label}
                    </Chips>
                  );
                }
              )}
            </SurveyButtonGroup>
          );
        }}
      />
    </>
  );
}
