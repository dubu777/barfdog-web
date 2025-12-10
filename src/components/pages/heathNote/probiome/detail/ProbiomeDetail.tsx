"use client";

import { useGetProbiomeDetail } from "@/api/healthNote/probiome/queries/useGetProbiomeDetail";
import { SectionType } from "@/types/healthNote/probiome";
import ProbiomeDetailCard from "./ProbiomeDetailCard";
import { buildProbiomeSectionData } from "@/utils/healthNote/probiome/buildProbiomeSectionData";
import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/ui/text/Text";
import Spinner from "@/components/ui/spinner/Spinner";
import Card from "@/components/ui/card/Card";
import LabelValueItem from "@/components/ui/labelValueItem/LabelValueItem";
import { formatPhoneNumber } from "@/utils";
import Image from "next/image";
import * as styles from "./ProbiomeDetailCard.css";
import Divider from "@/components/ui/divider/Divider";

interface ProbiomeDetailProps {
  diagnosisId: number;
}

export default function ProbiomeDetail({ diagnosisId }: ProbiomeDetailProps) {
  const { data, isLoading } = useGetProbiomeDetail(diagnosisId);

  if (isLoading || !data) {
    return <Spinner fullscreen />;
  }

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
        <Text type="title3">{data.diagnosisInfo.petName} 문진 상세</Text>
        <Text type="body2" color="gray700">
          {data.diagnosisInfo.surveySubmittedDate}
        </Text>
      </div>

      <div className={commonWrapper({ direction: "col", gap: 12 })}>
        <>
          {data.selectedDeliveryAddress && (
            <Card shadow="light" padding={16} gap={12} align="start">
              <Text type="title4" color="gray800">
                회수 신청 정보
              </Text>
              <Divider height={2} color="gray900" />
              <LabelValueItem
                label="수령인"
                value={data.selectedDeliveryAddress?.recipientName || "-"}
                labelWidth={120}
              />
              <LabelValueItem
                label="연락처"
                value={
                  formatPhoneNumber(
                    data.selectedDeliveryAddress?.phoneNumber
                  ) || "-"
                }
                labelWidth={120}
              />
              <LabelValueItem
                label="주소"
                value={
                  `${data.selectedDeliveryAddress?.city} ${data.selectedDeliveryAddress?.street} ${data.selectedDeliveryAddress?.detailAddress}` ||
                  "-"
                }
                labelWidth={120}
              />
              {data.defecationFileList.length > 0 && (
                <LabelValueItem
                  label="변 사진"
                  value={
                    <Image
                      className={styles.imagePreview}
                      src={data.defecationFileList[0]?.displayImageUrl.url}
                      alt="반려견 대변 사진"
                      width={100}
                      height={100}
                    />
                  }
                  labelWidth={120}
                  align="start"
                />
              )}
            </Card>
          )}
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
        </>
      </div>
    </div>
  );
}
