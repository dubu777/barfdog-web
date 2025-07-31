import { NONE_VALUE, DIET_ANALYSIS_FORM_INFO } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import {
  Controller,
  Path,
  useController,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import InputField from "@/components/common/inputField/InputField";
import Button from "@/components/common/button/Button";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import ImageButton from "../imageButton/ImageButton";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SurveyButtonGroup from "../../../../common/survey/surveyButtonGroup/SurveyButtonGroup";
import { useCheckDuplicateDogName } from "@/api/dog/queries/useCheckDuplicateDogName";
import { useCallback, useState } from "react";

interface SurveyStepProps {
  handleChange: () => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: Path<SurveyStepValues>
  ) => Promise<void>;
  isResurvey: boolean;
}

export default function SurveyStep1({
  handleChange,
  handleKeyDown,
  isResurvey,
}: SurveyStepProps) {
  const [infoMessage, setInfoMessage] = useState<string | undefined>(undefined);

  const {
    control,
    setValue,
    setError,
    formState: { errors, touchedFields },
  } = useFormContext<SurveyStepValues>();

  // Watch name field
  const name = useWatch({ control, name: "step1.name" });

  // Duplicate check
  const { refetch: checkDuplicate } = useCheckDuplicateDogName(name, {
    enabled: false,
  });

  const handleDuplicateCheck = useCallback(async () => {
    if (!name) {
      setError("step1.name", {
        type: "manual",
        message: "이름을 입력해주세요.",
      });
      return;
    }

    const { data } = await checkDuplicate();
    const isSuccess = data?.result === "SUCCESS";

    if (isSuccess) {
      setValue("step1.nameVerified", true, { shouldValidate: true });
      setInfoMessage("사용 가능한 반려견 이름입니다.");
      handleChange();
    } else {
      setError("step1.name", {
        type: "manual",
        message: "이미 사용 중인 이름입니다.",
      });
      setValue("step1.nameVerified", false, { shouldValidate: true });
      setInfoMessage(undefined);
    }
  }, [name, checkDuplicate, setError, setValue, handleChange]);

  const { field: genderField } = useController({
    name: "step1.gender",
    control,
  });

  const { onToggle: onGenderToggle, isSelected: isGenderSelected } =
    useSurveyToggleOption<string>({
      selectedValue: genderField.value ?? null,
      mode: "radio",
      onChange: (value) => {
        genderField.onChange(value);
        handleChange();
        if (value === "MALE") {
          setValue("step5.pregnancy", NONE_VALUE, {
            shouldValidate: false,
            shouldDirty: true,
          });
          setValue("step6.lactation", NONE_VALUE, {
            shouldValidate: false,
            shouldDirty: true,
          });
        }
      },
    });

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
          setValue("step5.pregnancy", NONE_VALUE, {
            shouldValidate: false,
            shouldDirty: true,
          });
          setValue("step6.lactation", NONE_VALUE, {
            shouldValidate: false,
            shouldDirty: true,
          });
        }
      },
    });

  return (
    <>
      <DefaultText type="title2">반려견에 대해 알려주세요</DefaultText>

      {!isResurvey && (
        <SurveyButtonGroup title="성별">
          {DIET_ANALYSIS_FORM_INFO.dogBasicInfo.gender.options.map((option) => (
            <ImageButton
              key={option.value}
              label={option.label}
              value={option.value}
              inputType="radio"
              imageSrc={option.imageUrl}
              imageWidth={80}
              imageHeight={80}
              isChecked={isGenderSelected(option.value)}
              onToggle={() => onGenderToggle(option.value)}
            />
          ))}
        </SurveyButtonGroup>
      )}

      <SurveyButtonGroup title="중성화 여부">
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

      {!isResurvey && (
        <SurveyButtonGroup
          title="반려견 이름"
          error={
            touchedFields.step1?.name ? errors.step1?.name?.message : undefined
          }
          info={infoMessage}
        >
          <Controller
            name="step1.name"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                placeholder="이름을 입력해주세요"
                onChange={(e) => {
                  field.onChange(e);
                  // 중복체크 API 정상화 되면 주석 해제
                  // setValue("step1.nameVerified", false, {
                  //   shouldValidate: true,
                  // });
                }}
                onKeyDown={(e) => handleKeyDown(e, field.name)}
              />
            )}
          />

          <Button
            type="primary"
            variant="solid"
            size="inputButton"
            buttonColor="red"
            onClick={handleDuplicateCheck}
          >
            중복체크
          </Button>
        </SurveyButtonGroup>
      )}
    </>
  );
}
