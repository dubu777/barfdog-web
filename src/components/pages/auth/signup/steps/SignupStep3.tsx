import Text from "@/components/common/text/Text";
import InputField from "@/components/common/inputField/InputField";
import { commonWrapper, pointColor } from "@/styles/common.css";
import { SignupStepValues } from "@/utils/validation/auth/auth";
import {
  Controller,
  useController,
  useFormContext,
  useWatch,
} from "react-hook-form";
import CustomDatePicker from "@/components/common/datePicker/CustomDatePicker";
import { format } from "date-fns";
import MobileDatePicker from "@/components/common/datePicker/mobileDatePicker/MobileDatePicker";
import useDeviceState from "@/hooks/useDeviceState";
import LabeledRadioButton from "@/components/common/labeledRadioButton/LabeledRadioButton";
import { GENDER_CATEGORY } from "@/constants/auth";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import InputLabel from "@/components/common/inputLabel/InputLabel";
import { useRequestPhoneVerificationCode } from "@/api/auth/mutations/useRequestPhoneVerificationCode";
import { useVerifyPhoneCode } from "@/api/auth/mutations/useVerifyPhoneCode";
import { useCallback, useState } from "react";
import { VerificationStep } from "@/types";
import { useToastStore } from "@/store/useToastStore";

export default function SignupStep3() {
  const { addToast } = useToastStore();
  const {
    control,
    register,
    getValues,
    formState: { errors },
  } = useFormContext<SignupStepValues>();
  const { isMobileDevice } = useDeviceState();
  const { mutate: requestCode } = useRequestPhoneVerificationCode();
  const { mutate: verifyCode } = useVerifyPhoneCode();

  const [authToken, setAuthToken] = useState("");
  // const [authCode, setAuthCode] = useState("");
  const [expiryDate, setExpiryDate] = useState<string | null>(null);
  const [requestError, setRequestError] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [step, setStep] = useState<VerificationStep>("request");

  const authNumber = useWatch({
    control,
    name: "step3.authNumber",
  });

  const handleRequestCode = useCallback(() => {
    const phoneNumber = getValues("step3.phoneNumber");
    requestCode(phoneNumber, {
      onSuccess: (res) => {
        setStep("verify");
        setAuthToken(res.authToken);
        setExpiryDate(res.expiryDate);
        setRequestError("");
        setInfoMessage("휴대폰 번호로 인증번호가 발송됐어요");
      },
      onError: () => {
        setRequestError("입력하신 정보를 다시 확인해 주세요");
      },
    });
  }, [requestCode, addToast]);

  const handleVerifyCode = useCallback(() => {
    const authCode = getValues("step3.authNumber");
    verifyCode(
      { authToken, authCode },
      {
        onSuccess: (res) => {
          setStep("verified");
          setInfoMessage("휴대폰 번호로 인증이 완료됐어요");
          setVerifyError("");
        },
        onError: () => {
          setVerifyError("인증번호가 일치하지 않아요");
          setInfoMessage("");
        },
      }
    );
  }, [verifyCode, authToken, addToast]);

  const handleExpire = useCallback(() => {
    setVerifyError(
      "인증 유효시간이 초과됐어요. [재전송]을 눌러 인증번호를 다시 입력해 주세요."
    );
  }, []);

  const { field: genderField } = useController({
    name: "step3.gender",
    control,
  });
  const { onToggle, isSelected } = useSurveyToggleOption<string>({
    selectedValue: genderField.value ?? null,
    mode: "radio",
    onChange: (value) => {
      genderField.onChange(value);
    },
  });

  const isVerified = step === "verified";
  const isRequested = step !== "request";
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
        autoFocus
        labelColor="gray600"
        confirmButton
        maxLength={11}
        disabled={isVerified}
        error={errors?.step3?.phoneNumber?.message ?? requestError}
        confirmButtonDisabled={!!errors.step3?.phoneNumber}
        confirmButtonText={isRequested ? "재전송" : "인증번호"}
        onSubmit={handleRequestCode}
      />
      {isRequested && (
        <InputField
          {...register("step3.authNumber")}
          variants="line"
          placeholder="인증번호를 입력해주세요"
          labelColor="gray600"
          confirmButton
          maxLength={11}
          confirmButtonDisabled={isVerified || (authNumber?.length ?? 0) !== 4}
          confirmButtonText="확인"
          disabled={isVerified}
          success={infoMessage}
          error={verifyError}
          onSubmit={handleVerifyCode}
        />
      )}
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
