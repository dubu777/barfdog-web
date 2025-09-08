"use client";
import axios from "axios";
import * as styles from "./FullCheckSurvey.css";
import * as yup from "yup";
import { pointColor } from "@/styles/common.css";
import { AnySchema } from "yup";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useWatch } from "react-hook-form";
import BackIcon from "/public/images/header/chevron-left.svg";
import Header from "@/components/layout/header/Header";
import Text from "@/components/common/text/Text";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Spinner from "@/components/common/spinner/Spinner";
import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useSurveyFlow } from "@/hooks/healthNote/useSurveyFlow";
import { DISEASE_CATEGORY_LIST, queryKeys } from "@/constants";
import { useToastStore } from "@/store/useToastStore";
import { createCleanedEntries } from "@/utils/healthNote/fullCheck/createCleanedEntries";
import { sumScores } from "@/utils/healthNote/common/sumScores";
import { getTopSuspectedDiseases } from "@/utils/healthNote/fullCheck/getTopSuspectedDiseases";
import { useGetPetDetail } from "@/api/pet/queries/useGetPetDetail";
import { useCreateFullCheckResult } from "@/api/healthNote/fullCheck/mutations/useCreateFullCheckResult";
import { FullCheckFormValues } from "@/types/healthNote/fullCheck";

const fullCheckSurveySchema = yup.object(
  DISEASE_CATEGORY_LIST.reduce((acc, q) => {
    acc[q.key] = q.multiple
      ? yup.array().of(yup.number()).min(1, "최소 1개 선택")
      : yup.number().required("필수 선택");
    return acc;
  }, {} as Record<string, AnySchema>)
);

// 초기값 정의
const defaultFullCheckSurveyValues = DISEASE_CATEGORY_LIST.reduce((acc, q) => {
  acc[q.key] = q.multiple ? ([] as number[]) : null;
  return acc;
}, {} as Record<string, number | number[] | null>);

export default function FullCheckSurvey ({ petId }: { petId: number }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  const { data: petInfo } = useGetPetDetail(petId);
  const { mutate, isPending } = useCreateFullCheckResult();

  const { control, setValue, watch, handleSubmit, formState } = useFormHandler(
    fullCheckSurveySchema,
    defaultFullCheckSurveyValues
  );
  const walkValue = useWatch({ control, name: "walkCount" });

  const onSpecialOptionSelect = (option) => {
    if (currentQuestion.key === "walkCount" && option === 0) {
      setValue("walkHours", 0);
      handleNextStep(currentStep + 1);
      return;
    }
  };

  const {
    currentStep,
    currentQuestion,
    currentValue,
    isFirstStep,
    isLastStep,
    isButtonDisabled,
    handlePrevStep,
    handleNextStep,
    handleOptionSelect,
  } = useSurveyFlow({
    questions: DISEASE_CATEGORY_LIST,
    onSpecialOptionSelect,
    watch,
    setValue,
    formState,
  });

  const title =
    (typeof currentQuestion?.title === "string" &&
      currentQuestion?.title?.split("@")) ||
    "";

  const onPrevStep = () => {
    // 산책 횟수 값(walk)이 0인 경우 산책 시간 값(walkHours) 2단계 전으로 이동
    if (currentStep === 4 && walkValue === 0) {
      handlePrevStep(currentStep - 2);
    } else {
      handlePrevStep();
    }
  };

  const onNextStep = () => {
    // 마지막 질문 버튼 활성화시 제출 처리
    if (isLastStep && !isButtonDisabled) {
      handleSubmit(onSubmit)();
    } else {
      handleNextStep();
    }
  };

  const onSubmit = (data: typeof defaultFullCheckSurveyValues) => {
    const cleaned = createCleanedEntries(data, (key, value, fullData) => {
      if (key === "walkHours") return [];
      if (key === "walkCount") {
        const hoursPerWalk = fullData.walkHours as number; // 시간 단위 값 (0.5, 1.0, 2.5 ...)
        const totalHours = (value as number) * hoursPerWalk;

        let walkScore = 0;
        if (totalHours >= 8) walkScore = 4;
        else if (totalHours >= 5) walkScore = 2;
        else if (totalHours >= 1) walkScore = 1;

        return [["walkScore", walkScore]];
      }
    });
    const checkupScore = sumScores(cleaned);
    // walkCount와 walkHours를 제외한 값만 ScoreInput 타입으로 변환하여 전달
    const { walkScore: _, ...rest } = cleaned;
    // undefined, null, 배열 등 number가 아닌 값은 제외
    const scoreInputForDisease = Object.fromEntries(
      Object.entries(rest).filter(([_, v]) => typeof v === "number")
    ) as Record<string, number>;

    const suspectedDiseases = getTopSuspectedDiseases(scoreInputForDisease);
    const suspectedDiseaseCategoryList = suspectedDiseases.map(disease => disease.category);
    const suspectedDiseaseTypeList = suspectedDiseases.map(disease => disease.diseaseKey);

    const body = {
      petId,
      checkupScore,
      walkCount: data.walkCount,
      walkHours: data.walkHours,
      suspectedDiseaseCategoryList,
      suspectedDiseaseTypeList,
    }
    mutate({
      body: body as FullCheckFormValues
    }, {
      onSuccess: async (data) => {
        const diagnosisId = data?.diagnosisId;
        await queryClient.invalidateQueries({
          queryKey: [queryKeys.FULL_CHECK.BASE, queryKeys.FULL_CHECK.GET_FULL_CHECK_RESULT_DETAIL, diagnosisId],
        });
        router.push(`/health-note/${petId}/full-check/result/${diagnosisId}`);
      },
      onError: (error) => {
        if(axios.isAxiosError(error)) {
          addToast(error.message, 'above-button');
        }
        console.log(error);
      }
    })
  };

  if (isPending) return <Spinner fullscreen />
  return (
    <NavigationGuard>
      <Header
        backgroundColor='gray50'
        leftElement={
          !isFirstStep && (
            <div className={styles.fullCheckSurveyHeader}>
              <SvgIcon
                src={BackIcon}
                size={24}
                color="gray900"
                onClick={onPrevStep}
              />
              <Text type="headline3" color="gray500">
                이전
              </Text>
            </div>
          )
        }
        onClose={() => router.back()}
        showCloseButton
      />
      <div className={styles.fullCheckSurveyContainer}>
        <article className={styles.fullCheckSurveyTitle}>
          <SvgIcon src={currentQuestion.imageUrl!} size={64} />
          <Text type="title3">
            {currentQuestion?.title ? (
              <>
                {petInfo ? `${petInfo.name}` : "반려견"}의<br />
                <span className={pointColor}>{title[0]}</span>
                {title[1]}
              </>
            ) : (
              <>
                <span className={pointColor}>
                  {currentQuestion?.label} 관련 나타나는
                </span>
                <br />
                증상을 모두 체크해 주세요
              </>
            )}
          </Text>
        </article>
        <article
          className={styles.surveyAnswerList({
            flexWrap: currentQuestion?.flexWrap || false,
          })}
        >
          <Controller
            control={control}
            name={currentQuestion?.key}
            render={({ field }) => (
              <>
                {currentQuestion?.options.map((option) => {
                  const watchedValue = watch(field.name);
                  const isSelected = currentQuestion?.multiple
                    ? Array.isArray(watchedValue) &&
                      watchedValue.includes(option.value as number)
                    : watchedValue === option.value;
                  return (
                    <div
                      key={option.label}
                      style={{
                        width: currentQuestion?.flexWrap
                          ? "calc(50% - 6px)"
                          : "100%",
                      }}
                    >
                      <SurveyButton
                        key={option.label}
                        label={option.label}
                        value={option.value}
                        inputType="checkbox"
                        onToggle={() => handleOptionSelect(option)}
                        isChecked={isSelected}
                      />
                    </div>
                  );
                })}
              </>
            )}
          />
        </article>
      </div>
      {(currentStep < 4 ? currentValue : true) &&
        <ButtonDocked
          type="full-button"
          primaryButtonLabel={isLastStep ? "결과 보기" : "다음"}
          onPrimaryClick={onNextStep}
          isPrimaryDisabled={isButtonDisabled}
        />
      }
    </NavigationGuard>
  );
};