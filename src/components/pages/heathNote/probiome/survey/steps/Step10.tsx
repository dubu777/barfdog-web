import {
  Controller,
  Path,
  useFormContext,
  useController,
} from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/domain/survey/surveyTitle/SurveyTitle";
import {
  PROBIOME_FORM_INFO,
  PROBIOME_TITLES,
} from "@/constants/healthNote/probiome";
import { ProbiomeStepValues } from "@/utils/validation/probiomeValidation";
import SurveyButton from "@/components/domain/survey/surveyButton/SurveyButton";
import InputField from "@/components/ui/inputField/InputField";
import InfoBox from "@/components/ui/infoBox/InfoBox";
import { commonWrapper } from "@/styles/common.css";
import SurveyButtonGroup from "@/components/domain/survey/surveyButtonGroup/SurveyButtonGroup";

interface SurveyStepProps {
  handleChange: () => void;
  handleBlur: (fieldName: Path<ProbiomeStepValues>) => Promise<void>;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: Path<ProbiomeStepValues>
  ) => Promise<void>;
  dogName: string;
}

export default function ProbiomeStep10({
  handleChange,
  handleBlur,
  handleKeyDown,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<ProbiomeStepValues>();

  const { field: feedTimeField } = useController({
    name: "step10.feedTime",
    control,
  });

  const { onToggle, isSelected } = useSurveyToggleOption({
    selectedValue: feedTimeField.value,
    mode: "radio",
    onChange: (value) => {
      feedTimeField.onChange(value);
      handleChange();
    },
  });

  return (
    <>
      <SurveyTitle dogName={dogName} config={PROBIOME_TITLES.step10} />
      <div className={commonWrapper({ direction: "col", gap: 8 })}>
        <Controller
          name="step10.foodProduct"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label={PROBIOME_FORM_INFO.lifestyle.foodProduct.title}
              labelType="headline4"
              labelColor="gray800"
              placeholder={PROBIOME_FORM_INFO.lifestyle.foodProduct.placeholder}
              onChange={(e) => {
                field.onChange(e);
                console.log("field.name", field.name);
              }}
              onKeyDown={(e) => handleKeyDown(e, field.name)}
              onBlur={() => handleBlur(field.name)}
            />
          )}
        />
        <InfoBox
          type="info"
          text={PROBIOME_FORM_INFO.lifestyle.foodProduct.info}
          fullWidth
        />
      </div>
      <SurveyButtonGroup title={PROBIOME_FORM_INFO.lifestyle.feedTime.title}>
        {PROBIOME_FORM_INFO.lifestyle.feedTime.options.map((option) => (
          <SurveyButton
            key={option.label}
            label={option.label}
            value={option.value}
            isChecked={isSelected(option.value)}
            onToggle={onToggle}
          />
        ))}
      </SurveyButtonGroup>
    </>
  );
}
