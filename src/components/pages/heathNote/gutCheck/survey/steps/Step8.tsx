import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import {
  GUT_CHECK_FORM_INFO,
  GUT_CHECK_TITLES,
} from "@/constants/healthNote/gutCheck";
import { GutCheckStepValues } from "@/utils/validation/gutCheckValidation";
import { colSurveyButtonWrapper } from "@/components/pages/survey/steps/StepElements.css";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import SurveyButtonGroup from "@/components/pages/survey/surveyButtonGroup/SurveyButtonGroup";
import Chips from "@/components/common/chips/Chips";
import { commonWrapper } from "@/styles/common.css";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface SurveyStepProps {
  handleChange: () => void;
  handleNextStep: () => void;
  dogName: string;
}

export default function GutCheckStep8({
  handleChange,
  handleNextStep,
  dogName,
}: SurveyStepProps) {
  const { control, setValue } = useFormContext<GutCheckStepValues>();
  const exist = useWatch({
    name: "step8.treatmentDiseasesExist",
    control,
  });
  return (
    <>
      <SurveyTitle dogName={dogName} config={GUT_CHECK_TITLES.step8} />
      <Controller
        name="step8.treatmentDiseasesExist"
        control={control}
        render={({ field }) => {
          const { onToggle, isSelected } = useSurveyToggleOption({
            selectedValue: field.value,
            mode: "radio",
            onChange: (value) => {
              field.onChange(value);
              handleChange();
              // 중복 선택이라 auto next step을 꺼놨는데, 없어요 선택시에는 다음 단계로 넘어가게 하기 위해
              if (value === "NONE") {
                setValue("step8.treatmentDiseases", [], {
                  shouldValidate: true,
                });
                handleNextStep();
              }
            },
          });
          return (
            <SurveyButtonGroup>
              {GUT_CHECK_FORM_INFO.healthStatus.treatmentDiseases.existenceOptions.map(
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
            </SurveyButtonGroup>
          );
        }}
      />
      {exist === "EXIST" && (
        <Controller
          name="step8.treatmentDiseases"
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
              <>
                <DefaultText type="label2" color="gray500">
                  *아래 해당되는 사항을 모두 선택해주세요
                </DefaultText>
                <div className={commonWrapper({ direction: "col", gap: 32 })}>
                  {GUT_CHECK_FORM_INFO.healthStatus.treatmentDiseases.groups.map(
                    (group) => (
                      <SurveyButtonGroup
                        key={group.category}
                        title={group.category}
                        isWrap
                      >
                        {group.options.map((opt) => {
                          const selected = isSelected(opt.value);
                          return (
                            <Chips
                              key={opt.value}
                              variant="solid"
                              color={selected ? "red" : "gray800"}
                              size="lg"
                              borderRadius="lg"
                              switchOff={!selected}
                              showCheckIcon
                              onClick={() => onToggle(opt.value)}
                            >
                              {opt.label}
                            </Chips>
                          );
                        })}
                      </SurveyButtonGroup>
                    )
                  )}
                </div>
              </>
            );
          }}
        />
      )}
    </>
  );
}
