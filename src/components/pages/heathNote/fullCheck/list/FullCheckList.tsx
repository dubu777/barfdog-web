"use client";
import Image from "next/image";
import Link from "next/link";
import * as styles from "./FullCheckList.css";
import DogImage from "/public/images/healthNote/full-check/list-dog.png";
import ArrowRightIcon from "/public/images/icons/chevron-right-sm.svg";
import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Chips from "@/components/common/chips/Chips";
import HorizontalProgressBar from "@/components/pages/heathNote/common/progressBar/horizontalProgressBar/HorizontalProgressBar";
import { usePersistHealthNoteStore } from "@/store/useHealthNoteStore";

const FullCheckList = () => {
  const { dogInfo } = usePersistHealthNoteStore();
  const healthCheckResults = [
    {
      id: 101,
      createdDate: "2025.03.17",
      score: 94,
      rank: 15.8,
    },
    {
      id: 102,
      createdDate: "2024.10.29",
      score: 77,
      rank: 20.8,
    },
    {
      id: 103,
      createdDate: "2024.09.21",
      score: 50,
      rank: 50.0,
    },
    {
      id: 104,
      createdDate: "2023.03.17",
      score: 20,
      rank: 79.8,
    },
  ];

  const handleGoToSurvey = () => {
    window.location.href = "/health-note/full-check/survey";
  };

  return (
    <section>
      <div className={styles.fullCheckSurvey}>
        <Card shadow="light" className={styles.fullCheckSurveyCard}>
          <div className={styles.fullCheckSurveyCardContent}>
            <DefaultText type="headline2">
              우리 아이 건강,
              <br />
              한번 더 살펴볼까요?
            </DefaultText>
            <DefaultText type="caption2" color="gray600">
              건강 종합 진단으로 건강 변화를 쉽게 기록할 수 있어요
            </DefaultText>
            <button
              onClick={handleGoToSurvey}
              className={styles.fullCheckSurveyButton}
            >
              <DefaultText type="headline4" color="red">
                진단하러 가기
              </DefaultText>
              <SvgIcon src={ArrowRightIcon} color="red" size={20} />
            </button>
          </div>
          <Image src={DogImage} alt="Dog Image" width={120} height={146} />
        </Card>
      </div>
      <article className={styles.fullCheckResultList}>
        {healthCheckResults.map((result, index) => (
          <Link
            href={`/health-note/full-check/result/${result.id}?score=${result.score}`}
            key={index}
          >
            <Card shadow="light" padding={16}>
              <DefaultText type="label4" color="gray600">
                {result.createdDate}
              </DefaultText>
              <div className={styles.resultTopRank}>
                <DefaultText type="headline2">
                  {dogInfo?.name}의 검사결과
                </DefaultText>
                <Chips variant="solid" borderRadius="lg" color="gray200">
                  상위{result.rank}%
                </Chips>
              </div>
              <HorizontalProgressBar score={result.score} showLabel showIcon />
            </Card>
          </Link>
        ))}
      </article>
    </section>
  );
};

export default FullCheckList;
