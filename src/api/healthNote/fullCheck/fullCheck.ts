import axiosInstance from "../../axiosInstance";
import { AxiosInstance } from "axios";
import { CheckupDiagnosis, FullCheckFormValues, FullCheckList, FullCheckListSearchValues, FullCheckSummary } from "@/types/healthNote/fullCheck";
import { ApiResponse } from "@/types";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";

const getFullCheckSummary = async (petId: number, instance: AxiosInstance = axiosInstance): Promise<FullCheckSummary> => {
  const { data }: { data: ApiResponse<FullCheckSummary> } = await instance.get(
    `/api/v2/health-book/checkup-diagnoses/summary?petId=${petId}`
  );

  return validateApiResponse(data, "건강 종합 진단 요약 조회에 실패했습니다.");
}

const getInfiniteFullCheckList = async ({
  petId,
  pageParam = 0,
  size = 10,
  instance = axiosInstance
}: FullCheckListSearchValues) => {

  const { data }: { data: ApiResponse<FullCheckList> } = await instance.get(
    `/api/v2/health-book/checkup-diagnoses`,
    {
      params: { 
        petId, 
        pageNum: pageParam, 
        pageSize: size 
      },
    }
  );
  return validateApiResponse(data, "건강 종합 진단 조회에 실패했습니다.");
};

const getFullCheckResultDetail = async (diagnosisId: number, instance: AxiosInstance = axiosInstance): Promise<CheckupDiagnosis> => {
  const { data }: { data: ApiResponse<CheckupDiagnosis> } = await instance.get(
    `/api/v2/health-book/checkup-diagnoses/${diagnosisId}`
  );
  return validateApiResponse(data, "건강 종합 진단 상세 조회에 실패했습니다.");
}

const createFullCheckResult = async (body: FullCheckFormValues) => {
  const { data }: { data: ApiResponse<CheckupDiagnosis> } = await axiosInstance.post(
    `/api/v2/health-book/checkup-diagnoses`,
    body
  );
  return validateApiResponse(data, "건각 종합 진단 결과 생성에 실패했습니다.");
}

const deleteFullCheckResult = async (diagnosisId: number) => {
  const { data }: { data: ApiResponse<CheckupDiagnosis> } = await axiosInstance.delete(
    `/api/v2/health-book/checkup-diagnoses/${diagnosisId}`
  );
  return validateApiResponse(data, "건강 종합 진단 결과 삭제에 실패했습니다.");
}

export {
  getFullCheckSummary,
  getInfiniteFullCheckList,
  getFullCheckResultDetail,
  createFullCheckResult,
  deleteFullCheckResult,
};
