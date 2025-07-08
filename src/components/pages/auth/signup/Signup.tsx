"use client";
import * as styles from "./Signup.css";
import {
  defaultSignupStepValues,
  SignupStepValues,
  signupStepsSchema,
  SignupStepKeys,
} from "@/utils/validation/authValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import yup from "yup";
import SignupStep1 from "./signupForm/SignupStep1";
import SignupStep2 from "./signupForm/SignupStep2";
import SignupStep3 from "./signupForm/SignupStep3";
import { useState } from "react";
import { commonWrapper } from "@/styles/common.css";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { useSurveyStep } from "@/hooks/survey/useSurveyStep";
import { useSurveyNavigator } from "@/hooks/survey/useSurveyNavigator";
import { SIGNUP_NO_AUTO_STEP, SIGNUP_OPTIONAL_FIELDS } from "@/constants/auth";
import Header from "@/components/layout/header/Header";
import { useRouter } from "next/navigation";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import useModal from "@/hooks/useModal";
import TermsBottomSheet from "./termsBottomSheet/TermsBottomSheet";

const SignUp = () => {
  const router = useRouter();
  const { isOpen, onClose, onToggle } = useModal();
  const methods = useForm<yup.InferType<typeof signupStepsSchema>>({
    resolver: yupResolver(signupStepsSchema),
    defaultValues: defaultSignupStepValues,
    mode: "all",
  });
  const {
    control,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = methods;
  console.log("watch", watch());
  console.log("errors", errors);
  const stepKeys = Object.keys(defaultSignupStepValues) as SignupStepKeys[];

  const {
    currentStep,
    currentStepKey,
    handleNextStep,
    handlePrevStep,
    isLastStep,
    isFirstStep,
    direction,
  } = useSurveyStep<SignupStepKeys>(stepKeys);

  const { isCanNextStep, handleChange, handleBlur, handleKeyDown } =
    useSurveyNavigator({
      methods,
      currentStepKey,
      handleNextStep,
      noAutoStepSet: SIGNUP_NO_AUTO_STEP,
      optionalField: SIGNUP_OPTIONAL_FIELDS,
    });

  const onSubmit = (data: SignupStepValues) => {
    console.log("formData", data);
  };

  const handleFooterButtonClick = () => {
    if (currentStepKey === "step3") {
      console.log("##");
      onToggle();
    } else {
      handleNextStep();
    }
  };

  return (
    <>
      <Header
        showBackButton={!isFirstStep}
        onClose={() => router.back()}
        onBack={handlePrevStep}
        showCloseButton
        backgroundColor="gray50"
      />

      <div
        className={commonWrapper({
          direction: "col",
          align: "start",
          gap: 20,
          padding: 20,
          height: "full",
          backgroundColors: "gray50",
          justify: "start",
        })}
      >
        <FormProvider {...methods}>
          {currentStep === 1 && <SignupStep1 onNext={handleNextStep} />}
          {currentStep === 2 && <SignupStep2 onNext={handleNextStep} />}
          {currentStep === 3 && <SignupStep3 handleChange={handleChange} />}
        </FormProvider>
        <ButtonDocked
          type="full-button"
          primaryButtonLabel="확인"
          onPrimaryClick={handleFooterButtonClick}
          primaryButtonSize="lg"
          isPrimaryDisabled={!isCanNextStep()}
        />
      </div>
      <TermsBottomSheet isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SignUp;
