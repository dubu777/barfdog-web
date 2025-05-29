"use client";

import * as styles from "./BodyCheckSurvey.css";
import { commonWrapper } from "@/styles/common.css";
import BackIcon from "public/images/header/chevron-left.svg";
import GutIcon from "public/images/healthNote/full-check/gut.svg";
import Header from "@/components/layout/header/Header";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SurveyButton from "@/components/pages/survey/surveyButton/SurveyButton";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useSurveyFlow } from "@/hooks/healthNote/useSurveyFlow";
import { fullCheckSurveyHeader } from "../../fullCheck/survey/FullCheckSurvey.css";
import { useRouter } from "next/navigation";
import { GI_SURVEY_ITEMS } from "@/constants";
import {
  defaultGiSurveyValues,
  giSurveySchema,
} from "@/utils/validation/bodyCheckSurveyValidation";
import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";
import { Controller } from "react-hook-form";

export default function BodyCheckSurvey() {
  const router = useRouter();
  const goBack = () => router.back();

  const { control, setValue, watch, handleSubmit, formState } = useFormHandler(
    giSurveySchema,
    defaultGiSurveyValues
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
    questions: GI_SURVEY_ITEMS,
    watch,
    setValue,
    formState,
  });

  console.log("watch", watch());
  return (
    <NavigationGuard>
      <Header
        leftElement={
          !isFirstStep && (
            <div className={fullCheckSurveyHeader}>
              <SvgIcon
                src={BackIcon}
                size={24}
                color="gray900"
                onClick={() => handlePrevStep()}
              />
            </div>
          )
        }
        onClose={goBack}
        showCloseButton
      />
      <section className={styles.bodyCheckSurveyContainer}>
        <article
          className={commonWrapper({
            direction: "col",
            gap: 12,
            align: "start",
          })}
        >
          <SvgIcon src={GutIcon} size={64} />
          <div
            className={commonWrapper({
              direction: "col",
              align: "start",
            })}
          >
            {(currentQuestion.title as string[]).map((text, idx) => (
              <DefaultText key={idx} type="title3" color="gray900">
                {text}
              </DefaultText>
            ))}
          </div>
        </article>
        <article className={commonWrapper({ direction: "col", gap: 12 })}>
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
      </section>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="다음"
        onPrimaryClick={handleNextStep}
        isPrimaryDisabled={isButtonDisabled}
      />
    </NavigationGuard>
  );
}
