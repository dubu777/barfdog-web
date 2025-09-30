import { useState, useCallback, useMemo, ChangeEvent } from "react";
import { RequestPhoneChangeAuthToken, UpdateUserInfo } from "@/types/mypage/account";
import { useRequestPhoneChangeCode } from "@/api/mypage/account/mutations/useRequestPhoneChangeCode";
import { useVerifyPhoneChangeCode } from "@/api/mypage/account/mutations/useVerifyPhoneChangeCode";
import { useApiResponseHandler } from "@/hooks/useApiResponseHandler";

interface UsePhoneAuthProps {
  setValue: (name: keyof UpdateUserInfo, value: any) => void;
  setError: (name: keyof UpdateUserInfo, error: { message: string }) => void;
  clearErrors: (name: keyof UpdateUserInfo) => void;
  phoneNumber: string;
  defaultPhoneNumber: string;
  hasCheckedAuthNumber: boolean;
  authToken: string;
}

export const usePhoneAuth = ({
  setValue,
  setError,
  clearErrors,
  phoneNumber,
  defaultPhoneNumber,
  hasCheckedAuthNumber,
  authToken,
}: UsePhoneAuthProps) => {
  const [success, setSuccess] = useState<string>("");

  const isChangedPhoneNumber = useMemo(() => {
    return phoneNumber !== defaultPhoneNumber;
  }, [phoneNumber, defaultPhoneNumber]);

  // 인증번호 발송 mutation
  const { mutate: requestPhoneChangeCode } = useRequestPhoneChangeCode();
  // 인증번호 검증 mutation
  const { mutate: verifyPhoneChangeCode } = useVerifyPhoneChangeCode();

  const { handleError } = useApiResponseHandler();

  // 인증번호 초기화 헬퍼 함수
  const resetAuthCode = useCallback(() => {
    setValue("authCode", "");
    clearErrors("authCode");
  }, [setValue, clearErrors]);

  // 인증번호 발송 성공 처리
  const handleRequestCodeSuccess = useCallback((data: RequestPhoneChangeAuthToken) => {
    setSuccess("휴대폰 번호로 인증번호가 발송됐어요");
    setValue("authToken", data.authToken);
  }, [setValue]);

  // 인증번호 발송 에러 처리
  const handleRequestCodeError = useCallback((errorResponse: unknown) => {
    const errorMessage = handleError(errorResponse, "휴대폰 번호로 인증번호 발송에 실패했습니다.", true);
    setError("phoneNumber", { message: errorMessage as string });
  }, [setError, handleError]);

  // 인증번호 발송
  const requestAuthCode = useCallback((newPhoneNumber: string) => {
    setValue("hasCheckedAuthNumber", false);
    clearErrors("phoneNumber");
    resetAuthCode();

    requestPhoneChangeCode(
      { newPhoneNumber },
      {
        onSuccess: handleRequestCodeSuccess,
        onError: handleRequestCodeError,
      }
    );
  }, [setValue, clearErrors, requestPhoneChangeCode, handleRequestCodeSuccess, handleRequestCodeError, resetAuthCode]);


  // 인증번호 검증
  const verifyAuthCode = useCallback((value: string) => {
    if (!value) return;
    setSuccess("");

    verifyPhoneChangeCode(
      { authToken: authToken, authCode: value },
      {
        onSuccess: () => {
          setValue("hasCheckedAuthNumber", true);
          clearErrors("authCode");

          const successMessage = "휴대폰 인증이 완료됐어요. 변경을 완료하려면 저장하기를 눌러주세요.";
          setSuccess(successMessage);
        },
        onError: (errorResponse: unknown) => {
          const errorMessage = handleError(errorResponse, "인증번호가 일치하지 않아요", true);
          setError("authCode", { message: errorMessage as string });
        },
      }
    );
  }, [authToken, setValue, clearErrors, setError, handleError, verifyPhoneChangeCode]);

  // 연락처 변경시 예외처리
  const changePhoneNumber = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    resetAuthCode();
    if (value === "") {
      setValue("phoneNumber", defaultPhoneNumber);
    }
  }, [setValue, defaultPhoneNumber, resetAuthCode]);

  // 연락처 초기화
  const resetPhoneNumber = useCallback(() => {
    const validation = 
      (!isChangedPhoneNumber || hasCheckedAuthNumber)
        && (isChangedPhoneNumber && hasCheckedAuthNumber);

    if (validation) {
      setValue("phoneNumber", "");
    }
  }, [setValue, isChangedPhoneNumber, hasCheckedAuthNumber]);

  return {
    isChangedPhoneNumber,
    success,
    resetAuthCode,
    requestAuthCode,
    verifyAuthCode,
    changePhoneNumber,
    resetPhoneNumber
  };
};
