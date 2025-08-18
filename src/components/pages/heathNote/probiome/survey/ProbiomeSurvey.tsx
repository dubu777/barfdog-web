"use client";

import DefaultText from "@/components/common/defaultText/DefaultText";
import Header from "@/components/layout/header/Header";
import SurveyProgressBar from "@/components/common/survey/surveyProgressBar/SurveyProgressBar";
import {
  PROBIOME_NO_AUTO_STEP,
  PROBIOME_OPTIONAL_FIELDS,
  PROBIOME_SECTIONS,
} from "@/constants/healthNote/probiome";
import { useSurveyNavigator } from "@/hooks/survey/useSurveyNavigator";
import { SkipCondition, useSurveyStep } from "@/hooks/survey/useSurveyStep";
import {
  defaultProbiomeStepValues,
  ProbiomeStepKeys,
  probiomeStepSchema,
} from "@/utils/validation/probiomeValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { useProbiomeStepElements } from "./steps/StepElements";
import SurveyStepViewport from "@/components/common/survey/surveyStepViewport/SurveyStepViewport";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { useCreateProbiomeResult } from "@/api/healthNote/probiome/mutations/useCreateProbiomeResult";
import { buildProbiomePayload } from "@/utils/healthNote/buildProbiomePayload";
import { Gender } from "@/types";

interface ProbiomeSurveyProps {
  petId: number;
  kitId: number;
  petName: string;
  gender: Gender;
}

export default function ProbiomeSurvey({
  petId,
  kitId,
  petName,
  gender,
}: ProbiomeSurveyProps) {
  const router = useRouter();
  const { mutate: submitResult } = useCreateProbiomeResult({
    onSuccess: (response) => {
      // TODO: 성공 시 결과 페이지로 이동 또는 사용자 피드백 처리
      console.log("response", response); // 임시
    },
    onError: (err) => {
      // TODO: 에러 처리 로직 추가 (사용자에게 에러 메시지 표시)
      console.error("err", err);
    },
  });

  const methods = useForm<yup.InferType<typeof probiomeStepSchema>>({
    resolver: yupResolver(probiomeStepSchema),
    defaultValues: defaultProbiomeStepValues,
    mode: "all",
  });

  const { trigger, getValues } = methods;

  const stepKeys = Object.keys(defaultProbiomeStepValues) as ProbiomeStepKeys[];

  const skipConditions = useMemo<SkipCondition<ProbiomeStepKeys>[]>(
    () => [
      {
        from: "step5",
        to: "step7",
        predicate: () => gender === "MALE",
      },
    ],
    [gender]
  );

  const {
    currentStep,
    currentStepKey,
    handleNextStep,
    handlePrevStep,
    isLastStep,
    isFirstStep,
    direction,
  } = useSurveyStep<ProbiomeStepKeys>(stepKeys, skipConditions);

  const { isCanNextStep, handleChange, handleBlur, handleKeyDown } =
    useSurveyNavigator({
      methods,
      currentStepKey,
      handleNextStep,
      noAutoStepSet: PROBIOME_NO_AUTO_STEP,
      optionalField: PROBIOME_OPTIONAL_FIELDS,
    });

  const steps = useProbiomeStepElements({
    handleChange,
    handleBlur,
    handleKeyDown,
    handleNextStep,
    dogName: petName,
  });

  const handleSurveySubmit = useCallback(async () => {
    if (!(await trigger())) return;

    const values = getValues();

    // TODO: petId, kitId를 실제 사용자 데이터에서 가져오도록 수정 필요
    const payload = buildProbiomePayload(values, petId, kitId);

    submitResult(payload);
  }, [trigger, getValues, submitResult]);

  const handleFooterButtonClick = () => {
    if (isLastStep) {
      handleSurveySubmit();
    } else {
      handleNextStep();
    }
  };
  return (
    <div>
      <Header
        leftElement={
          !isFirstStep && (
            <DefaultText type="headline3" color="gray700">
              이전
            </DefaultText>
          )
        }
        showBackButton={!isFirstStep}
        showCloseButton
        onClose={() => router.back()}
        onBack={handlePrevStep}
        backgroundColor="gray50"
        leftSlotGap="sm"
      />
      <SurveyProgressBar
        currentStep={currentStep}
        sections={PROBIOME_SECTIONS}
      />
      <FormProvider {...methods}>
        <SurveyStepViewport
          currentStep={currentStep}
          direction={direction}
          steps={steps}
        />
      </FormProvider>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel={isLastStep ? "결과 보기" : "다음"}
        onPrimaryClick={handleFooterButtonClick}
        isPrimaryDisabled={!isCanNextStep()}
      />
    </div>
  );
}
