import {
  CreateGutCheckRequest,
  CreateGutCheckResponse,
  GutCheckDetailResponse,
  GutCheckList,
} from "@/types/healthNote/gutCheck";
import axiosInstance from "../../axiosInstance";
import { AxiosInstance } from "axios";

const createGutCheckResult = async (
  body: CreateGutCheckRequest
): Promise<CreateGutCheckResponse> => {
  const { data } = await axiosInstance.post(
    "/api/v2/health-book/probiome-diagnoses",
    body
  );

  return data;
};

const getGutCheckDetail = async (
  diagnosisId: number,
  instance: AxiosInstance = axiosInstance
): Promise<GutCheckDetailResponse> => {
  const { data } = await instance.get(
    `/api/v2/health-book/probiome-diagnoses/${diagnosisId}`
  );

  return data.data;
};

const getGutCheckList = async (
  petId: number,
  instance: AxiosInstance = axiosInstance
): Promise<GutCheckList> => {
  const { data } = await instance.get(
    `/api/v2/health-book/probiome-diagnoses/pet/${petId}`
  );

  return data.data.probiomeDiagnosisList;
};

export { createGutCheckResult, getGutCheckDetail, getGutCheckList };
