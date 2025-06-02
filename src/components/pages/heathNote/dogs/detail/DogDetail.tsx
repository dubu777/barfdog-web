'use client';
import * as yup from "yup";
import { useState } from "react";
import Loader from "@/components/common/loader/Loader";
import DogForm from "@/components/pages/heathNote/dogs/form/DogForm";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useToastStore } from "@/store/useToastStore";
import { useBackNavigation } from "@/utils";
import { useUpdateDogInfo } from "@/api/dog/mutations/useUpdateDogInfo";
import { useUploadDogProfileImage } from "@/api/dog/mutations/useUploadDogProfileImage";
import { useGetDogDetail } from "@/api/dog/queries/useGetDogDetail";
import { useGetFullDogList } from "@/api/dog/queries/useGetFullDogList";
import { DogFormValues } from "@/types";
import useModal from "@/hooks/useModal";
import ChangeGramBottomSheet
	from "@/components/pages/heathNote/dogs/detail/changeGramBottomSheet/ChangeGramBottomSheet";
import ChangePriceModal from "@/components/pages/heathNote/dogs/detail/changePriceModal/ChangePriceModal";
import { defaultDogInfoValues, dogInfoSchema } from "@/utils/validation/dogValidation";


const DogDetail = ({ dogId }: { dogId: number }) => {
	const goBack = useBackNavigation(undefined, true);

	const { data: dogInfo } = useGetDogDetail(dogId);
	const { data: dogList } = useGetFullDogList();

	const [file, setFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [isChangedGram, setIsChangedGram] = useState(true);

	const { mutate: dogInfoMutation } = useUpdateDogInfo();
	const { mutate: dogProfileMutation } = useUploadDogProfileImage();

	const { isOpen: isOpenChangeGram, onClose: onCloseChangeGram, onToggle: onToggleChangeGram } = useModal();
	const { isOpen: isOpenChangePrice, onClose: onCloseChangePrice, onToggle: onToggleChangePrice } = useModal();
	const { addToast } = useToastStore();

	const dogPictureUrl = dogList?.find(dog => dog.id === dogId)?.pictureUrl;
	const dogOriginalName = dogInfo.name;
	const dogOriginalWeight = dogInfo.weight;

	const { handleSubmit, control, errors, watch, setValue, setError, isValid, dirtyFields, clearErrors } =
		useFormHandler<DogFormValues>(dogInfoSchema(dogOriginalName), defaultDogInfoValues(dogInfo));

	const isSubscribing = !!dogInfo.subscribeId;
	const isDirtyFields = (
		dirtyFields?.neutralization ||
		dirtyFields?.oldDog ||
		(dirtyFields?.weight && Number(watch('weight')) !== Number(dogOriginalWeight))
		) || false;

	const handleFileChange = (selectedFile: File | null) => {
		setFile(selectedFile)
	}

	const handleFileUpload = async () => {
		if (!file) return;

		setIsUploading(true);
		try {
			const formData = new FormData();
			if (file) {
				formData.append('file', file);
			}
			dogProfileMutation(
				{
					formData,
					dogId,
					deleteImage: file === null,
				},
				{
					onSuccess: () => {
						setTimeout(() => {
							addToast('프로필 사진이 수정 되었습니다.', 'above-button');
						}, 100)
					},
					onError: (err) => {
						console.log(err);
						// petPictureId === null 삭제기능 404 Error 확인 필요
						addToast('파일 업로드에 실패했습니다.', 'above-button');
					}
				},
			)
		} catch (err) {
			console.log(err);
			addToast('파일 업로드에 실패했습니다.', 'above-button');
		} finally {
			setIsUploading(false);
		}
	}

	const onSubmit = async (data: DogFormValues, isBackNavigation?: boolean) => {
		const { nameVerified, weight, ...rest } = data;

		await handleFileUpload();
		const updatedInfo = {
			...dogInfo,
			...rest,
			weight: Number(weight),
		};
		dogInfoMutation({
			body: updatedInfo,
		}, {
			onSuccess: (onMealRecommendGram) => {
				if (isBackNavigation) {
					addToast('프로필 수정이 완료됐어요', 'above-button');
					goBack();
				}
			},
			onError: (error) => {
				console.log('error', error)
				addToast('프로필 수정이 실패하였습니다', 'above-button');
			},
		})
	}

	const handleSubmitWithBack = () => {
		handleSubmit((data) => onSubmit(data, true))();
	};

	const handleSubmitNormal = () => {
		handleSubmit((data) => onSubmit(data, false))();
	};

	if (!dogInfo) return <Loader fullscreen />;
	return (
		<section>
			<DogForm
				type='update'
				dogInfo={dogInfo}
				dogPictureUrl={dogPictureUrl}
				control={control}
				errors={errors}
				setError={setError}
				clearErrors={clearErrors}
				watch={watch}
				setValue={setValue}
				isValid={isValid}
				handleFileChange={handleFileChange}
				handleSubmit={
					(isSubscribing && isDirtyFields)
						? onToggleChangeGram
						: handleSubmitWithBack
				}
				dirtyFields={dirtyFields}
			/>
			{isSubscribing && isDirtyFields &&
				<ChangeGramBottomSheet
					isOpen={isOpenChangeGram}
					onClose={onCloseChangeGram}
					originalKcal={400}
					recommendKcal={420}
					isChangedGram={isChangedGram}
					setIsChangedGram={setIsChangedGram}
					handleSubmit={() => {
						onCloseChangeGram();
						if (isChangedGram) {
							onToggleChangePrice();
						} else {
							handleSubmitWithBack();
						}
					}}
				/>
			}
			{isOpenChangePrice &&
				<ChangePriceModal
					isOpen={isOpenChangePrice}
					onClose={onCloseChangePrice}
					handleSubmit={handleSubmitNormal}
					subscriptionId={dogInfo.subscribeId}
				/>
			}
		</section>
	);
};

export default DogDetail;