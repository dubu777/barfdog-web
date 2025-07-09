import {
  CreateGutCheckRequest,
  CreateGutCheckResponse,
} from "@/types/healthNote/gutCheck";
import axiosInstance from "../axiosInstance";

const createGutCheckResult = async (
  body: CreateGutCheckRequest
): Promise<CreateGutCheckResponse> => {
  const { data } = await axiosInstance.post(
    "/api/v2/health-book/probiome-diagnoses",
    body
  );

  return data;
};

export { createGutCheckResult };
