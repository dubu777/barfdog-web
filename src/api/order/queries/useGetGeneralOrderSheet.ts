import { useMutation } from "@tanstack/react-query";
import { getGeneralOrderSheet } from "../order";
import { UseMutationCustomOptions } from "@/types";

// get 요청으로 해야 할 것을 request body가 복잡해서 post로 보내는 중
export function useGetGeneralOrderSheet(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: getGeneralOrderSheet,
    ...mutationOptions,
  })
}