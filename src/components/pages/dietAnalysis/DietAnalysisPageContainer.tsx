'use client'

import { useGetDogList } from "@/api/dog/queries/useGetDogList";
import FirstTimeRegistration from "./firstTimeRegistration/FirstTimeRegistration";
import RegisteredDogManager from "./registeredDogManager/RegisteredDogManager";
export default function DietAnalysisPageContainer() {
  const { data: dogListData = [] } = useGetDogList();
  return (
    <>{dogListData.length > 0 ? <RegisteredDogManager dogListData={dogListData}/> : <FirstTimeRegistration /> }</>
  );
}
