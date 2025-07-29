"use client";

import { useGetGutCheckDetail } from "@/api/healthNote/gutCheck/queries/useGetGutCheckResult";
import { SectionType } from "@/types/healthNote/gutCheck";
import GutCheckDetailCard from "./GutCheckDetailCard";
import { buildGutCheckSectionData } from "@/utils/healthNote/buildGutCheckSectionData";
import { commonWrapper } from "@/styles/common.css";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface GutCheckDetailProps {
  diagnosisId: number;
}

export default function GutCheckDetail({ diagnosisId }: GutCheckDetailProps) {
  const { data } = useGetGutCheckDetail(diagnosisId);

  const sectionData = buildGutCheckSectionData(data.survey);
  const sections: SectionType[] = [
    "healthStatus",
    "lifestyle",
    "additionalInfo",
  ];

  const sectionTitles = {
    healthStatus: "건강 상태",
    lifestyle: "생활 습관",
    additionalInfo: "기타 항목",
  };

  return (
    <div
      className={commonWrapper({
        direction: "col",
        padding: 20,
        gap: 20,
      })}
    >
      <div className={commonWrapper({ justify: "between", paddingTop: 20 })}>
        <DefaultText type="title3">{data.petName} 문진 상세</DefaultText>
        <DefaultText type="body2" color="gray700">
          {data.submitDate}
        </DefaultText>
      </div>
      <div className={commonWrapper({ direction: "col", gap: 12 })}>
        {sections.map((sectionType) => {
          const data = sectionData[sectionType];

          return (
            <GutCheckDetailCard
              key={sectionType}
              sectionType={sectionType}
              title={sectionTitles[sectionType]}
              data={data}
            />
          );
        })}
      </div>
    </div>
  );
}
