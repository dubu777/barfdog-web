import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import {
  GUT_CHECK_FORM_INFO,
  GUT_CHECK_TITLES,
} from "@/constants/healthNote/gutCheck";
import { GutCheckStepValues } from "@/utils/validation/gutCheckValidation";
import {
  colSurveyButtonWrapper,
  rowSurveyButtonWrapper,
} from "@/components/pages/survey/steps/StepElements.css";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";
import SurveyButtonGroup from "@/components/pages/survey/surveyButtonGroup/SurveyButtonGroup";
import Chips from "@/components/common/chips/Chips";

interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
}

export default function GutCheckStep4({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<GutCheckStepValues>();
  const allergyStatus = useWatch({
    name: "step4.allergyStatus",
    control,
  });
  return (
    <>
      <SurveyTitle dogName={dogName} config={GUT_CHECK_TITLES.step4} />
      <Controller
        name="step4.allergyStatus"
        control={control}
        render={({ field }) => {
          const { onToggle, isSelected } = useSurveyToggleOption({
            selectedValue: field.value,
            mode: "radio",
            onChange: (value) => {
              field.onChange(value);
              handleChange();
            },
          });
          return (
            <div className={rowSurveyButtonWrapper}>
              {GUT_CHECK_FORM_INFO.healthStatus.allergyStatus.options.map(
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
      {allergyStatus === "HAS_ALLERGY" && (
        <Controller
          name="step4.allergenFoodList"
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
                <div
                  className={commonWrapper({
                    direction: "col",
                    gap: 32,
                    paddingBottom: 85,
                  })}
                >
                  {GUT_CHECK_FORM_INFO.healthStatus.allergenFoodList.groups.map(
                    (group) => (
                      <SurveyButtonGroup
                        key={group.category}
                        title={group.category}
                        isWrap
                      >
                        {group.options.map((opt) => {
                          return (
                            <Chips
                              key={opt.value}
                              variant="solid"
                              color={isSelected(opt.value) ? "red" : "gray800"}
                              size="lg"
                              borderRadius="lg"
                              switchOff={!isSelected(opt.value)}
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
