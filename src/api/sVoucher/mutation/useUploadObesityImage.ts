import { useMutation } from '@tanstack/react-query';
import { uploadObesityImage } from '../sVoucher';

export const useUploadObesityImage = () =>
	useMutation({
		mutationFn: ({ file, weight }: { file: File; weight: number }) =>
			uploadObesityImage(file, weight),
	});
