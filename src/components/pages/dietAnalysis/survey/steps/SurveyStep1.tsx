import {
  NONE_VALUE,
  DIET_ANALYSIS_FORM_INFO,
  SURVEY_TITLES,
} from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import {
  Controller,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SurveyButtonGroup from "../../../../common/survey/surveyButtonGroup/SurveyButtonGroup";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";

interface SurveyStepProps {
  dogName: string;
  handleChange: () => void;
}

export default function SurveyStep1({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control, setValue } = useFormContext<SurveyStepValues>();

  // Watch name field
  // Duplicate check
  // const { refetch: checkDuplicate } = useCheckDuplicateDogName(name, {
  //   enabled: false,
  // });

  // const handleDuplicateCheck = useCallback(async () => {
  //   if (!name) {
  //     setError("step1.name", {
  //       type: "manual",
  //       message: "이름을 입력해주세요.",
  //     });
  //     return;
  //   }

  //   const { data } = await checkDuplicate();
  //   const isSuccess = data?.success;

  //   if (isSuccess) {
  //     setValue("step1.nameVerified", true, { shouldValidate: true });
  //     setInfoMessage("사용 가능한 반려견 이름입니다.");
  //     handleChange();
  //   } else {
  //     setError("step1.name", {
  //       type: "manual",
  //       message: "이미 사용 중인 이름입니다.",
  //     });
  //     setValue("step1.nameVerified", false, { shouldValidate: true });
  //     setInfoMessage(undefined);
  //   }
  // }, [name, checkDuplicate, setError, setValue, handleChange]);

  // const { field: genderField } = useController({
  //   name: "step1.gender",
  //   control,
  // });

  // const { onToggle: onGenderToggle, isSelected: isGenderSelected } =
  //   useSurveyToggleOption<string>({
  //     selectedValue: genderField.value ?? null,
  //     mode: "radio",
  //     onChange: (value) => {
  //       genderField.onChange(value);
  //       handleChange();
  //       if (value === "MALE") {
  //         setValue("step5.pregnancy", NONE_VALUE, {
  //           shouldValidate: false,
  //           shouldDirty: true,
  //         });
  //         setValue("step6.lactation", NONE_VALUE, {
  //           shouldValidate: false,
  //           shouldDirty: true,
  //         });
  //       }
  //     },
  //   });

  // Neutralization field controller
  const { field: neutralField } = useController({
    name: "step1.neutralization",
    control,
  });

  const { onToggle: onNeutralToggle, isSelected: isNeutralSelected } =
    useSurveyToggleOption<boolean>({
      selectedValue: neutralField.value ?? null,
      mode: "radio",
      onChange: (value) => {
        neutralField.onChange(value);
        handleChange();
        if (value === true) {
          setValue("step4.pregnancy", NONE_VALUE, {
            shouldValidate: false,
            shouldDirty: true,
          });
          setValue("step5.lactation", NONE_VALUE, {
            shouldValidate: false,
            shouldDirty: true,
          });
        }
      },
    });

  return (
    <>
      <SurveyTitle dogName={dogName} config={SURVEY_TITLES.step1} />

      <SurveyButtonGroup>
        {DIET_ANALYSIS_FORM_INFO.dogBasicInfo.neutralization.options.map(
          (option) => (
            <SurveyButton
              key={String(option.value)}
              label={option.label}
              value={option.value}
              inputType="normal"
              isChecked={isNeutralSelected(option.value)}
              onToggle={() => onNeutralToggle(option.value)}
            />
          )
        )}
      </SurveyButtonGroup>
    </>
  );
}
