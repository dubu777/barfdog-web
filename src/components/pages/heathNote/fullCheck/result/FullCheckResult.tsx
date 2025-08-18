"use client";
import axios from "axios";
import * as styles from "./FullCheckResult.css";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import DeleteIcon from "/public/images/icons/trashbag.svg";
import CalendarIcon from "/public/images/icons/calendar.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Header from "@/components/layout/header/Header";
import TotalScore from "@/components/pages/heathNote/fullCheck/result/totalScore/TotalScore";
import ChangedScore from "@/components/pages/heathNote/fullCheck/result/changedScore/ChangedScore";
import WalkScore from "@/components/pages/heathNote/fullCheck/result/walkScore/WalkScore";
import SuspectedDiseases from "@/components/pages/heathNote/fullCheck/result/suspectedDiseases/SuspectedDiseases";
import BodyCheck from "@/components/pages/heathNote/fullCheck/result/bodyCheck/BodyCheck";
import DietAnalysisSurvey from "@/components/pages/heathNote/fullCheck/result/dietAnalysisSurvey/DietAnalysisSurvey";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import useModal from "@/hooks/useModal";
import { useToastStore } from "@/store/useToastStore";
import { DISEASE_INFO, queryKeys } from "@/constants";
import { DiseaseData } from "@/types/healthNote";
import { useGetFullCheckResultDetail } from "@/api/healthNote/fullCheck/queries/useGetFullCheckResultDetail";
import { useGetPetDetail } from "@/api/pet/queries/useGetPetDetail";
import { useDeleteFullCheckResult } from "@/api/healthNote/fullCheck/mutations/useDeleteFullCheckResult";

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

  const topSuspectedDiseases = data?.suspectedDiseaseTypeList?.map(v => DISEASE_INFO[v]);
  console.log('topSuspectedDiseases', topSuspectedDiseases);
  

  const handleDelete = () => {
    mutate({
      diagnosisId,
    }, {
      onSuccess: async (data) => {
        console.log(data)
        addToast("삭제가 완료되었습니다");
        await queryClient.invalidateQueries({
          queryKey: [queryKeys.FULL_CHECK.BASE, queryKeys.FULL_CHECK.GET_FULL_CHECK_LIST],
        })
        router.push(`/health-note/full-check?petId=${petId}`)
      },
      onError: (error) => {
        if(axios.isAxiosError(error)) {
          addToast(error.message ?? '요청이 실패되었습니다.', 'above-button');
        }
        console.log(error);
      }
    })
  }

  if (!data) return null;
  return (
    <>
      <Header
        showBackButton
        centerTitle="결과 상세"
        onBack={() => router.push(`/health-note/full-check?petId=${petId}`)}
        rightElement={
          <button onClick={onToggle} className={styles.deleteButton}>
            <SvgIcon src={DeleteIcon} size={24} />
          </button>
        }
      />
      <section className={styles.fullCheckResultContainer}>
        <article>
          <DefaultText type="body3" className={styles.fullCheckResultTitle}>
            <SvgIcon src={CalendarIcon} size={20} />
            {data.diagnosisDate} 건강 종합 진단 결과
          </DefaultText>
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
          {/*<ProductList*/}
          {/*  dogName={data.name}*/}
          {/*  recommendProducts={recommendProducts}*/}
          {/*/>*/}
          <BodyCheck />
          <DietAnalysisSurvey />
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
