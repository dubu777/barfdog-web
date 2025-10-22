import axiosInstance from "../../axiosInstance";
import { AxiosInstance } from "axios";
import {
  BodyCheckDetailMap,
  BodyPartMap,
  BodyPartType,
  GastroDiagnosisData,
  LatestBodyCheck,
  ObesityDiagnosisData,
  SkinDiagnosisData,
} from "@/types/healthNote/bodyCheck";
import { ApiResponse, Pagination } from "@/types";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";

const getLatestBodyCheck = async (petId: number, instance: AxiosInstance = axiosInstance): Promise<LatestBodyCheck> => {
  const { data }: { 
    data: ApiResponse<{ 
      gastroDiagnosis: GastroDiagnosisData; 
      obesityDiagnosis: ObesityDiagnosisData; 
      skinDiagnosis: SkinDiagnosisData 
  }> } = await instance.get(
    `/api/v2/health-book/body-part-diagnoses/latest?petId=${petId}`
  );

  const responseData = validateApiResponse(data, '부위별 진단 최신 요약 조회에 실패했습니다.');

  return {
    gastro: responseData.gastroDiagnosis,
    obesity: responseData.obesityDiagnosis,
    skin: responseData.skinDiagnosis,
  }
}

const getInfiniteBodyCheckList = async (
  petId,
  part: BodyPartType,
  pageParam = 0,
  size = 10,
  instance = axiosInstance
) => {
  const { data }: { 
    data: ApiResponse<{ 
      bodyPartDiagnosisList: BodyCheckDetailMap[BodyPartType]; 
      pagination: Pagination 
  }> } = await instance.get(
    `/api/v2/health-book/body-part-diagnoses/${part}`, 
    { 
      params: { 
        petId, 
        pageNum: pageParam, 
        pageSize: size 
      },
    }
  );

  const responseData = validateApiResponse(data, '부위별 진단 목록 조회에 실패했습니다.');

  return {
    diagnosisList: responseData.bodyPartDiagnosisList,
    pagination: responseData.pagination,
  };
};

const createBodyCheckResult = async <P extends BodyPartType>(
  part: P,
  body: BodyPartMap[P]["form"]
): Promise<BodyPartMap[P]["response"]> => {
  const { data }: { 
    data: ApiResponse<BodyPartMap[P]["response"]> 
  } = await axiosInstance.post(
    `/api/v2/health-book/body-part-diagnoses/${part}`
    , body
  );

  return validateApiResponse(data, '부위별 진단 결과 생성에 실패했습니다.');
}

function mapScores<T extends object>(obj: T): { name: keyof T; score: number }[] {
  return Object.entries(obj).map(([key, value]) => ({
    name: key as keyof T,
    score: value as number,
  }));
}

const getBodyCheckResultDetail = async <P extends BodyPartType>(
  part: P,
  diagnosisId: number,
  instance: AxiosInstance = axiosInstance
): Promise<BodyCheckDetailMap[P]> => {
  const { data }: { 
    data: ApiResponse<BodyCheckDetailMap[P]> 
  } = await instance.get(
    `/api/v2/health-book/body-part-diagnoses/${part}/${diagnosisId}`
  );

  const responseData = validateApiResponse(data, '부위별 진단 상세 조회에 실패했습니다.');
  const {
    diagnosisId: diagnosisIdResponse,
    simpleTotalScore,
    bodyPartTotalScore,
    bodyPartType,
    diagnosisDate,
    recommendedItemList,
    ...rest
  } = responseData;
  const scores = mapScores(rest as BodyCheckDetailMap[P]);
  return {
    diagnosisId: diagnosisIdResponse,
    simpleTotalScore,
    bodyPartTotalScore,
    bodyPartType,
    diagnosisDate,
    recommendedItemList,
    scores,
  } as BodyCheckDetailMap[P];

}

export {
  getLatestBodyCheck,
  getInfiniteBodyCheckList,
  createBodyCheckResult,
  getBodyCheckResultDetail,
};
