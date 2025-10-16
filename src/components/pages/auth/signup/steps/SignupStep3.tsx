import Text from "@/components/common/text/Text";
import InputField from "@/components/common/inputField/InputField";
import { commonWrapper, pointColor } from "@/styles/common.css";
import { SignupStepValues } from "@/utils/validation/auth/auth";
import { Controller, useController, useFormContext } from "react-hook-form";
import CustomDatePicker from "@/components/common/datePicker/CustomDatePicker";
import { format } from "date-fns";
import MobileDatePicker from "@/components/common/datePicker/mobileDatePicker/MobileDatePicker";
import useDeviceState from "@/hooks/useDeviceState";
import LabeledRadioButton from "@/components/common/labeledRadioButton/LabeledRadioButton";
import { GENDER_CATEGORY } from "@/constants/auth";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import InputLabel from "@/components/common/inputLabel/InputLabel";

interface SignupStep3Props {
  handleChange: () => Promise<void>;
}

export default function SignupStep3({ handleChange }: SignupStep3Props) {
  const { control, register } = useFormContext<SignupStepValues>();
  const { isMobileDevice } = useDeviceState();

  const { field: genderField } = useController({
    name: "step3.gender",
    control,
  });
  const { onToggle, isSelected } = useSurveyToggleOption<string>({
    selectedValue: genderField.value ?? null,
    mode: "radio",
    onChange: (value) => {
      genderField.onChange(value);
      handleChange();
    },
  });
  return (
    <>
      <Text type="title2">
        기타 회원정보를
        <br />
        입력해 주세요
      </Text>

      <InputField
        {...register("step3.phoneNumber")}
        variants="line"
        placeholder="번호만 입력해주세요"
        label="연락처"
        isRequired
        labelColor="gray600"
        confirmButton
        confirmButtonDisabled
        confirmButtonText="입력"
      />

      <InputField
        {...register("step3.authNumber")}
        variants="line"
        placeholder="인증번호를 입력해주세요"
        labelColor="gray600"
        confirmButton
        confirmButtonDisabled
        confirmButtonText="확인"
      />

      <div
        className={commonWrapper({
          direction: "col",
          gap: 8,
          align: "start",
        })}
      >
        <Text type="label4" color="gray600">
          성별정보<span className={pointColor}> *</span>
        </Text>
        <div className={commonWrapper({ justify: "start", gap: 20 })}>
          {GENDER_CATEGORY.map(({ label, value }) => (
            <LabeledRadioButton
              key={label}
              value={value}
              fullWidth={false}
              optionType="radio"
              isChecked={isSelected(value)}
              onToggle={() => onToggle(value)}
            >
              <Text type="label2">{label}</Text>
            </LabeledRadioButton>
          ))}
        </div>
      </div>

      <Controller
        name="step3.birthday"
        control={control}
        render={({ field }) => (
          <>
            {isMobileDevice ? (
              <MobileDatePicker
                value={field.value}
                onChange={(date) => {
                  field.onChange(format(date as Date, "yyyy-MM-dd"));
                  handleChange();
                }}
                label="생년월일"
                isRequired
              />
            ) : (
              <div
                className={commonWrapper({
                  direction: "col",
                  gap: 8,
                  align: "start",
                })}
              >
                <InputLabel label="생년월일" labelColor="gray800" isRequired />
                <CustomDatePicker
                  name={field.name}
                  value={field.value}
                  onChange={(date) => {
                    field.onChange(format(date as Date, "yyyy-MM-dd"));
                  }}
                  dateFormat="yyyy-MM-dd"
                  marginBottom={false}
                />
              </div>
            )}
          </>
        )}
      />
      <InputField
        {...register("step3.recommendCode")}
        variants="line"
        placeholder="추천인 코드를 입력하세요(계정 당 1회 입력)"
        label="추천코드"
        labelColor="gray600"
      />
    </>
  );
}
