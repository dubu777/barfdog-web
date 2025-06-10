import { queryKeys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDogProfileImage, uploadDogProfileImage } from "@/api/dog/dog";
import { UploadDogProfileImage, UseMutationCustomOptions } from "@/types";

export { useUploadDogProfileImage };

const getDogDetailQueryKey = [queryKeys.DOG.BASE, queryKeys.DOG.GET_DOG_DETAIL];
const getDogListQueryKey = [queryKeys.DOG.BASE, queryKeys.DOG.GET_FULL_DOG_LIST];

function useUploadDogProfileImage(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData, dogId, deleteImage }: { formData: FormData, dogId: number, deleteImage: boolean }) => {
      // 이미지 업로드
      let uploadResponse: UploadDogProfileImage | null = null;
      if (formData && !deleteImage) {
        uploadResponse = await uploadDogProfileImage(formData);
      }

      // 업로드한 이미지 프로필 업데이트
      const updateImageId = !deleteImage && uploadResponse !== null ? uploadResponse?.id : null;

      const updateResponse = await updateDogProfileImage(dogId, updateImageId);
      return updateResponse;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: getDogDetailQueryKey });
      await queryClient.invalidateQueries({ queryKey: getDogListQueryKey });
    },
    onError: (error) => {
      console.log(error)
    },
    ...mutationOptions
  })
}