"use client";

import {
  SignupStepKeys,
  SignupStepValues,
  defaultSignupStepValues,
  signupStepsSchema,
} from "@/utils/validation/auth/signup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import yup from "yup";
import SignupStep1 from "./steps/SignupStep1";
import SignupStep2 from "./steps/SignupStep2";
import SignupStep3 from "./steps/SignupStep3";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { useSurveyStep } from "@/hooks/survey/useSurveyStep";
import { useSurveyNavigator } from "@/hooks/survey/useSurveyNavigator";
import { SIGNUP_NO_AUTO_STEP, SIGNUP_OPTIONAL_FIELDS } from "@/constants/auth";
import Header from "@/components/layout/header/Header";
import { useRouter } from "next/navigation";
import useModal from "@/hooks/useModal";
import TermsBottomSheet from "./terms/TermsBottomSheet";
import { signupContainer } from "./steps/SignupStep.css";
import Text from "@/components/common/text/Text";
import { buildSignupRequest } from "@/utils/auth/buildSignupRequest";
import { useSignup } from "@/api/auth/mutations/useSignup";
import { useLogin } from "@/api/auth/mutations/useLogin";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";

export default function Signup() {
  const router = useRouter();
  const {
    isOpen: isTermsOpen,
    onClose: onTermsClose,
    onToggle: onTermsToggle,
  } = useModal();
  const {
    isOpen: isModalOpen,
    onClose: onModalClose,
    onToggle: onModalToggle,
  } = useModal();
  const { mutate: signup } = useSignup();
  const { mutate: login } = useLogin();

  const methods = useForm<yup.InferType<typeof signupStepsSchema>>({
    resolver: yupResolver(signupStepsSchema),
    defaultValues: defaultSignupStepValues,
    mode: "all",
  });

  const stepKeys = Object.keys(defaultSignupStepValues) as SignupStepKeys[];

  const {
    currentStep,
    currentStepKey,
    handleNextStep,
    handlePrevStep,
    isFirstStep,
  } = useSurveyStep<SignupStepKeys>(stepKeys);

  const { isCanNextStep } = useSurveyNavigator({
    methods,
    currentStepKey,
    handleNextStep,
    noAutoStepSet: SIGNUP_NO_AUTO_STEP,
    optionalField: SIGNUP_OPTIONAL_FIELDS,
  });

  const handleSignup = (data: SignupStepValues) => {
    const body = buildSignupRequest(data);
    signup(body, {
      onSuccess: () => {
        onModalToggle();
      },
    });
  };
  const handleSignin = () => {
    const email = methods.getValues("step1.email");
    const password = methods.getValues("step2.password");
    login({ email, password });
    window.location.href = "/";
  };

  const handleConfirmClick = () => {
    if (currentStepKey === "step3") {
      onTermsToggle();
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
        leftElement={
          !isFirstStep && (
            <Text type="headline3" color="gray700">
              이전
            </Text>
          )
        }
        leftSlotGap="sm"
        backgroundColor="gray50"
      />
      <FormProvider {...methods}>
        <div className={signupContainer}>
          {currentStep === 1 && <SignupStep1 onNextStep={handleNextStep} />}
          {currentStep === 2 && <SignupStep2 handleNextStep={handleNextStep} />}
          {currentStep === 3 && <SignupStep3 />}
          <ButtonDocked
            type="full-button"
            primaryButtonLabel="확인"
            onPrimaryClick={handleConfirmClick}
            primaryButtonSize="lg"
            isPrimaryDisabled={!isCanNextStep()}
          />
        </div>
        {isTermsOpen && (
          <TermsBottomSheet
            isOpen={true}
            onClose={onTermsClose}
            onSignup={handleSignup}
          />
        )}
        {isModalOpen && (
          <AlertModal
            isOpen={isModalOpen}
            onClose={onModalClose}
            title="회원 가입이 완료됐어요!🎉"
            content="우리 아이의 일상이 더 건강해질 수 있도록 도와드릴게요."
            confirmText="확인"
            onConfirm={handleSignin}
            buttonPosition="right"
          />
        )}
      </FormProvider>
    </>
  );
}
