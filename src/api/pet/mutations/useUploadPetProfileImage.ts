import { queryKeys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDogProfileImage, uploadDogProfileImage } from "@/api/pet/pet";
import { UseMutationCustomOptions } from "@/types";

export { useUploadPetProfileImage };

const getDogListQueryKey = [queryKeys.PET.BASE, queryKeys.PET.GET_PET_LIST];

function useUploadPetProfileImage(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData, petId, deleteImage }: { formData: FormData, petId: number, deleteImage: boolean }) => {
      // 이미지 업로드
      let uploadResponse = null;
      if (formData && !deleteImage) {
        uploadResponse = await uploadDogProfileImage(formData);
      }

      // 업로드한 이미지 프로필 업데이트
      const updateImageId = uploadResponse?.id;
      const updateResponse = await updateDogProfileImage(petId, deleteImage ? null : updateImageId);
      return updateResponse;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: getDogListQueryKey });
    },
    onError: (error) => {
      console.log(error)
    },
    ...mutationOptions
  })
}