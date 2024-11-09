"use client";
import { useGetSurveyResult } from "@/api/queries/useGetSurveyResult";
import { INEDIBLE_FOOD_TO_ID } from "@/constants";
import Link from "next/link";

interface SurveyResultProps {
  id: number;
}
export default function SurveyResult({ id }: SurveyResultProps) {
  const { data: resultData } = useGetSurveyResult(id);
  console.log("resultData", resultData.inedibleFood);
  const inedibleFoodIds = resultData.inedibleFood
    .split(",")
    .map((item: string) => INEDIBLE_FOOD_TO_ID[item.trim()])
    .filter((id: number) => id !== undefined)
    .join(",");
    const queryData = { inedibleFood: inedibleFoodIds, id };
    console.log('inedibleFoodIds', inedibleFoodIds);
    
  return (
    <div style={{ width: "200px", height: "200px", backgroundColor: "blue" }}>
      <Link
        style={{ color: "white" }}
        href={{
          pathname: `/survey/subscribeShop`,
          query: queryData,
        }}
      >
        구독 샵 이동
      </Link>
    </div>
  );
}
