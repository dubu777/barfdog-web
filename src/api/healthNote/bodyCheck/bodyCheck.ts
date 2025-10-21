import axiosInstance from "../../axiosInstance";
import { AxiosInstance } from "axios";
import {
  BodyCheckDetailMap,
  BodyPartMap,
  BodyPartType,
  LatestBodyCheck,
} from "@/types/healthNote/bodyCheck";

const getLatestBodyCheck = async (petId: number, instance: AxiosInstance = axiosInstance): Promise<LatestBodyCheck> => {
  const errorMessage = "부위별 진단 최신 요약 조회에 실패했습니다.";
  try {
    const { data } = await instance.get(`/api/v2/health-book/body-part-diagnoses/latest?petId=${petId}`);

    if(data.success) {
      return {
        gastro: data.data.gastroDiagnosis,
        obesity: data.data.obesityDiagnosis,
        skin: data.data.skinDiagnosis,
      };
    }
    throw new Error(errorMessage);
  } catch (error) {
    console.error(error);
    throw new Error(errorMessage);
  }
}

const getInfiniteBodyCheckList = async (
  petId,
  part: BodyPartType,
  pageParam = 0,
  size = 10,
  instance = axiosInstance
) => {
  const errorMessage = "건강 종합 진단 조회에 실패했습니다.";

  const { data } = await instance.get(`/api/v2/health-book/body-part-diagnoses/${part}`, {
    params: { petId, pageNum: pageParam, pageSize: size },
  });

  if (!data.success) {
    throw new Error(errorMessage);
  }

  return {
    diagnosisList: data.data.bodyPartDiagnosisList ?? [],
    pagination: data.data.pagination ?? {
      page: 0,
      size,
      totalPages: 1,
      totalCount: 0,
      isFirstPage: true,
      isLastPage: true,
    },
  };
};

const createBodyCheckResult = async <P extends BodyPartType>(
  part: P,
  body: BodyPartMap[P]["form"]
): Promise<BodyPartMap[P]["response"]> => {
  const { data } = await axiosInstance.post(`/api/v2/health-book/body-part-diagnoses/${part}`, body);
  if (data.success) return data.data;
  throw new Error(data.message);
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
  const errorMessage = "건강 종합 진단 상세 조회에 실패했습니다.";
  try {
    const { data } = await instance.get(`/api/v2/health-book/body-part-diagnoses/${part}/${diagnosisId}`);

    if(data.success) {
      const {
        diagnosisId,
        simpleTotalScore,
        bodyPartTotalScore,
        bodyPartType,
        diagnosisDate,
        recommendedItemList,
        ...rest
      } = data.data;
      const scores = mapScores(rest as BodyCheckDetailMap[P]);

      return {
        diagnosisId,
        simpleTotalScore,
        bodyPartTotalScore,
        bodyPartType,
        diagnosisDate,
        recommendedItemList,
        scores,
      } as BodyCheckDetailMap[P];
    }
    throw new Error(errorMessage);
  } catch (error) {
    console.error(error);
    throw new Error(errorMessage);
  }
}

export {
  getLatestBodyCheck,
  getInfiniteBodyCheckList,
  createBodyCheckResult,
  getBodyCheckResultDetail,
};
