import { useMutation } from "@tanstack/react-query";
import { getGeneralOrderSheet } from "../order";
import { UseMutationCustomOptions } from "@/types";


export function useGetGeneralOrderSheet(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: getGeneralOrderSheet,
    ...mutationOptions,
  })
}