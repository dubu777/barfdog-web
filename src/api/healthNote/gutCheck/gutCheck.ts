import {
  CreateGutCheckRequest,
  CreateGutCheckResponse,
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

const getGutCheckResult = async (
  diagnosisId: number,
  instance: AxiosInstance = axiosInstance
): Promise<any> => {
  const { data } = await instance.get(
    `/api/v2/health-book/probiome-diagnoses/${diagnosisId}`
  );

  return data;
};

const getGutCheckList = async (
  petId: number,
  instance: AxiosInstance = axiosInstance
): Promise<any> => {
  const { data } = await instance.get(
    `/api/v2/health-book/probiome-diagnoses/pet/${petId}`
  );

  return data.data.probiomeDiagnosisList;
};

export { createGutCheckResult, getGutCheckResult, getGutCheckList };
