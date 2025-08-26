"use client";
import * as styles from "./FullCheckList.css";
import { infiniteTrigger } from "@/styles/common.css";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DogImage from "/public/images/healthNote/full-check/list-dog.png";
import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Chips from "@/components/common/chips/Chips";
import HorizontalProgressBar from "@/components/pages/heathNote/common/progressBar/horizontalProgressBar/HorizontalProgressBar";
import TextButton from "@/components/common/textButton/TextButton";
import Button from "@/components/common/button/Button";
import EmptyList from "@/components/pages/heathNote/common/emptyList/EmptyList";
import { getNameWithPossessiveSuffix } from "@/utils";
import { useInView } from "react-intersection-observer";
import { useGetInfiniteFullCheckList } from "@/api/healthNote/fullCheck/queries/useGetInfiniteFullCheckList";
import { useGetPetDetail } from "@/api/pet/queries/useGetPetDetail";

interface FullCheckListProps {
  petId: number;
}

export default function FullCheckList ({ petId }: FullCheckListProps) {
  const { data: petInfo } = useGetPetDetail(petId);
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetInfiniteFullCheckList(petId);

  const checkupDiagnosisList = infiniteData?.pages?.flatMap((page) => page.checkupDiagnosisList) ?? [];
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !hasNextPage) return;

    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }

  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);

  const handleGoToSurvey = () => {
    window.location.href = `/health-note/${petId}/full-check/survey`;
  };

  return (
    <section>
      {checkupDiagnosisList.length > 0
        ? (
          <>
            <div className={styles.fullCheckSurvey}>
              <Card
                shadow="light"
                align='start'
                direction='row'
                justify='between'
              >
                <div className={styles.fullCheckSurveyCardContent}>
                  <DefaultText type="headline2">
                    우리 아이 건강,
                    <br />
                    한번 더 살펴볼까요?
                  </DefaultText>
                  <DefaultText type="caption2" color="gray600">
                    건강 종합 진단으로 건강 변화를 쉽게 기록할 수 있어요
                  </DefaultText>
                  <TextButton text='진단하러 가기' onClick={handleGoToSurvey} />
                </div>
                <Image src={DogImage} alt="Dog Image" width={120} height={146} />
              </Card>
            </div>
            <article className={styles.fullCheckResultList}>
              {checkupDiagnosisList.map((result, index) => (
                <Link
                  key={index}
                  href={`/health-note/${petId}/full-check/result/${result.diagnosisId}`}
                >
                  <Card
                    shadow="light"
                    padding={16}
                    direction='col'
                    width='full'
                    align='start'
                  >
                    <DefaultText type="label4" color="gray600">
                      {result.diagnosisDate}
                    </DefaultText>
                    <div className={styles.resultTopRank}>
                      <DefaultText type="headline2">
                        {getNameWithPossessiveSuffix(petInfo?.name)}의 검사결과
                      </DefaultText>
                      <Chips variant="solid" borderRadius="lg" color="gray200">
                        상위{result.snapshot.totalCheckupScorePercentile}%
                      </Chips>
                    </div>
                    <HorizontalProgressBar score={result.checkupScore} showLabel showIcon />
                  </Card>
                </Link>
              ))}
            </article>
            <div ref={ref} className={infiniteTrigger} />
          </>
        ) : (
          <div className={styles.fullCheckEmptyList}>
            <EmptyList />
            <Button variant='solid' buttonColor='gray900' className={styles.createSurveyButton}>
              진단하러 가기
            </Button>
          </div>
        )
      }
    </section>
  );
};