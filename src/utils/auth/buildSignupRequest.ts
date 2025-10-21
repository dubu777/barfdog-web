import { SignupRequest } from "@/types/auth";
import { SignupStepValues } from "@/utils/validation/auth/signup";

/**
 * React Hook Form의 SignupStepValues를 서버 API의 SignupRequest로 변환합니다.
 */
export const buildSignupRequest = (
  formValues: SignupStepValues
): SignupRequest => {
  const { step1, step2, step3, step4 } = formValues;

  return {
    // Step 1: 이름, 이메일
    name: step1.name.trim(),
    email: step1.email.trim(),

    // Step 2: 비밀번호
    password: step2.password,
    confirmPassword: step2.confirmPassword,

    // Step 3: 연락처, 인증, 생년월일, 성별, 추천코드
    phoneNumber: step3.phoneNumber,
    birthday: step3.birthday,
    gender: step3.gender,
    recommendCode: step3.recommendCode,

    // Step 4: 약관 동의
    agreement: {
      servicePolicy: step4.servicePolicy,
      privacyPolicy: step4.privacyPolicy,
      receiveSms: step4.receiveSms,
      receiveEmail: step4.receiveEmail,
      over14YearsOld: step4.over14YearsOld,
    },
  };
};
