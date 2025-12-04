import axios from "axios";
import { ObesityDetailResponse } from "@/types/healthNote/aiObesityCheck";
import { getStoreItemDetail } from "@/api/store/store";

const getObesityDetail = async (
  surveyId: number
): Promise<ObesityDetailResponse> => {
  const res = await axios.get(`/api/obesity`, {
    params: { surveyId },
  });
  return res.data;
};

const uploadObesityImage = async (file: File, weight: number) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("weight", weight.toString());

  const { data } = await axios.post("/api/obesity/upload", formData);
  return data;
};

const getRecommendItems = async (itemIds: number[]) => {
  try {
    const promises = itemIds.map(async (itemId) => {
      const { itemInfo, itemImageList } = await getStoreItemDetail(itemId);
      return {
        ...itemInfo,
        imageUrl: itemImageList[0].displayImageUrl.url,
      };
    });
    const settledResults = await Promise.allSettled(promises);
    const results = settledResults
      .filter((result) => result.status === "fulfilled")
      .map(
        (result) =>
          (result as PromiseFulfilledResult<typeof result.value>).value
      );

    return results;
  } catch (error) {
    console.error("상품 조회 실패", error);
    return [];
  }
};

export { getObesityDetail, uploadObesityImage, getRecommendItems };
