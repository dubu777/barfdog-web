"use client";
import { commonWrapper } from "@/styles/common.css";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header/Header";
import BodyCheckTotalScore from "./bodyCheckTotalScore/BodyCheckTotalScore";
import DiseasePhase from "./diseasePhase/DiseasePhase";
import BodyCheckHealthTips from "./bodyCheckHealthTips/BodyCheckHealthTips";
import FreshGut from "./freshGut/FreshGut";
import ResultTitle from "@/components/pages/heathNote/common/resultTitle/ResultTitle";
import RecommendedItemList, { RecommendedItem } from "@/components/pages/heathNote/common/recommendedItemList/RecommendedItemList";
import DietAnalysisSurvey from "@/components/pages/heathNote/common/dietAnalysisSurvey/DietAnalysisSurvey";
import { BodyPartType } from "@/types/healthNote/bodyCheck";
import { BODY_PART, BODY_PART_RECOMMENDED_ITEMS } from "@/constants/healthNote/bodyCheck/common";
import { CAUTION_LABEL, DANGER_LABEL, getBodyCheckScoreStatus } from "@/utils/healthNote/bodyCheck/bodyCheckScore";
import { useGetPetDetail } from "@/api/pet/queries/useGetPetDetail";
import { useGetBodyCheckResultDetail } from "@/api/healthNote/bodyCheck/queries/useGetBodyCheckResultDetail";

interface BodyCheckResultProps {
  petId: number;
  diagnosisId: number;
  part: BodyPartType;
}

export default function BodyCheckResult({
  petId,
  diagnosisId,
  part
}: BodyCheckResultProps) {
  const router = useRouter();

  const { data: petInfo } = useGetPetDetail(petId);
  const { data } = useGetBodyCheckResultDetail(part, diagnosisId);

  const minScoreItem = data.scores
    .filter(score => {
      if (score.name.includes('LifestyleScore')) return false;
      const { label } = getBodyCheckScoreStatus(score.name, score.score);
      return [DANGER_LABEL, CAUTION_LABEL].includes(label);
    })[0];

  const recommendedItemList = useMemo(() => {
    return data.recommendedItemList.map((item, index) => ({
      ...item,
      ...BODY_PART_RECOMMENDED_ITEMS[part].list[index]
    }))
  }, [part, data.recommendedItemList]);

  if (!data) return null;
  return (
    <>
      <Header
        showBackButton
        centerTitle="결과 상세"
        onBack={() => router.push(`/health-note/${petId}/body-check?part=${part}`)}
      />
      <section className={commonWrapper({ 
        direction: "col", 
        gap: 20, 
        padding: 20, 
        backgroundColors: 'gray0' 
      })}>
        <div className={commonWrapper({ direction: 'col' })}>
          <ResultTitle title={`${data.diagnosisDate} ${BODY_PART[part].name} 정밀 진단 결과`} />
          <BodyCheckTotalScore
            petName={petInfo.name}
            scores={data.scores}
            part={part}
            totalScore={data.simpleTotalScore}
          />
        </div>
        {minScoreItem && (
          part === "obesity" 
            ? minScoreItem.name === "weightBalanceScore" 
            : true
          ) &&
          <DiseasePhase diseaseName={minScoreItem.name} />
        }
        <RecommendedItemList
          type='bodyCheck'
          petName={petInfo.name}
          title={BODY_PART_RECOMMENDED_ITEMS[part].title}
          subTitle={BODY_PART_RECOMMENDED_ITEMS[part].subTitle}
          recommendedItemList={recommendedItemList as RecommendedItem[]}
        />
        <BodyCheckHealthTips part={part} />
        <FreshGut petId={petId} />
        <DietAnalysisSurvey title={`예민한 우리아이 소화건강\n맞춤형 식단으로 관리해 보세요`} />
      </section>
    </>
  );
}
