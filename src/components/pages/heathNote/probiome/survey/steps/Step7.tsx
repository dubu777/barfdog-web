import { useController, useFormContext, useWatch } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import {
  PROBIOME_FORM_INFO,
  PROBIOME_TITLES,
} from "@/constants/healthNote/probiome";
import { ProbiomeStepValues } from "@/utils/validation/probiomeValidation";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import Chips from "@/components/common/chips/Chips";
import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import SurveyButtonGroup from "@/components/common/survey/surveyButtonGroup/SurveyButtonGroup";

interface SurveyStepProps {
  handleChange: () => void;
  handleNextStep: () => void;
  dogName: string;
}

export default function ProbiomeStep7({
  handleChange,
  handleNextStep,
  dogName,
}: SurveyStepProps) {
  const { control, setValue } = useFormContext<ProbiomeStepValues>();

  // treatmentDiseasesExist 필드 제어
  const { field: existField } = useController({
    name: "step7.treatmentDiseasesExist",
    control,
  });
  const { onToggle: onExistToggle, isSelected: isExistSelected } =
    useSurveyToggleOption<string>({
      selectedValue: existField.value ?? null,
      mode: "radio",
      onChange: (value) => {
        existField.onChange(value);
        handleChange();
        if (value === "NONE") {
          setValue("step7.treatingDiseaseList", [], { shouldValidate: true });
          handleNextStep();
        }
      },
    });

  // treatingDiseaseList 필드 제어
  const { field: listField } = useController({
    name: "step7.treatingDiseaseList",
    control,
  });
  // undefined 제거한 string[] 생성
  const listValueArray: string[] = Array.isArray(listField.value)
    ? listField.value.filter((v): v is string => typeof v === "string")
    : [];
  const { onToggle: onListToggle, isSelected: isListSelected } =
    useSurveyToggleOption<string>({
      selectedValue: listValueArray,
      mode: "checkbox",
      onChange: (value) => {
        listField.onChange(value);
        handleChange();
      },
    });

  // exist 값 관찰
  const exist = useWatch({
    name: "step7.treatmentDiseasesExist",
    control,
  });

  return (
    <>
      <SurveyTitle dogName={dogName} config={PROBIOME_TITLES.step7} />

      {/* 질병 유무 선택 */}
      <SurveyButtonGroup>
        {PROBIOME_FORM_INFO.healthStatus.treatmentDiseasesExist.options.map(
          (option) => (
            <SurveyButton
              key={option.value}
              label={option.label}
              value={option.value}
              isChecked={isExistSelected(option.value)}
              onToggle={() => onExistToggle(option.value)}
            />
          )
        )}
      </SurveyButtonGroup>

      {/* 질병 리스트 선택 */}
      {exist === "EXIST" && (
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
            {PROBIOME_FORM_INFO.healthStatus.treatingDiseaseList.groups.map(
              (group) => (
                <SurveyButtonGroup
                  key={group.category}
                  title={group.category}
                  isWrap
                >
                  {group.options.map((opt) => (
                    <Chips
                      key={opt.value}
                      variant="solid"
                      color={isListSelected(opt.value) ? "red" : "gray800"}
                      size="lg"
                      borderRadius="lg"
                      switchOff={!isListSelected(opt.value)}
                      showCheckIcon
                      onClick={() => onListToggle(opt.value)}
                    >
                      {opt.label}
                    </Chips>
                  ))}
                </SurveyButtonGroup>
              )
            )}
          </div>
        </>
      )}
    </>
  );
}
