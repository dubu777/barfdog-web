"use client";

import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";
import {
  ProbiomeDetailCardData,
  SectionType,
  DetailItem,
} from "@/types/healthNote/probiome";
import {
  getFieldLabel,
  formatFieldValue,
} from "@/utils/healthNote/probiomeDetailUtils";
import { useMemo } from "react";
import * as styles from "./ProbiomeDetailCard.css";
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

  // 테이블 행 렌더링 함수
  const renderTableRow = (item: DetailItem) => (
    <div
      key={item.label}
      className={commonWrapper({ justify: "start", gap: 4 })}
    >
      <DefaultText type="body3" color="gray700" className={styles.labelText}>
        {item.label}
      </DefaultText>

      <DefaultText type="label2" color="gray800">
        {item.value}
      </DefaultText>
    </div>
  );

  return (
    <Card shadow="light" padding={16} gap={12} align="start">
      <DefaultText type="title4" color="gray800">
        {title}
      </DefaultText>
      <Divider thickness={2} color="gray900" />
      <div
        className={commonWrapper({ direction: "col", gap: 8, paddingTop: 4 })}
      >
        {detailItems.map((item) => renderTableRow(item))}
      </div>
    </Card>
  );
}
