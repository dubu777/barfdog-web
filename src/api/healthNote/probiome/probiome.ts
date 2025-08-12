import {
  CreateProbiomeRequest,
  CreateProbiomeResponse,
  ProbiomeDetailResponse,
  ProbiomeList,
} from "@/types/healthNote/probiome";
import axiosInstance from "../../axiosInstance";
import { AxiosInstance } from "axios";

const createProbiomeResult = async (
  body: CreateProbiomeRequest
): Promise<CreateProbiomeResponse> => {
  const { data } = await axiosInstance.post(
    "/api/v2/health-book/probiome-diagnoses",
    body
  );

  return data;
};

const getProbiomeDetail = async (
  diagnosisId: number,
  instance: AxiosInstance = axiosInstance
): Promise<ProbiomeDetailResponse> => {
  const { data } = await instance.get(
    `/api/v2/health-book/probiome-diagnoses/${diagnosisId}`
  );

  return data.data;
};

const getProbiomeList = async (petId: number): Promise<ProbiomeList> => {
  const { data } = await axiosInstance.get(
    `/api/v2/health-book/probiome-diagnoses/pet/${petId}`
  );

  return data.data.probiomeDiagnosisList;
};
const checkProbiomeKit = async (serialNo: string): Promise<ProbiomeList> => {
  const { data } = await axiosInstance.get(
    `/api/v2/health-book/probiome-diagnoses/kits/${serialNo}`
  );

  return data.data.probiomeDiagnosisList;
};

export {
  createProbiomeResult,
  getProbiomeDetail,
  getProbiomeList,
  checkProbiomeKit,
};
