import axiosInstance from "../../axiosInstance";
import { AxiosInstance } from "axios";
import {
  MedicalHistoryFormValue,
  MedicalHistoryData,
  MedicalHistoryDetail,
  MedicalHistoryList,
  CreateMedicalHistoryResponse,
} from "@/types/healthNote/medicalHistory";
import { ApiResponse } from "@/types";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";

const getMedicalHistoryList = async (
  petId: number,
  instance: AxiosInstance = axiosInstance
): Promise<MedicalHistoryData[]> => {
  const { data }: { data: ApiResponse<MedicalHistoryList> } = await instance.get(
    `/api/v2/health-book/medical-diagnoses?petId=${petId}`
  );
  const responseData = validateApiResponse(data, "병원 진료 기록 조회에 실패했습니다.");
  return responseData.medicalDiagnosisList;
};

const createMedicalHistory = async (body: MedicalHistoryFormValue) => {
  const { data }: { data: ApiResponse<CreateMedicalHistoryResponse> } = await axiosInstance.post(
    `/api/v2/health-book/medical-diagnoses`,
    body
  );
  return validateApiResponse(data, "병원 진료 기록 결과 생성에 실패했습니다.");
};

const getMedicalHistoryDetail = async (
  diagnosisId: number,
  instance: AxiosInstance = axiosInstance
): Promise<MedicalHistoryDetail> => {
  const { data }: { data: ApiResponse<MedicalHistoryDetail> } = await instance.get(
    `/api/v2/health-book/medical-diagnoses/${diagnosisId}`
  );
  return validateApiResponse(data, "병원 진료 기록 상세 조회에 실패했습니다.");
};

const deleteMedicalHistory = async (diagnosisId: number) => {
  const { data } = await axiosInstance.delete(
    `/api/v2/health-book/medical-diagnoses/${diagnosisId}`
  );
  return validateApiResponse(data, "병원 진료 기록 결과 삭제에 실패했습니다.");
};

const updateMedicalHistory = async (
  diagnosisId: number,
  body: MedicalHistoryFormValue
) => {
  const { data } = await axiosInstance.put(
    `/api/v2/health-book/medical-diagnoses/${diagnosisId}`,
    body
  );
  return validateApiResponse(data, "병원 진료 기록 결과 수정에 실패했습니다.");
};

export {
  getMedicalHistoryList,
  createMedicalHistory,
  getMedicalHistoryDetail,
  deleteMedicalHistory,
  updateMedicalHistory,
};
