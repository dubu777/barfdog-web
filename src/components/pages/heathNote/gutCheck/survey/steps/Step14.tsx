import { useFormContext, useWatch, useController } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import {
  GUT_CHECK_FORM_INFO,
  GUT_CHECK_TITLES,
} from "@/constants/healthNote/gutCheck";
import { GutCheckStepValues } from "@/utils/validation/gutCheckValidation";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import InputField from "@/components/common/inputField/InputField";
import Chips from "@/components/common/chips/Chips";
import { commonWrapper } from "@/styles/common.css";
import SurveyButtonGroup from "@/components/common/survey/surveyButtonGroup/SurveyButtonGroup";

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
  const { field: supplementsExistField } = useController({
    name: "step14.supplementsExist",
    control,
  });
  const { field: supplementTypeListField } = useController({
    name: "step14.supplementTypeList",
    control,
  });
  const { field: supplementProductField } = useController({
    name: "step14.supplementProduct",
    control,
  });

  const exist = useWatch({
    name: "step14.supplementsExist",
    control,
  });

  const { onToggle: onToggleExist, isSelected: isSelectedExist } =
    useSurveyToggleOption({
      selectedValue: supplementsExistField.value,
      mode: "checkbox",
      onChange: (value) => {
        supplementsExistField.onChange(value);
        handleChange();
        if (value && value.includes("NOT_TAKING")) {
          handleNextStep();
        }
      },
    });

  const { onToggle: onToggleTypeList, isSelected: isSelectedTypeList } =
    useSurveyToggleOption({
      selectedValue: supplementTypeListField.value,
      mode: "checkbox",
      onChange: (value) => {
        supplementTypeListField.onChange(value);
        handleChange();
      },
    });
  return (
    <>
      <SurveyTitle dogName={dogName} config={GUT_CHECK_TITLES.step14} />
      <div className={commonWrapper({ align: "start", gap: 8 })}>
        {GUT_CHECK_FORM_INFO.lifestyle.supplementsExist.options.map(
          (option) => (
            <SurveyButton
              key={option.label}
              label={option.label}
              value={option.value}
              isChecked={isSelectedExist(option.value)}
              onToggle={onToggleExist}
            />
          )
        )}
      </div>
      {exist === "TAKING" && (
        <SurveyButtonGroup
          title={GUT_CHECK_FORM_INFO.lifestyle.supplementTypeList.title}
          isWrap
        >
          {GUT_CHECK_FORM_INFO.lifestyle.supplementTypeList.options.map(
            (option) => {
              const selected = isSelectedTypeList(option.value);
              return (
                <Chips
                  key={option.value}
                  variant="solid"
                  color={selected ? "red" : "gray800"}
                  size="lg"
                  borderRadius="lg"
                  switchOff={!selected}
                  showCheckIcon={true}
                  onClick={() => onToggleTypeList(option.value)}
                >
                  {option.label}
                </Chips>
              );
            }
          )}
        </SurveyButtonGroup>
      )}
      {exist === "TAKING" && (
        <InputField
          {...supplementProductField}
          label="급여 중 제품명 (선택사항)"
          labelType="headline4"
          labelColor="gray800"
          placeholder="유산균 제품명을 입력해주세요"
          onChange={(e) => {
            supplementProductField.onChange(e);
            console.log("field.name", supplementProductField.name);
          }}
        />
      )}
    </>
  );
}
