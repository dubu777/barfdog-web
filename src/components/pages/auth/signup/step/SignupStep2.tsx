import DefaultText from "@/components/common/defaultText/DefaultText";
import InputField from "@/components/common/inputField/InputField";
import { commonWrapper } from "@/styles/common.css";
import { SignupStepValues } from "@/utils/validation/authValidation";
import { useMemo, useRef } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import CheckIcon from "public/images/survey/check_small.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

export default function SignupStep2() {
  const { control } = useFormContext<SignupStepValues>();

  const password = useWatch({ control, name: "step2.password" });
  // 1) 최소 8자 이상
  const isLongEnough = useMemo(() => password.length >= 8, [password]);

  // 2) 영문, 숫자, 특수문자 조합
  const hasLetterNumberSpecial = useMemo(
    () =>
      /[A-Za-z]/.test(password) &&
      /\d/.test(password) &&
      /[^A-Za-z0-9]/.test(password),
    [password]
  );

  // 3) 3회 이상 동일 문자 반복 or 연속 문자 방지
  const noInvalidRepetitionOrSequence = useMemo(() => {
    if (password.length < 3) return true;

    for (let i = 0; i < password.length - 2; i++) {
      const a = password.charCodeAt(i);
      const b = password.charCodeAt(i + 1);
      const c = password.charCodeAt(i + 2);

      // 모두 같은 문자
      if (a === b && b === c) return false;
      // 오름차순 연속 (e.g. abc, 123)
      if (b - a === 1 && c - b === 1) return false;
      // 내림차순 연속 (e.g. cba, 321)
      if (a - b === 1 && b - c === 1) return false;
    }
    return true;
  }, [password]);

  // 검증 항목 목록
  const criteria = [
    { label: "영문/숫자/특수문자 조합", ok: hasLetterNumberSpecial },
    { label: "최소 8자 이상", ok: isLongEnough },
    {
      label: "3회 이상 동일하거나 연속성이 없는 문자",
      ok: noInvalidRepetitionOrSequence,
    },
  ];

  const confirmRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <DefaultText type="title2">
        사용하실
        <br />
        비밀번호를 입력해 주세요
      </DefaultText>
      <Controller
        name="step2.password"
        control={control}
        render={({ field }) => (
          <InputField
            {...field}
            onChange={(e) => {
              field.onChange(e);
            }}
            masking
            maskingButton
            variants="line"
            placeholder="새 비밀번호"
            label="새 비밀번호"
            isRequired
            labelColor="gray600"
            onKeyUp={(e) => {
              // Enter 혹은 Tab 키만 체크
              if (
                (e.key === "Enter" || e.key === "Tab") &&
                isLongEnough &&
                hasLetterNumberSpecial &&
                noInvalidRepetitionOrSequence
              ) {
                e.preventDefault();
                confirmRef.current?.focus();
              }
            }}
          />
        )}
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
              <DefaultText type="caption" color={ok ? "blue500" : "gray600"}>
                {label}
              </DefaultText>
            </li>
          ))}
        </ul>
      )}
      <Controller
        name="step2.confirmPassword"
        control={control}
        render={({ field }) => (
          <InputField
            {...field}
            ref={confirmRef}
            onChange={(e) => {
              field.onChange(e);
            }}
            masking
            maskingButton
            variants="line"
            placeholder="새 비밀번호 확인"
            label="새 비밀번호 확인"
            isRequired
            labelColor="gray600"
          />
        )}
      />
    </>
  );
}
