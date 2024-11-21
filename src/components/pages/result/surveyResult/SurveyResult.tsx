"use client";
import { useGetSurveyResult } from "@/api/queries/useGetSurveyResult";
import { INEDIBLE_FOOD_TO_ID } from "@/constants";
import Link from "next/link";

interface SurveyResultProps {
  id: number;
}
export default function SurveyResult({ id }: SurveyResultProps) {
  const { data: resultData } = useGetSurveyResult(id);

  return (
    <div style={{ width: "200px", height: "200px", backgroundColor: "blue" }}>
      <Link
        style={{ color: "white" }}
        href={{
          pathname: `/survey/subscribeShop`,
        }}
      >
        구독 샵 이동
      </Link>
    </div>
  );
}
