'use client';
import * as styles from './DogDetail.css';
import * as yup from "yup";
import { useState } from "react";
import { Controller } from "react-hook-form";
import InputField from "@/components/common/inputField/InputField";
import SurveyButton from "@/components/pages/survey/surveyButton/SurveyButton";
import DefaultText from "@/components/common/defaultText/DefaultText";
import InputLabel from "@/components/common/inputLabel/InputLabel";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import CustomDatePicker from "@/components/common/datePicker/CustomDatePicker";
import Loader from "@/components/common/loader/Loader";
import DogTypeModal from "@/components/common/modal/dogTypeModal/DogTypeModal";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import FileUpload from "@/components/common/fileUpload/FileUpload";
import useModal from "@/hooks/useModal";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useToastStore } from "@/store/useToastStore";
import { useBackNavigation } from "@/utils";
import { useUpdateDogInfo } from "@/api/dog/mutations/useUpdateDogInfo";
import { useUploadDogProfileImage } from "@/api/dog/mutations/useUploadDogProfileImage";
import { useGetDogDetail } from "@/api/dog/queries/useGetDogDetail";
import { useGetFullDogList } from "@/api/dog/queries/useGetFullDogList";
import { DOG_GENDER, DOG_SIZE } from "@/constants/dog";
import { DogDetailData, UpdateDogData } from "@/types";

const dogInfoSchema = yup.object().shape({
	name: yup.string().required('이름은 필수입니다.'),
	gender: yup.string().required('성별은 필수입니다.'),
	neutralization: yup.boolean(),
	dogSize: yup.mixed<'LARGE' | 'MIDDLE' | 'SMALL'>().oneOf(['LARGE', 'MIDDLE', 'SMALL']).nullable(),
	weight: yup.number().required('몸무게 설정은 필수입니다.'),
	birth: yup.string().required('생년월일은 필수입니다.'),
	oldDog: yup.boolean(),
	dogType: yup.string().required('견종 선택은 필수입니다.'),
})

const defaultDogInfoValues = (dogInfo: DogDetailData): UpdateDogData => ({
	name: dogInfo?.name || '',
	gender: dogInfo?.gender || '',
	neutralization: dogInfo?.neutralization ?? false,
	dogSize: dogInfo?.dogSize || null,
	weight: dogInfo?.weight || 0,
	birth: dogInfo?.birth || '',
	oldDog: dogInfo?.oldDog ?? false,
	dogType: dogInfo?.dogType || '',
});

const DogDetail = ({ dogId }: { dogId: number }) => {
	const goBack = useBackNavigation();

	const { data: dogInfo } = useGetDogDetail(dogId);
	const { data: dogList } = useGetFullDogList();
	const dogPictureUrl = dogList?.find(dog => dog.id === dogId)?.pictureUrl;
	const dogSize = Object.entries(DOG_SIZE).map(([key, value]) => ({ label: value, value: key as keyof typeof DOG_SIZE}))

	const { handleSubmit, control,  errors, watch, setValue, isValid } = useFormHandler<UpdateDogData>(dogInfoSchema, defaultDogInfoValues(dogInfo));
	const { isOpen: isOpenDogTypeModal, onClose: onCloseDogTypeModal, onToggle: onToggleDogTypeModal } = useModal();

	const [file, setFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState<boolean>(false);

	const { mutate: dogInfoMutation } = useUpdateDogInfo();
	const { mutate: dogProfileMutation } = useUploadDogProfileImage();
	
	const { addToast } = useToastStore();

	const handleFileChange = (selectedFile: File | null) => {
		setFile(selectedFile)
	}

	const handleFileUpload = async () => {
		setIsUploading(true);
		try {
			const formData = new FormData();
			if(file) {
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

	const onSubmit = async (data: UpdateDogData) => {
		await handleFileUpload();
		const updatedInfo = {
			...dogInfo,
			...data,
		};
		dogInfoMutation({
			body: updatedInfo,
		}, {
			onSuccess: (onMealRecommendGram) => {
				console.log(`${onMealRecommendGram} 성공!!`);
				addToast('반려견 수정이 완료되었습니다!', 'above-button');
				goBack();
			},
			onError: (error) => {
				console.log('error', error)
				addToast('반려견 수정이 실패했습니다', 'above-button');
			},
		})
	}

	if (!dogInfo) return <Loader fullscreen />;
	return (
		<section>
			<article className={styles.dogProfileImageBox}>
				<DefaultText type='title4'>반려견 정보</DefaultText>
				<div className={styles.dogProfileImageWrapper}>
					<FileUpload
						onFileChange={handleFileChange}
						defaultImageUrl={dogPictureUrl}
						defaultImageName={dogInfo.name}
						imageName='반려견 이미지'
						imageWidth={89}
						imageHeight={89}
						borderRadius
						objectFit='cover'
					/>
				</div>
			</article>
			<form className={styles.dogInfoForm}>
				<Controller
					name='name'
					control={control}
					render={({field}) =>
						<InputField
							{...field}
							variants='box'
							placeholder='반려견 이름을 입력해주세요.'
							label='반려견 이름'
							error={errors?.name?.message}
							isRequired
						/>
					}
				/>
				<div>
					<Controller
						name='gender'
						control={control}
						render={({field}) =>
							<>
								<InputLabel
									label='성별'
									labelColor='gray800'
									isRequired
								/>
								<div className={styles.buttonBox}>
									<SurveyButton
										label={DOG_GENDER['MALE']}
										value='MALE'
										isChecked={field.value === 'MALE'}
										onToggle={field.onChange}
									/>
									<SurveyButton
										label={DOG_GENDER['FEMALE']}
										value='FEMALE'
										isChecked={field.value === 'FEMALE'}
										onToggle={field.onChange}
									/>
								</div>
							</>
						}
					/>
					<Controller
						name='neutralization'
						control={control}
						render={({field}) =>
							<LabeledCheckbox value={field.value} isChecked={field.value} onToggle={() => field.onChange(!field.value)} className={styles.subInputField}>
								<DefaultText type='body2'>중성화 했어요</DefaultText>
							</LabeledCheckbox>
						}
					/>
				</div>
				<div>
					<Controller
						name='birth'
						control={control}
						render={({field}) =>
							<>
								<InputLabel
									label='생년월일'
									labelColor='gray800'
									isRequired
								/>
								<CustomDatePicker name={field.name} value={field.value} onChange={field.onChange} dateFormat='yyyy-MM-dd' marginBottom={false} />
							</>
						}
					/>
					<Controller
						name='oldDog'
						control={control}
						render={({field}) =>
							<LabeledCheckbox value={field.value} isChecked={field.value} onToggle={() => field.onChange(!field.value)} className={styles.subInputField}>
								<DefaultText type='body2'>노령견 이에요</DefaultText>
							</LabeledCheckbox>
						}
					/>
				</div>
				<div>
					<Controller
						name='dogSize'
						control={control}
						render={({field}) =>
							<>
								<InputLabel
									label='몸무게'
									labelColor='gray800'
									isRequired
								/>
								<div className={styles.buttonBox}>
									{dogSize.map(size => (
										<SurveyButton
											key={size.value}
											label={size.label}
											value={size.value}
											isChecked={field.value === size.value}
											onToggle={field.onChange}
										/>
									))}
								</div>
							</>
						}
					/>
					<Controller
						name='weight'
						control={control}
						render={({field}) =>
							<InputField
								{...field}
								variants='box'
								placeholder='몸무게를 입력해주세요.'
								error={errors?.weight?.message}
								unit='kg'
								className={styles.subInputField}
								type='number'
							/>
						}
					/>
				</div>
				<Controller
					name='dogType'
					control={control}
					render={({field}) =>
						<>
							<InputField
								searchButton
								value={field.value}
								label='견종'
								onClick={onToggleDogTypeModal}
								type='button'
							/>
						</>
					}
				/>
			</form>
			<ButtonDocked
				type='full-button'
				primaryButtonLabel='저장하기'
				isPrimaryDisabled={!isValid}
				onPrimaryClick={handleSubmit(onSubmit)}
				position='sticky'
			/>
			{isOpenDogTypeModal &&
				<DogTypeModal
					dogName={dogInfo.name}
					value={watch('dogType')}
					onChange={(value) => setValue('dogType', value)}
					isOpen={isOpenDogTypeModal}
					onClose={onCloseDogTypeModal}
				/>
			}
		</section>
	);
};

export default DogDetail;