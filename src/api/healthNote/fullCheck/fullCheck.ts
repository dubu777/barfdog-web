import axiosInstance from "../../axiosInstance";
import { AxiosInstance } from "axios";
import { CheckupDiagnosis, FullCheckFormValues, FullCheckListSearchValues, FullCheckSummary } from "@/types/healthNote/fullCheck";

const getFullCheckSummary = async (petId: number, instance: AxiosInstance = axiosInstance): Promise<FullCheckSummary> => {
  const errorMessage = "건강 종합 진단 요약 조회에 실패했습니다.";
  try {
    const { data } = await instance.get(`/api/v2/health-book/checkup-diagnoses/summary?petId=${petId}`);

    if(data.success) {
      return data.data;
    }
    throw new Error(errorMessage);
  } catch (error) {
    console.error(error);
    throw new Error(errorMessage);
  }
}

const getInfiniteFullCheckList = async ({
  petId,
  pageParam = 0,
  size = 10,
  instance = axiosInstance
}: FullCheckListSearchValues) => {
  const errorMessage = "건강 종합 진단 조회에 실패했습니다.";

  const { data } = await instance.get(`/api/v2/health-book/checkup-diagnoses`, {
    params: { petId, pageNum: pageParam, pageSize: size },
  });

  if (!data.success) {
    throw new Error(errorMessage);
  }

  const checkupDiagnosisList = data?.data?.checkupDiagnosisList ?? [];
  const pagination = data?.data?.pagination ?? { 
    page: 0, 
    size: 10,
    totalPages: 1,
    totalCount: 0,
    isFirstPage: true,
    isLastPage: true,
  };

  return {
    checkupDiagnosisList,
    pagination,
  }
};

const getFullCheckResultDetail = async (diagnosisId: number, instance: AxiosInstance = axiosInstance): Promise<CheckupDiagnosis> => {
  const errorMessage = "건강 종합 진단 상세 조회에 실패했습니다.";
  try {
    const { data } = await instance.get(`/api/v2/health-book/checkup-diagnoses/${diagnosisId}`);

    if(data.success) {
      return data.data;
    }
    throw new Error(errorMessage);
  } catch (error) {
    console.error(error);
    throw new Error(errorMessage);
  }
}

const createFullCheckResult = async (body: FullCheckFormValues) => {
  try {
    const { data } = await axiosInstance.post(`/api/v2/health-book/checkup-diagnoses`, body);
    if (data.success) {
      return data.data;
    }
    throw new Error(data.message);
  } catch (error) {
    throw error;
  }
}

const deleteFullCheckResult = async (diagnosisId: number) => {
  try {
    const { data } = await axiosInstance.delete(`/api/v2/health-book/checkup-diagnoses/${diagnosisId}`);
    if (data.success) {
      return data.data;
    }
    throw new Error(data.message);
  } catch (error) {
    throw error;
  }
}

export {
  getFullCheckSummary,
  getInfiniteFullCheckList,
  getFullCheckResultDetail,
  createFullCheckResult,
  deleteFullCheckResult,
};
