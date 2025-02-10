"use client";

import { useGetSurveyResult } from "@/api/survey/queries/useGetSurveyResult";
import Link from "next/link";

interface SurveyResultProps {
  id: number;
}
export default function SurveyResult({ id }: SurveyResultProps) {
  const { data: resultData } = useGetSurveyResult(id);
console.log('resultData', resultData);

  return (
    <div style={{ width: "200px", height: "200px", backgroundColor: "blue" }}>
      <Link
        style={{ color: "white" }}
        href={{
          pathname: `/survey/select-recipe?id=${id}`,
        }}
      >
        구독 샵 이동
      </Link>
    </div>
  );
}
