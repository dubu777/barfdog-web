import { useToastStore } from "@/store/useToastStore";
import { extractErrorMessage } from "@/utils/api/apiResponseUtils";

/**
 * API 응답 처리를 위한 커스텀 훅
 * API 에러와 성공 응답을 사용자 친화적인 토스트 메시지로 변환
 */
export const useApiResponseHandler = () => {
  const { addToast } = useToastStore();

  /**
   * 에러를 처리하고 토스트로 표시하는 함수
   * @param error 에러 객체
   * @param defaultMessage 기본 에러 메시지
   */
  const handleError = (
    error: unknown, 
    defaultMessage: string = '요청 처리 중 오류가 발생했습니다.', 
    returnErrorMessage?: boolean
  ) => {
    const errorMessage = extractErrorMessage(error, defaultMessage);
    if (returnErrorMessage) {
      return errorMessage;
    }
    addToast(errorMessage);
  };

  /**
   * 성공 메시지를 토스트로 표시하는 함수
   * @param message 성공 메시지
   */
  const handleSuccess = (message: string) => {
    addToast(message);
  };

  return {
    handleError,
    handleSuccess,
  };
};
