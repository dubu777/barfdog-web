import Text from "@/components/common/text/Text";
import InputField from "@/components/common/inputField/InputField";
import { commonWrapper } from "@/styles/common.css";
import { SignupStepValues } from "@/utils/validation/auth/auth";
import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import CheckIcon from "public/images/survey/check_small.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import {
  getPasswordCriteria,
  PasswordCriteriaItem,
} from "@/utils/validation/auth/password";
import { useEnterFocus } from "@/hooks/common/useEnterFocus";

interface SignupStepProps {
  handleNextStep: () => void;
}

export default function SignupStep2({ handleNextStep }: SignupStepProps) {
  const { control, register, setFocus, getFieldState, trigger } =
    useFormContext<SignupStepValues>();

  const { bind } = useEnterFocus({
    fieldNames: ["step2.password", "step2.confirmPassword"],
    setFocus,
    getFieldState,
    trigger,
    submitCurrentForm: () => handleNextStep(),
  });

  const password = useWatch({ control, name: "step2.password" });

  const criteria: PasswordCriteriaItem[] = useMemo(
    () => getPasswordCriteria(password),
    [password]
  );

  return (
    <>
      <Text type="title2">
        사용하실
        <br />
        비밀번호를 입력해 주세요
      </Text>
      <InputField
        {...register("step2.password")}
        masking
        autoFocus
        maskingButton
        variants="line"
        placeholder="새 비밀번호"
        label="새 비밀번호"
        isRequired
        labelColor="gray600"
        onKeyUp={bind("step2.password")}
      />
      {password.length > 0 && (
        <ul
          className={commonWrapper({
            direction: "col",
            gap: 4,
            align: "start",
          })}
        >
          {criteria.map(({ label, ok }) => (
            <li key={label} className={commonWrapper({ justify: "start" })}>
              <SvgIcon
                src={CheckIcon}
                size={18}
                color={ok ? "blue500" : "gray600"}
              />
              <Text type="caption" color={ok ? "blue500" : "gray600"}>
                {label}
              </Text>
            </li>
          ))}
        </ul>
      )}
      <InputField
        {...register("step2.confirmPassword")}
        masking
        maskingButton
        variants="line"
        placeholder="새 비밀번호 확인"
        label="새 비밀번호 확인"
        isRequired
        labelColor="gray600"
        onKeyUp={bind("step2.confirmPassword")}
      />
    </>
  );
}
