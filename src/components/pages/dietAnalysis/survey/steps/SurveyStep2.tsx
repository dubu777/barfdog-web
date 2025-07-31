import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { useController, useFormContext } from "react-hook-form";
import useDeviceState from "@/hooks/useDeviceState";
import MobileDatePicker from "@/components/common/datePicker/mobileDatePicker/MobileDatePicker";
import CustomDatePicker from "@/components/common/datePicker/CustomDatePicker";
import { DIET_ANALYSIS_FORM_INFO, SURVEY_TITLES } from "@/constants";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import { format } from "date-fns";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import { commonWrapper } from "@/styles/common.css";

interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
  isResurvey: boolean;
}

export default function SurveyStep2({
  handleChange,
  dogName,
  isResurvey,
}: SurveyStepProps) {
  const { isMobileDevice } = useDeviceState();
  const { control } = useFormContext<SurveyStepValues>();

  // birthDay field controller
  const { field: birthField } = useController({
    name: "step2.birthDay",
    control,
  });

  // oldDog field controller
  const { field: oldDogField } = useController({
    name: "step2.oldDog",
    control,
  });

  // Toggle option for oldDog
  const { onToggle: onOldDogToggle, isSelected: isOldDogSelected } =
    useSurveyToggleOption<boolean>({
      selectedValue: oldDogField.value ?? null,
      mode: "radio",
      onChange: (value) => {
        oldDogField.onChange(value);
        handleChange();
      },
    });

  return (
    <>
      <SurveyTitle dogName={dogName} config={SURVEY_TITLES.step2} />
      {!isResurvey &&
        (isMobileDevice ? (
          <MobileDatePicker
            value={birthField.value}
            onChange={(date) => {
              const val = format(date as Date, "yyyy-MM-dd");
              birthField.onChange(val);
              handleChange();
            }}
            label="생년월일"
            isRequired
          />
        ) : (
          <CustomDatePicker
            name={birthField.name}
            value={birthField.value}
            onChange={(date) => {
              const val = format(date as Date, "yyyy-MM-dd");
              birthField.onChange(val);
            }}
            dateFormat="yyyy-MM-dd"
            marginBottom={false}
          />
        ))}
      <div className={commonWrapper({ align: "start", gap: 8 })}>
        {DIET_ANALYSIS_FORM_INFO.dogBasicInfo.oldDog.options.map((option) => (
          <SurveyButton
            key={String(option.value)}
            label={option.label}
            value={option.value}
            inputType="normal"
            isChecked={isOldDogSelected(option.value)}
            onToggle={() => onOldDogToggle(option.value)}
          />
        ))}
      </div>
    </>
  );
}
