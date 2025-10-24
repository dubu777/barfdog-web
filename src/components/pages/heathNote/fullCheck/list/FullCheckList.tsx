"use client";
import * as styles from "./FullCheckList.css";
import Image from "next/image";
import Link from "next/link";
import DogImage from "/public/images/healthNote/full-check/list-dog.png";
import Card from "@/components/common/card/Card";
import Text from "@/components/common/text/Text";
import Chips from "@/components/common/chips/Chips";
import HorizontalProgressBar from "@/components/pages/heathNote/common/progressBar/horizontalProgressBar/HorizontalProgressBar";
import TextButton from "@/components/common/textButton/TextButton";
import Button from "@/components/common/button/Button";
import EmptyList from "@/components/common/emptyList/EmptyList";
import InfiniteScrollTrigger from "@/components/common/infiniteScrollTrigger/InfiniteScrollTrigger";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useFlattenedInfiniteData } from "@/hooks/useFlattenedInfiniteData";
import { getNameWithPossessiveSuffix } from "@/utils";
import { useGetInfiniteFullCheckList } from "@/api/healthNote/fullCheck/queries/useGetInfiniteFullCheckList";
import { useGetPetDetail } from "@/api/pet/queries/useGetPetDetail";

interface FullCheckListProps {
  petId: number;
}

export default function FullCheckList({ petId }: FullCheckListProps) {
  const { data: petInfo } = useGetPetDetail(petId);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteFullCheckList(petId);

  const checkupDiagnosisList = useFlattenedInfiniteData(data, 'checkupDiagnosisList');

  const ref = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  const handleGoToSurvey = () => {
    window.location.href = `/health-note/${petId}/full-check/survey`;
  };

  return (
    <section>
      {checkupDiagnosisList.length > 0 ? (
        <>
          <div className={styles.fullCheckSurvey}>
            <Card
              shadow="light"
              align="start"
              direction="row"
              justify="between"
            >
              <div className={styles.fullCheckSurveyCardContent}>
                <Text type="headline2">
                  우리 아이 건강,
                  <br />
                  한번 더 살펴볼까요?
                </Text>
                <Text type="caption2" color="gray600">
                  건강 종합 진단으로 건강 변화를 쉽게 기록할 수 있어요
                </Text>
                <TextButton text="진단하러 가기" onClick={handleGoToSurvey} />
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
                  direction="col"
                  width="full"
                  align="start"
                >
                  <Text type="label4" color="gray600">
                    {result.diagnosisDate}
                  </Text>
                  <div className={styles.resultTopRank}>
                    <Text type="headline2">
                      {getNameWithPossessiveSuffix(petInfo?.name)}의 검사결과
                    </Text>
                    <Chips variant="solid" borderRadius="lg" color="gray200">
                      상위{result.snapshot.totalCheckupScorePercentile}%
                    </Chips>
                  </div>
                  <HorizontalProgressBar
                    score={result.checkupScore}
                    showLabel
                    showIcon
                  />
                </Card>
              </Link>
            ))}
          </article>
          <InfiniteScrollTrigger
            ref={ref}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </>
      ) : (
        <div className={styles.fullCheckEmptyList}>
          <EmptyList
            title={`등록된 검사 결과가 없어요\n진단 후 결과를 기록해보세요`}
          />
          <Button
            variant="solid"
            intent="secondary"
            className={styles.createSurveyButton}
          >
            진단하러 가기
          </Button>
        </div>
      )}
    </section>
  );
}
