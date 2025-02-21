"use client";

import { useGetSurveyResult } from "@/api/survey/queries/useGetSurveyResult";
import Link from "next/link";

interface SurveyResultProps {
  reportId: number;
}
export default function SurveyResult({ reportId }: SurveyResultProps) {
  const { data: resultData } = useGetSurveyResult(reportId);
console.log('resultData', resultData);

  return (
    <div style={{ width: "200px", height: "200px", backgroundColor: "blue" }}>
      <Link
        style={{ color: "white" }}
        href={{
          pathname: "/order/subscription",
          query: { type: "select-recipe", reportId: reportId },
        }}
      >
        레시피 선택하기
      </Link>
    </div>
  );
}