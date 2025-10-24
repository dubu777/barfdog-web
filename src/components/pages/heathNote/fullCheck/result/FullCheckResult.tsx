"use client";
import axios from "axios";
import * as styles from "./FullCheckResult.css";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import DeleteIcon from "/public/images/icons/trashbag.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Header from "@/components/layout/header/Header";
import TotalScore from "@/components/pages/heathNote/fullCheck/result/totalScore/TotalScore";
import ChangedScore from "@/components/pages/heathNote/fullCheck/result/changedScore/ChangedScore";
import WalkScore from "@/components/pages/heathNote/fullCheck/result/walkScore/WalkScore";
import SuspectedDiseases from "@/components/pages/heathNote/fullCheck/result/suspectedDiseases/SuspectedDiseases";
import BodyCheck from "@/components/pages/heathNote/fullCheck/result/bodyCheck/BodyCheck";
import RecommendedItemList from "@/components/pages/heathNote/common/recommendedItemList/RecommendedItemList";
import DietAnalysisSurvey from "@/components/pages/heathNote/common/dietAnalysisSurvey/DietAnalysisSurvey";
import ResultTitle from "@/components/pages/heathNote/common/resultTitle/ResultTitle";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import useModal from "@/hooks/useModal";
import { useToastStore } from "@/store/useToastStore";
import { DEFAULT_RECOMMENDED_ITEM_LIST, DISEASE_INFO, queryKeys } from "@/constants";
import { getNameWithSubjectSuffix } from "@/utils";
import { useGetFullCheckResultDetail } from "@/api/healthNote/fullCheck/queries/useGetFullCheckResultDetail";
import { useGetPetDetail } from "@/api/pet/queries/useGetPetDetail";
import { useDeleteFullCheckResult } from "@/api/healthNote/fullCheck/mutations/useDeleteFullCheckResult";
import { DiseaseData } from "@/types/healthNote/fullCheck";

interface FullCheckResultProps {
  diagnosisId: number;
  petId: number;
}

export default function FullCheckResult({
  diagnosisId,
  petId
}: FullCheckResultProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();
  const { isOpen, onClose, onToggle } = useModal();

  const { data } = useGetFullCheckResultDetail(diagnosisId);
  const { data: petInfo } = useGetPetDetail(petId);
  const { mutate } = useDeleteFullCheckResult();

  const topSuspectedDiseases = useMemo(() => data?.suspectedDiseaseTypeList?.map(v => DISEASE_INFO[v]), [data?.suspectedDiseaseTypeList]);

  const handleDelete = () => {
    mutate({
      diagnosisId,
    }, {
      onSuccess: async () => {
        addToast("삭제가 완료되었습니다");
        await queryClient.invalidateQueries({
          queryKey: [queryKeys.FULL_CHECK.BASE, queryKeys.FULL_CHECK.GET_FULL_CHECK_LIST],
        })
        router.push(`/health-note/${petId}/full-check`)
      },
      onError: (error) => {
        if(axios.isAxiosError(error)) {
          addToast(error.message ?? '요청이 실패되었습니다.', 'above-button');
        }
        console.log(error);
      }
    })
  }

  const isDefaultItemList = useMemo(() => {
    return data.recommendedItemList.every(item => item.diseaseCategory === 'ALL')
  }, [data.recommendedItemList]);

  const defaultItemList = useMemo(() => {
    return data.recommendedItemList.map((item, index) => ({
      ...item,
      ...DEFAULT_RECOMMENDED_ITEM_LIST[index]
    }))
  }, [data.recommendedItemList]);

  const itemList = isDefaultItemList ? defaultItemList : data.recommendedItemList;

  if (!data) return null;
  return (
    <>
      <Header
        showBackButton
        centerTitle="결과 상세"
        onBack={() => router.push(`/health-note/${petId}/full-check`)}
        rightElement={
          <button onClick={onToggle} className={styles.deleteButton}>
            <SvgIcon src={DeleteIcon} size={24} />
          </button>
        }
      />
      <section className={styles.fullCheckResultContainer}>
        <article className={styles.fullCheckResultTitle}>
          <ResultTitle title={`${data.diagnosisDate} 건강 종합 진단 결과`} />
          <TotalScore
            petName={petInfo.name}
            checkupScore={data.checkupScore}
            totalCheckupScorePercentile={data.snapshot.totalCheckupScorePercentile}
            cohortCheckupScorePercentile={data.snapshot.cohortCheckupScorePercentile}
          />
        </article>
        {data.snapshot.previousDiagnosisDate &&
          <ChangedScore
            checkupScore={data.checkupScore}
            scoreDifference={data.snapshot.scoreDifference}
            previousDiagnosisDate={data.snapshot.previousDiagnosisDate}
            diagnosisDate={data.diagnosisDate}
          />
        }
        <WalkScore
          petName={petInfo.name}
          totalWalkScorePercentile={data.snapshot.totalWalkScorePercentile}
          avgTotalWalkCount={data.snapshot.avgTotalWalkCount}
          avgTotalWalkHours={data.snapshot.avgTotalWalkHours}
          avgCohortWalkScore={data.snapshot.avgCohortWalkScore ?? 0}
          avgTotalWalkScore={data.snapshot.avgTotalWalkScore}
          walkHours={data.walkHours}
          walkCount={data.walkCount}
        />
        {topSuspectedDiseases.length > 0 &&
          <SuspectedDiseases
            petName={petInfo.name}
            diseaseList={topSuspectedDiseases as unknown as DiseaseData[]}
          />
        }
        <div className={styles.fullCheckResultProduct}>
          <RecommendedItemList
            type='fullCheck'
            petName={petInfo.name}
            title={
              !isDefaultItemList
                ? `${petInfo.name}의 상태에 따라\n맞춤 상품을 추천해 드려요`
                : `${getNameWithSubjectSuffix(petInfo.name)} 건강해요!\n지금처럼 지켜주세요`
            }
            subTitle={
              !isDefaultItemList
                ? `건강 관리가 필요한 부위를 기준으로\n도움이 되는 바프독 맞춤 상품을 제안해 드려요`
                : `좋은 상태를 유지할 수 있도록\n예방 관리 상품을 추천드려요`
            }
            recommendedItemList={itemList}
            isDefaultItemList={isDefaultItemList}
          />
          <BodyCheck petId={petId} />
          <DietAnalysisSurvey title={`우리 아이에게 딱 맞는\n1:1 맞춤 식단을 추천 받아 보세요!`} />
        </div>
      </section>
      {isOpen &&
        <AlertModal
          title='진단 결과를 삭제하시겠어요?'
          content='삭제한 진단 결과 정보는 복구되지 않아요'
          isOpen={isOpen}
          onClose={onClose}
          cancelText='돌아가기'
          confirmText='삭제하기'
          onCancel={onClose}
          onConfirm={handleDelete}
        />
      }
    </>
  );
};
