import { Controller, Path, useFormContext, useWatch, useController } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import {
  GUT_CHECK_FORM_INFO,
  GUT_CHECK_TITLES,
} from "@/constants/healthNote/gutCheck";
import { GutCheckStepValues } from "@/utils/validation/gutCheckValidation";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import InputField from "@/components/common/inputField/InputField";
import { commonWrapper } from "@/styles/common.css";

interface SurveyStepProps {
  handleChange: () => void;
  handleBlur: (fieldName: Path<GutCheckStepValues>) => Promise<void>;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: Path<GutCheckStepValues>
  ) => Promise<void>;
  dogName: string;
}

export default function GutCheckStep2({
  handleChange,
  handleBlur,
  handleKeyDown,
  dogName,
}: SurveyStepProps) {
  const { control, setValue } = useFormContext<GutCheckStepValues>();
  
  const { field: probioticsStatusField } = useController({
    name: "step2.probioticsStatus",
    control,
  });

  const { onToggle, isSelected } = useSurveyToggleOption({
    selectedValue: probioticsStatusField.value,
    mode: "radio",
    onChange: (value) => {
      probioticsStatusField.onChange(value);
      handleChange();
      if (value === "NOT_TAKING") {
        setValue("step2.probioticsProduct", "", {
          shouldValidate: true,
        });
      }
    },
  });

  const probioticsOption = useWatch({
    name: "step2.probioticsStatus",
    control,
  });

  return (
    <>
      <SurveyTitle dogName={dogName} config={GUT_CHECK_TITLES.step2} />
      <div className={commonWrapper({ align: "start", gap: 8 })}>
        {GUT_CHECK_FORM_INFO.healthStatus.probioticsStatus.options.map(
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
      {probioticsOption === "TAKING" && (
        <Controller
          name="step2.probioticsProduct"
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
              onKeyDown={(e) => handleKeyDown(e, field.name)}
              onBlur={() => handleBlur(field.name)}
            />
          )}
        />
      )}
    </>
  );
}
