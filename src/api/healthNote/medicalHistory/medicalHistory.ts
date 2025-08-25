import axiosInstance from "../../axiosInstance";
import { AxiosInstance } from "axios";
import {
  MedicalHistoryFormValue,
  MedicalHistoryData,
  MedicalHistoryDetail,
  CreateMedicalHistoryResponse,
} from "@/types/healthNote/medicalHistory";

const getMedicalHistoryList = async (
  petId: number,
  instance: AxiosInstance = axiosInstance
): Promise<MedicalHistoryData[]> => {
  const errorMessage = "병원 진료 기록 조회에 실패했습니다.";
  try {
    const { data } = await instance.get(
      `/api/v2/health-book/medical-diagnoses?petId=${petId}`
    );

    if (data.success) {
      return data.data.medicalDiagnosisList;
    }
    throw new Error(errorMessage);
  } catch (error) {
    console.error(error);
    throw new Error(errorMessage);
  }
};

const createMedicalHistory = async (body: MedicalHistoryFormValue) => {
  try {
    const { data } = await axiosInstance.post(
      `/api/v2/health-book/medical-diagnoses`,
      body
    );
    if (data.success) {
      return data.data as CreateMedicalHistoryResponse;
    }
    console.log(data);

    throw new Error(data.message);
  } catch (error) {
    throw error;
  }
};

const getMedicalHistoryDetail = async (
  diagnosisId: number,
  instance: AxiosInstance = axiosInstance
): Promise<MedicalHistoryDetail> => {
  const errorMessage = "병원 진료 기록 상세 조회에 실패했습니다.";
  try {
    const { data } = await instance.get(
      `/api/v2/health-book/medical-diagnoses/${diagnosisId}`
    );

    if (data.success) {
      return data.data;
    }
    throw new Error(errorMessage);
  } catch (error) {
    console.error(error);
    throw new Error(errorMessage);
  }
};

const deleteMedicalHistory = async (diagnosisId: number) => {
  try {
    const { data } = await axiosInstance.delete(
      `/api/v2/health-book/medical-diagnoses/${diagnosisId}`
    );
    if (data.success) {
      return data.data;
    }
    throw new Error(data.message);
  } catch (error) {
    throw error;
  }
};

const updateMedicalHistory = async (
  diagnosisId: number,
  body: MedicalHistoryFormValue
) => {
  try {
    const { data } = await axiosInstance.put(
      `/api/v2/health-book/medical-diagnoses/${diagnosisId}`,
      body
    );
    if (data.success) {
      return data.data;
    }
    throw new Error(data.message);
  } catch (error) {
    throw error;
  }
};

export {
  getMedicalHistoryList,
  createMedicalHistory,
  getMedicalHistoryDetail,
  deleteMedicalHistory,
  updateMedicalHistory,
};
