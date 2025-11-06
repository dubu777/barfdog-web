import { useFormContext, useWatch, useController } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/domain/survey/surveyTitle/SurveyTitle";
import {
  PROBIOME_FORM_INFO,
  PROBIOME_TITLES,
} from "@/constants/healthNote/probiome";
import { ProbiomeStepValues } from "@/utils/validation/probiomeValidation";
import SurveyButton from "@/components/domain/survey/surveyButton/SurveyButton";
import Text from "@/components/ui/text/Text";
import { commonWrapper } from "@/styles/common.css";
import Chips from "@/components/ui/chips/Chips";
import SurveyButtonGroup from "@/components/domain/survey/surveyButtonGroup/SurveyButtonGroup";

interface SurveyStepProps {
  handleChange: () => void;
  handleNextStep: () => void;
  dogName: string;
}

export default function ProbiomeStep4({
  handleChange,
  handleNextStep,
  dogName,
}: SurveyStepProps) {
  const { control, setValue } = useFormContext<ProbiomeStepValues>();

  const { field: allergyStatusField } = useController({
    name: "step4.allergyStatus",
    control,
  });

  const { field: allergenFoodListField } = useController({
    name: "step4.allergenFoodList",
    control,
  });

  const { onToggle: allergyToggle, isSelected: allergySelected } =
    useSurveyToggleOption({
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

  const { onToggle: allergenToggle, isSelected: allergenSelected } =
    useSurveyToggleOption({
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
      <SurveyTitle dogName={dogName} config={PROBIOME_TITLES.step4} />
      <div className={commonWrapper({ align: "start", gap: 8 })}>
        {PROBIOME_FORM_INFO.healthStatus.allergyStatus.options.map((option) => (
          <SurveyButton
            key={option.label}
            label={option.label}
            value={option.value}
            isChecked={allergySelected(option.value)}
            onToggle={allergyToggle}
          />
        ))}
      </div>
      {allergyStatus === "HAS_ALLERGY" && (
        <>
          <Text type="label2" color="gray500">
            *아래 해당되는 사항을 모두 선택해주세요
          </Text>
          <div
            className={commonWrapper({
              direction: "col",
              gap: 32,
              paddingBottom: 85,
            })}
          >
            {PROBIOME_FORM_INFO.healthStatus.allergenFoodList.groups.map(
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
