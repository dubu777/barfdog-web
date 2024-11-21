import { originSubscribeIdList } from "@/constants";

export function isOriginSubscriber(id: number): boolean {
  return originSubscribeIdList.includes(id);
}