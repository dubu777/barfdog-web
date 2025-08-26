"use client";

import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";
import LabelValueItem from "@/components/common/labelValueItem/LabelValueItem";
import {
  ProbiomeDetailCardData,
  SectionType,
  DetailItem,
} from "@/types/healthNote/probiome";
import {
  getFieldLabel,
  formatFieldValue,
} from "@/utils/healthNote/probiome/probiomeDetailUtils";
import { useMemo } from "react";
import { commonWrapper } from "@/styles/common.css";
import Divider from "@/components/common/divider/Divider";

interface ProbiomeDetailCardProps {
  title: string;
  data: ProbiomeDetailCardData;
  sectionType: SectionType;
}

export default function ProbiomeDetailCard({
  title,
  data,
  sectionType,
}: ProbiomeDetailCardProps) {
  // 데이터를 DetailItem 배열로 변환하는 메모이제이션된 함수
  const detailItems: DetailItem[] = useMemo(() => {
    return Object.entries(data).map(([key, value]) => ({
      label: getFieldLabel(key, sectionType),
      value: formatFieldValue(value, key, sectionType),
    }));
  }, [data, sectionType]);

  return (
    <Card shadow="light" padding={16} gap={12} align="start">
      <DefaultText type="title4" color="gray800">
        {title}
      </DefaultText>
      <Divider thickness={2} color="gray900" />
      <div
        className={commonWrapper({ direction: "col", gap: 8, paddingTop: 4 })}
      >
        {detailItems.map((item, index) => (
          <LabelValueItem
            key={index}
            label={item.label}
            value={item.value}
            labelType="body3"
            labelColor="gray700"
            valueType="label2"
            valueColor="gray800"
            labelWidth={120}
          />
        ))}
      </div>
    </Card>
  );
}
