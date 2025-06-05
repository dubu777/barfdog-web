"use client";

import * as styles from "./BodyCheckResult.css";
import Header from "@/components/layout/header/Header";
import { useRouter } from "next/navigation";
import DeleteIcon from "/public/images/icons/trashbag.svg";
import CalendarIcon from "/public/images/icons/calendar.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { commonWrapper } from "@/styles/common.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import {
  deleteButton,
  fullCheckResultTitle,
} from "../../../fullCheck/result/FullCheckResult.css";
import BodyCheckTotalScore from "../bodyCheckTotalScore/BodyCheckTotalScore";
import { BodyCheckPart, DiseaseName } from "@/types/healthNote";
import { bodyCheckSurveyConfig } from "@/config/bodyCheckSurveyConfig";
import DiseasePhaseCard from "../\bdiseasePhaseCard/DiseasePhaseCard";

const data = {
  name: "바푸동",
  part: "skin" as BodyCheckPart,
  createdDate: "2025-05-02",
  dogSize: "MIDDLE",
  totalScore: 70,
  score: [
    { name: "hemorrhagicEnterocolitis", score: 50 },
    { name: "gastricUlcer", score: 48 },
    { name: "enteritis", score: 10 },
    { name: "ibs", score: 20 },
    { name: "lifestyle", score: 15 },
  ],
  rank: {
    overall: 2.4,
    dogSize: 5,
  },
  warningDiseases: "hemorrhagicEnterocolitis" as DiseaseName,
};

export default function BodyCheckResult() {
  const router = useRouter();
  const name = bodyCheckSurveyConfig[data.part].name;
  const handleDelete = () => {
    // 삭제 로직
  };
  return (
    <>
      <Header
        showBackButton
        centerTitle="결과 상세"
        onBack={() => router.back()}
        rightElement={
          <button onClick={handleDelete} className={deleteButton}>
            <SvgIcon src={DeleteIcon} size={24} />
          </button>
        }
      />
      <section
        className={commonWrapper({ direction: "col", gap: 20, padding: 20 })}
      >
        <div>
          <DefaultText type="body3" className={fullCheckResultTitle}>
            <SvgIcon src={CalendarIcon} size={20} />
            {data.createdDate} {name} 정밀 진단 결과
          </DefaultText>
          <BodyCheckTotalScore
            dogName={data.name}
            score={data.score}
            part={data.part}
            totalScore={data.totalScore}
          />
        </div>
        <DiseasePhaseCard diseaseName={data.warningDiseases} />
      </section>
    </>
  );
}
