import { useFormContext, useWatch, useController } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import {
  GUT_CHECK_FORM_INFO,
  GUT_CHECK_TITLES,
} from "@/constants/healthNote/gutCheck";
import { GutCheckStepValues } from "@/utils/validation/gutCheckValidation";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";
import Chips from "@/components/common/chips/Chips";
import SurveyButtonGroup from "@/components/common/survey/surveyButtonGroup/SurveyButtonGroup";

interface SurveyStepProps {
  handleChange: () => void;
  handleNextStep: () => void;
  dogName: string;
}

export default function GutCheckStep4({
  handleChange,
  handleNextStep,
  dogName,
}: SurveyStepProps) {
  const { control, setValue } = useFormContext<GutCheckStepValues>();
  
  const { field: allergyStatusField } = useController({
    name: "step4.allergyStatus",
    control,
  });

  const { field: allergenFoodListField } = useController({
    name: "step4.allergenFoodList",
    control,
  });

  const { onToggle: allergyToggle, isSelected: allergySelected } = useSurveyToggleOption({
    selectedValue: allergyStatusField.value,
    mode: "radio",
    onChange: (value) => {
      allergyStatusField.onChange(value);
      handleChange();
      if (value === "NO_ALLERGY") {
        setValue("step4.allergenFoodList", [], {
          shouldValidate: true,
        });
        handleNextStep();
      }
    },
  });

  const { onToggle: allergenToggle, isSelected: allergenSelected } = useSurveyToggleOption({
    selectedValue: allergenFoodListField.value,
    mode: "checkbox",
    onChange: (value) => {
      allergenFoodListField.onChange(value);
      handleChange();
    },
  });

  const allergyStatus = useWatch({
    name: "step4.allergyStatus",
    control,
  });

  return (
    <>
      <SurveyTitle dogName={dogName} config={GUT_CHECK_TITLES.step4} />
      <div className={commonWrapper({ align: "start", gap: 8 })}>
        {GUT_CHECK_FORM_INFO.healthStatus.allergyStatus.options.map(
          (option) => (
            <SurveyButton
              key={option.label}
              label={option.label}
              value={option.value}
              isChecked={allergySelected(option.value)}
              onToggle={allergyToggle}
            />
          )
        )}
      </div>
      {allergyStatus === "HAS_ALLERGY" && (
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
                        color={allergenSelected(opt.value) ? "red" : "gray800"}
                        size="lg"
                        borderRadius="lg"
                        switchOff={!allergenSelected(opt.value)}
                        showCheckIcon
                        onClick={() => allergenToggle(opt.value)}
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
      )}
    </>
  );
}
