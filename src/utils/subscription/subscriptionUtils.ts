import { originSubscribeIdList, PlanName } from "@/constants";

export function isOriginSubscriber(id: number): boolean {
  return originSubscribeIdList.includes(id);
}


export const isToppingPlan = (plan: PlanName | null): boolean =>
  plan?.startsWith("TOPPING") ?? false;


export const getPackCount = (recipeCount: number): string => {
  if (recipeCount === 1) return "28팩";
  if (recipeCount === 2) return "14팩";
  return "0팩";
};