import { commonWrapper } from "@/styles/common.css";
import { averageGraph, walkNotice } from "./WalkScore.css";
import { Fragment } from "react";
import Image from "next/image";
import WalkDogImage from "/public/images/healthNote/full-check/walk-dog.png";
import HistoryIcon from "/public/images/healthNote/full-check/history.svg";
import FootprintIcon from "/public/images/healthNote/full-check/footprint.svg";
import Text from "@/components/ui/text/Text";
import Card from "@/components/ui/card/Card";
import Divider from "@/components/ui/divider/Divider";
import InfoBox from "@/components/pages/heathNote/common/infoBox/InfoBox";
import ResultCard from "@/components/pages/heathNote/common/resultCard/ResultCard";
import AverageBar from "@/components/pages/heathNote/fullCheck/result/walkScore/averageBar/AverageBar";

interface WalkScoreProps {
  petName: string;
  totalWalkScorePercentile: number;
  avgTotalWalkCount: number;
  avgTotalWalkHours: number;
  avgCohortWalkScore: number;
  avgTotalWalkScore: number;
  walkHours: number;
  walkCount: number;
}

export default function WalkScore({
  petName,
  totalWalkScorePercentile,
  avgTotalWalkCount,
  avgTotalWalkHours,
  avgCohortWalkScore,
  avgTotalWalkScore,
  walkHours,
  walkCount,
}: WalkScoreProps) {
  const walkInfo = [
    {
      label: "산책 횟수",
      icon: FootprintIcon,
      value: avgTotalWalkCount,
    },
    {
      label: "1회당 산책 시간",
      icon: HistoryIcon,
      value: avgTotalWalkHours,
    },
  ];

  const averageGraphList = [
    {
      label: "전체평균",
      value: avgTotalWalkScore,
      color: "pastelRed",
    },
    {
      label: "또래",
      value: avgCohortWalkScore,
      color: "gray300",
    },
    {
      label: petName,
      value: walkHours * walkCount,
      color: "blue400",
      showChips: true,
    },
  ];

  const maxValue = Math.max(...averageGraphList.map((d) => d.value));
  return (
    <article>
      <ResultCard
        className={commonWrapper({ direction: "col", gap: 12 })}
        title={`${petName}의 산책 습관\n 다른 아이들과 비교해볼까요?`}
        subTitle="일주일 기준으로 점수가 매겨져요"
      >
        <div className={commonWrapper({ direction: "col", gap: 8 })}>
          <Image src={WalkDogImage} alt="walk dog" width={303} height={140} />
          <Card shadow="none">
            <div
              className={commonWrapper({
                align: "start",
                justify: "between",
                paddingX: 12,
                paddingTop: 12,
              })}
            >
              <Text type="headline2" noShrink>
                {petName}의<br />
                산책 활동 통계
              </Text>
              <div
                className={commonWrapper({ paddingTop: 16, justify: "end" })}
              >
                <Text type="display1" applyLineHeight>
                  <Text type="label4">상위</Text>
                  &nbsp;{totalWalkScorePercentile}
                  <Text type="label4">%</Text>
                </Text>
              </div>
            </div>
            <Divider height={1} color="gray100" />
            <div className={averageGraph}>
              {averageGraphList.map((duration) => (
                <AverageBar
                  key={duration.label}
                  label={duration.label}
                  value={duration.value}
                  color={duration.color as "pastelRed" | "blue400" | "gray300"}
                  showChips={!!duration.showChips}
                  maxValue={maxValue}
                />
              ))}
            </div>
          </Card>
          <Text
            type="headline2"
            className={commonWrapper({
              justify: "start",
              paddingX: 12,
              paddingTop: 12,
            })}
          >
            전체 반려견의 평균 산책 습관
          </Text>
          <Card
            direction="row"
            className={commonWrapper({ justify: "start", align: "start" })}
          >
            {walkInfo.map((info, index) => (
              <Fragment key={info.label}>
                <InfoBox
                  label={info.label}
                  icon={info.icon}
                  align="start"
                  content={
                    <>
                      <Text type="title3">{info.value}</Text>
                      <Text type="label3">{index === 0 ? "회" : "시간"}</Text>
                    </>
                  }
                />
                {index === 0 && (
                  <Divider height={1} direction="vertical" color="gray100" />
                )}
              </Fragment>
            ))}
          </Card>
        </div>
        <Card shadow="none" padding={12} gap={8} className={walkNotice}>
          <Text type="headline2" color="blue600">
            반려견에게 산책은 왜 중요할까요?
          </Text>
          <Text type="body3" color="gray700">
            산책은 반려견의 체중을 조절하고 비만을 예방하는 데 중요한 역할을
            해요. 근육과 관절을 튼튼하게 유지해주고, 에너지를 건강하게
            소모하면서 스트레스 해소와 정서 안정에도 도움을 줄 수 있어요.
          </Text>
        </Card>
      </ResultCard>
    </article>
  );
}
