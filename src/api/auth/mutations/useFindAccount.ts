import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { findUserEmail } from "@/api/auth/auth";

export { useFindUserEmail };

function useFindUserEmail(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: ({
      name,
      phoneNumber,
    }: {
      name: string;
      phoneNumber: string;
    }) => findUserEmail(name, phoneNumber),
    ...mutationOptions,
  });
}
