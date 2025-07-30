"use client";

import { useGetDogList } from "@/api/dog/queries/useGetDogList";
import FirstTimeRegistration from "./firstTimeRegistration/FirstTimeRegistration";
import RegisteredDogManager from "./registeredDogManager/RegisteredDogManager";
import { useGetDietAnalysisResult } from "@/api/dietAnalysis/queries/useGetDietAnalysisResult";
export default function DietAnalysisPageContainer() {
  const { data: dogListData = [] } = useGetDogList();
  const { data: dietAnalysisResult } = useGetDietAnalysisResult(4);
  console.log("dietAnalysisResult", dietAnalysisResult);
  console.log("dogListData", dogListData);

  const isExistDogList = dogListData.length > 0;

  return (
    <>
      {isExistDogList ? (
        <RegisteredDogManager dogListData={dogListData} />
      ) : (
        <FirstTimeRegistration />
      )}
    </>
  );
}
