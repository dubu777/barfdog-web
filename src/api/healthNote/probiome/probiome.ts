import {
  ProbiomeKit,
  CreateProbiomeRequest,
  CreateProbiomeResponse,
  ProbiomeDetailResponse,
  ProbiomeList,
  ProbiomePreInfo,
  CreateProbiomePickupRequest,
} from "@/types/healthNote/probiome";
import axiosInstance from "../../axiosInstance";
import { AxiosInstance } from "axios";
import { ApiResponse } from "@/types";

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

const checkProbiomeKit = async (
  serialNo: string
): Promise<ApiResponse<ProbiomeKit>> => {
  const { data } = await axiosInstance.get(
    `/api/v2/health-book/probiome-diagnoses/kits/${serialNo}`
  );

  return data;
};

const getProbiomePreInfo = async (
  petId: number,
  serialNo: string
): Promise<ProbiomePreInfo> => {
  const { data } = await axiosInstance.get(
    `/api/v2/health-book/probiome-diagnoses/prepare?kitSerialNo=${serialNo}&petId=${petId}`
  );

  return data.data;
};

const createProbiomePickup = async ({
  diagnosisId,
  body,
}: {
  diagnosisId: number;
  body: CreateProbiomePickupRequest;
}) => {
  const { data } = await axiosInstance.put(
    `/api/v2/health-book/probiome-diagnoses/${diagnosisId}/kit-pickup`,
    body
  );
  if (data.success) {
    return data.data;
  }
  throw new Error(data.message);
};

export {
  createProbiomeResult,
  getProbiomeDetail,
  getProbiomeList,
  checkProbiomeKit,
  getProbiomePreInfo,
  createProbiomePickup,
};
