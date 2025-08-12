"use client";

import { useGetProbiomeDetail } from "@/api/healthNote/probiome/queries/useGetProbiomeResult";
import { SectionType } from "@/types/healthNote/probiome";
import ProbiomeDetailCard from "./ProbiomeDetailCard";
import { buildProbiomeSectionData } from "@/utils/healthNote/buildProbiomeSectionData";
import { commonWrapper } from "@/styles/common.css";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface ProbiomeDetailProps {
  diagnosisId: number;
}

export default function ProbiomeDetail({ diagnosisId }: ProbiomeDetailProps) {
  const { data } = useGetProbiomeDetail(diagnosisId);

  const sectionData = buildProbiomeSectionData(data.survey);
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
            <ProbiomeDetailCard
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
