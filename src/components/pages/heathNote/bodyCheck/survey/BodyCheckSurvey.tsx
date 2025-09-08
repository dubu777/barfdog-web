"use client";
import * as styles from "./BodyCheckSurvey.css";
import { commonWrapper } from "@/styles/common.css";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, FieldValues, Path } from "react-hook-form";
import BackIcon from "public/images/header/chevron-left.svg";
import Header from "@/components/layout/header/Header";
import Text from "@/components/common/text/Text";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";
import SurveyProgressBar from "@/components/common/survey/surveyProgressBar/SurveyProgressBar";
import Spinner from "@/components/common/spinner/Spinner";
import { useToastStore } from "@/store/useToastStore";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useSurveyFlow } from "@/hooks/healthNote/useSurveyFlow";
import { sumScores } from "@/utils/healthNote/common/sumScores";
import { calculatePercentageScores } from "@/utils/healthNote/bodyCheck/calculatePercentageScores";
import { queryKeys } from "@/constants";
import { GASTRO_SURVEY_ITEMS } from "@/constants/healthNote/bodyCheck/gastro";
import { BODY_CHECK_DISEASE_INFO, BODY_PART } from "@/constants/healthNote/bodyCheck/common";
import { OBESITY_SURVEY_ITEMS } from "@/constants/healthNote/bodyCheck/obesity";
import { SKIN_SURVEY_ITEMS } from "@/constants/healthNote/bodyCheck/skin";
import { BaseFormValues, BodyPartType, GastroDiagnosis, ObesityDiagnosis, SkinDiagnosis } from "@/types/healthNote/bodyCheck";
import { useCreateBodyCheckResult } from "@/api/healthNote/bodyCheck/mutations/useCreateBodyCheckResult";

interface BodyCheckSurveyProps {
  petId: number;
  part: BodyPartType;
}

type PartMap = {
  gastro: GastroDiagnosis;
  obesity: ObesityDiagnosis;
  skin: SkinDiagnosis;
};

export default function BodyCheckSurvey({ petId, part }: BodyCheckSurveyProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const config = BODY_PART[part];

  // 기본값으로 첫 번째 config 사용 (훅 호출을 위해)
  const safeConfig = config || BODY_PART.gastro;
  const { schema, defaultValues, questions, sections, icon: Icon } = safeConfig;
  
  const { control, setValue, watch, formState, handleSubmit } = useFormHandler<FieldValues>(
    schema,
    defaultValues
  );

  const {
    currentStep,
    currentQuestion,
    isFirstStep,
    isLastStep,
    isButtonDisabled,
    handlePrevStep,
    handleNextStep,
    handleOptionSelect,
  } = useSurveyFlow({
    questions,
    watch,
    setValue,
    formState,
  });

  const { mutate, isPending } = useCreateBodyCheckResult();

  // 잘못된 part 일 경우 리다이렉트 후 null 반환
  if (!config) {
    router.replace(`/health-note/${petId}/body-check`);
    return null;
  }

  const handleClick = () => {
    handleNextStep();
    if (isLastStep) {
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = (data) => {
    const surveyItems = 
      part === "gastro" ? GASTRO_SURVEY_ITEMS : 
      part === "obesity" ? OBESITY_SURVEY_ITEMS : 
      SKIN_SURVEY_ITEMS;

    const simpleTotalScore = sumScores(data);
    const percentageScores = calculatePercentageScores(data, BODY_CHECK_DISEASE_INFO, surveyItems);
    
    const rawScores = Object.fromEntries(
      Object.entries(percentageScores).map(([key, value]) => [key, (value as { rawScore: number; }).rawScore])
    ) as unknown as PartMap[typeof part];
    
    const body: BaseFormValues & PartMap[typeof part] = {
      petId,
      simpleTotalScore,
      ...rawScores,
    };

    mutate({
      part: part,
      body
    }, {
      onSuccess: async (data) => {
        const diagnosisId = data?.diagnosisId;
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: [queryKeys.BODY_CHECK.BASE, queryKeys.BODY_CHECK.GET_BODY_CHECK_RESULT_DETAIL, part, diagnosisId],
          }),
          queryClient.invalidateQueries({
            queryKey: [queryKeys.BODY_CHECK.BASE, queryKeys.BODY_CHECK.GET_BODY_CHECK_LIST, petId, part],
          }),
          queryClient.invalidateQueries({
            queryKey: [queryKeys.BODY_CHECK.BASE, queryKeys.BODY_CHECK.GET_LATEST_BODY_CHECK, petId],
          }),
        ])
        router.push(`/health-note/${petId}/body-check/result/${part}/${diagnosisId}`);
      },
      onError: (error) => {
        addToast(error.message, 'above-button');
        console.log(typeof error);
      }
    })
  };

  if (isPending) return <Spinner fullscreen />
  return (
    <NavigationGuard>
      <Header
        leftElement={
          !isFirstStep && (
            <div className={styles.bodyCheckSurveyHeader}>
              <SvgIcon
                src={BackIcon}
                size={24}
                color="gray900"
                onClick={() => handlePrevStep()}
              />
              <Text type="headline3" color="gray500">
                이전
              </Text>
            </div>
          )
        }
        onClose={() => router.back()}
        backgroundColor='gray50'
        showCloseButton
      />
      <SurveyProgressBar currentStep={currentStep} sections={sections} />
      <section className={styles.bodyCheckSurveyContainer}>
        <article
          className={commonWrapper({
            direction: "col",
            gap: 12,
            align: "start",
          })}
        >
          <SvgIcon src={Icon} size={64} />
          <div
            className={commonWrapper({
              direction: "col",
              align: "start",
            })}
          >
            {(currentQuestion.title as string[]).map((text, idx) => (
              <Text key={idx} type="title3" color="gray900">
                {text}
              </Text>
            ))}
          </div>
        </article>
        <article className={commonWrapper({ direction: "col", gap: 12 })}>
          <Controller
            control={control}
            key={currentQuestion.key}
            name={currentQuestion.key as Path<FieldValues>}
            render={({ field }) => (
              <>
                {currentQuestion?.options.map((option) => (
                  <SurveyButton
                    key={option.key}
                    label={option.label}
                    value={option.value}
                    inputType="checkbox"
                    onToggle={() => {
                      handleOptionSelect(option);
                    }}
                    isChecked={field.value === option.value}
                  />
                ))}
              </>
            )}
          />
        </article>
      </section>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel={isLastStep ? "결과 보기" : "다음"}
        onPrimaryClick={handleClick}
        isPrimaryDisabled={isButtonDisabled}
      />
    </NavigationGuard>
  );
}