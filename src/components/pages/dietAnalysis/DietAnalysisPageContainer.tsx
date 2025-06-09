"use client";

import { useGetDogList } from "@/api/dog/queries/useGetDogList";
import FirstTimeRegistration from "./firstTimeRegistration/FirstTimeRegistration";
import RegisteredDogManager from "./registeredDogManager/RegisteredDogManager";
export default function DietAnalysisPageContainer() {
  // const { data: dogListData = [] } = useGetDogList();
  // const isExistDogList = dogListData.length > 0;
  const isExistDogList = false;

  return (
    <>
      {isExistDogList ? (
        <p>반려견이 등록되어 있습니다.</p>
      ) : (
        // <RegisteredDogManager dogListData={dogListData} />
        <FirstTimeRegistration />
      )}
    </>
  );
}
