import { Controller, Path, useFormContext, useWatch } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import {
  GUT_CHECK_FORM_INFO,
  GUT_CHECK_TITLES,
} from "@/constants/healthNote/gutCheck";
import { GutCheckStepValues } from "@/utils/validation/gutCheckValidation";
import { rowSurveyButtonWrapper } from "@/components/pages/survey/steps/StepElements.css";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import InputField from "@/components/common/inputField/InputField";
import SurveyButtonGroup from "@/components/pages/survey/surveyButtonGroup/SurveyButtonGroup";
import Chips from "@/components/common/chips/Chips";

interface SurveyStepProps {
  handleChange: () => void;
  handleNextStep: () => void;
  dogName: string;
}

export default function GutCheckStep14({
  handleChange,
  handleNextStep,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<GutCheckStepValues>();
  const exist = useWatch({
    name: "step14.supplementsExist",
    control,
  });
  return (
    <>
      <SurveyTitle dogName={dogName} config={GUT_CHECK_TITLES.step14} />
      <Controller
        name="step14.supplementsExist"
        control={control}
        render={({ field }) => {
          const { onToggle, isSelected } = useSurveyToggleOption({
            selectedValue: field.value,
            mode: "checkbox",
            onChange: (value) => {
              field.onChange(value);
              handleChange();
              if (value && value.includes("NOT_TAKING")) {
                handleNextStep();
              }
            },
          });
          return (
            <div className={rowSurveyButtonWrapper}>
              {GUT_CHECK_FORM_INFO.dogLifestyle.supplementsExist.options.map(
                (option) => (
                  <SurveyButton
                    key={option.label}
                    label={option.label}
                    value={option.value}
                    isChecked={isSelected(option.value)}
                    onToggle={onToggle}
                  />
                )
              )}
            </div>
          );
        }}
      />
      {exist === "TAKING" && (
        <Controller
          name="step14.supplementTypeList"
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
              <SurveyButtonGroup
                title={
                  GUT_CHECK_FORM_INFO.dogLifestyle.supplementTypeList.title
                }
                isWrap
              >
                {GUT_CHECK_FORM_INFO.dogLifestyle.supplementTypeList.options.map(
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
      )}
      {exist === "TAKING" && (
        <Controller
          name="step14.supplementProduct"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label="급여 중 제품명 (선택사항)"
              labelType="headline4"
              labelColor="gray800"
              placeholder="유산균 제품명을 입력해주세요"
              onChange={(e) => {
                field.onChange(e);
                console.log("field.name", field.name);
              }}
            />
          )}
        />
      )}
    </>
  );
}
