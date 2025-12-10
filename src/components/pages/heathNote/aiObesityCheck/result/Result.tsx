"use client";
import { commonWrapper } from "@/styles/common.css";
import Divider from "@/components/ui/divider/Divider";
import DefaultInfo from "@/components/pages/heathNote/aiObesityCheck/result/defaultInfo/DefaultInfo";
import BcsInfo from "./bcsInfo/BcsInfo";
import Tips from "./tips/Tips";
import RecommendItems from "./recommendItems/RecommendItems";
import SurveyInfo from "./surveyInfo/SurveyInfo";
import { useGetObesityDetail } from "@/api/healthNote/aiObesityCheck/query/useGetObesityDetail";
import { useGetPetDetail } from "@/api/pet/queries/useGetPetDetail";

interface SurveyResultProps {
  petId: number;
  surveyId: number;
}

export default function Result({ petId, surveyId }: SurveyResultProps) {
  const { data } = useGetObesityDetail(surveyId);
  const { data: petInfo } = useGetPetDetail(petId);

  if (!data) return null;
  return (
    <div
      className={commonWrapper({
        direction: "col",
        align: "start",
      })}
    >
      <DefaultInfo data={data} />
      <Divider height={8} color="gray100" />
      <BcsInfo bcs={data.bcs} petName={petInfo?.name} />
      <Divider height={8} color="gray100" />
      <Tips bcs={data.bcs} />
      <Divider height={8} color="gray100" />
      <RecommendItems />
      <Divider height={8} color="gray100" />
      <SurveyInfo />
    </div>
  );
}
