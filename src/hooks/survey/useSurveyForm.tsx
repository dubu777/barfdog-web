import { DefaultValues, Path, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SurveyStepKeys } from "@/utils/validation/surveyValidation";
import { SURVEY_NO_AUTO_NEXT_STEP } from "@/constants";


/**
 * useSurveyForm 훅은 Yup 스키마와 React Hook Form을 결합하여 폼 상태와 유효성 검증을 쉽게 관리할 수 있도록 도와줍니다.
 *
 * @param schema - Yup 객체 스키마 (검증 규칙 정의)
 * @param defaultValues - 폼의 초기 값 (스키마 기반으로 자동 타입 추론)
 * @param options - React Hook Form 옵션 (mode와 reValidateMode 등)
 */
export function useSurveyForm<S extends yup.ObjectSchema<any>>(
  schema: S,
  defaultValues: DefaultValues<yup.InferType<S>>,
  currentStepKey: SurveyStepKeys,
  handleNextStep: () => void
) {
  const methods = useForm<yup.InferType<S>>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "all",
  });

  const {
    watch,
    trigger,
    formState: { errors },
  } = methods;

  const isCanNextStep = () => {
    const stepValues = watch(currentStepKey as Path<yup.InferType<S>>);
    if (!stepValues) return false;

    // optionalFields에 포함된 필드는 allFilled 검증에서 제외
    const allFilled = Object.entries(stepValues).every(([key, value]) => {
      if (typeof value === "string") {
        return value.trim() !== "";
      }
      // 배열일 경우: 배열 길이가 0보다 큰지 확인
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      // 그 외 경우(boolean): null 또는 undefined가 아닌지 확인
      return value !== null && value !== undefined;
    });

    // 예시) step4.dogSize, step4.dogType
    const stepErrorKeys = Object.keys(errors).filter((key) =>
      key.startsWith(currentStepKey)
    );
    const noErrors = stepErrorKeys.length === 0;
    return allFilled && noErrors;
  };

  const handleChange = async () => {
    const valid = await trigger(currentStepKey as Path<yup.InferType<S>>);
    // 자동 넘김이 허용되어 있지 않은 스텝이면 아무 작업도 하지 않음
    if (SURVEY_NO_AUTO_NEXT_STEP.has(currentStepKey)) return;

    // 현재 스텝의 모든 필드가 채워지고 에러가 없으면 다음 스텝으로 넘어갑니다.
    if (valid && isCanNextStep()) {
      handleNextStep();
    }
  };

  /**
   * handleBlur: 필드가 포커스를 잃을 때 해당 필드에 대해 검증을 실행한 후,
   * 현재 스텝이 모두 채워지고 에러가 없으면 handleNextStep()을 호출합니다.
   */
  const handleBlur = async (fieldName: string) => {
    const isValidField = await trigger(fieldName as Path<yup.InferType<S>>);
    if (isValidField && isCanNextStep()) {
      handleNextStep();
    }
  };

  /**
   * handleKeyDown: 엔터 키 입력 시 해당 필드에 대해 검증을 실행한 후,
   * 현재 스텝이 모두 채워지고 에러가 없으면 handleNextStep()을 호출합니다.
   */
  const handleKeyDown = async (e: React.KeyboardEvent, fieldName: string) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed", fieldName);
      
      const isValidField = await trigger(fieldName as Path<yup.InferType<S>>);
      if (isValidField && isCanNextStep()) {
        handleNextStep();
      }
    }
  };


  return {
    ...methods,
    errors,
    isCanNextStep: isCanNextStep(),
    handleChange,
    handleBlur,
    handleKeyDown,
  };
}
