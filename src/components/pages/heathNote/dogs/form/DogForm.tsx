import * as styles from './DogForm.css';
import { useCallback, useState } from "react";
import { format } from "date-fns";
import {
	Control,
	Controller,
	FieldErrors,
	FieldNamesMarkedBoolean, UseFormClearErrors,
	UseFormSetError,
	UseFormSetValue,
	UseFormWatch
} from "react-hook-form";
import InputField from "@/components/common/inputField/InputField";
import InputLabel from "@/components/common/inputLabel/InputLabel";
import SurveyButton from "@/components/pages/survey/surveyButton/SurveyButton";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import DefaultText from "@/components/common/defaultText/DefaultText";
import CustomDatePicker from "@/components/common/datePicker/CustomDatePicker";
import FileUpload from "@/components/common/fileUpload/FileUpload";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import DogTypeModal from "@/components/common/modal/dogTypeModal/DogTypeModal";
import useModal from "@/hooks/useModal";
import { DogDetailData, DogFormValues } from "@/types";
import { DOG_GENDER, DOG_SIZE } from "@/constants/dog";
import { useCheckDuplicateDogName } from "@/api/dog/queries/useCheckDuplicateDogName";

interface DogFormProps {
	type: 'update' | 'create';
	dogInfo: DogDetailData | null;
	dogPictureUrl?: string;
	dogName?: string;
	control: Control<DogFormValues>;
	errors: FieldErrors<DogFormValues>;
	setError: UseFormSetError<DogFormValues>;
	clearErrors: UseFormClearErrors<DogFormValues>;
	watch: UseFormWatch<DogFormValues>;
	setValue: UseFormSetValue<DogFormValues>;
	isValid: boolean;
	handleFileChange: (file: File | null) => void;
	handleSubmit: () => void;
	dirtyFields: FieldNamesMarkedBoolean<DogFormValues>;
}

const DogForm = ({
	type,
	dogInfo,
	dogPictureUrl,
	dogName,
	control,
	errors,
	setError,
	clearErrors,
	watch,
	setValue,
	isValid,
	handleFileChange,
	handleSubmit,
	dirtyFields,
}: DogFormProps) => {
	const dogSize = Object.entries(DOG_SIZE).map(([key, value]) => ({ label: value, value: key as keyof typeof DOG_SIZE}))
	const isDisabledNameVerified = !dirtyFields.name;

	const [successMessage, setSuccessMessage] = useState('');

	const { isOpen: isOpenDogTypeModal, onClose: onCloseDogTypeModal, onToggle: onToggleDogTypeModal } = useModal();
	const { isFetching, refetch: checkDuplicate } =
		useCheckDuplicateDogName(watch('name'), { enabled: false });

	const handleBlurNameDuplicate = () => {
		if (type === 'create' && watch('name') && !watch('nameVerified')) {
			setError('name', { message: '반려견 이름 중복 확인을 해주세요' });
		}
	}

	const handleChangeName = () => {
		setValue('nameVerified', false, { shouldValidate: true });
		setSuccessMessage('');
	}

	const handleDuplicateCheck = useCallback(async () => {
		clearErrors('name')

		if (!watch('name')) {
			setError('name', { message: '이름을 입력해주세요.' })
			return;
		}

		const { data } = await checkDuplicate();
		const isSuccess = data?.result === "SUCCESS";

		if (isSuccess) {
			setValue('nameVerified', true, { shouldValidate: true });
			setSuccessMessage('사용 가능한 반려견 이름입니다.');
		} else {
			setError('name', { message: '이미 사용 중인 이름입니다.' })
			setValue('nameVerified', false, { shouldValidate: true });
		}
	}, [watch('name'), checkDuplicate, setError, setValue]);
	
	return (
		<>
		<article className={styles.dogProfileImageBox}>
			<DefaultText type='title4'>반려견 정보</DefaultText>
			<div className={styles.dogProfileImageWrapper}>
				<FileUpload
					onFileChange={handleFileChange}
					defaultImageUrl={dogPictureUrl}
					defaultImageName={dogInfo?.name || ''}
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
						onChange={(e) => {
							field.onChange(e);
							handleChangeName();
						}}
						variants='box'
						placeholder='반려견 이름을 입력해주세요.'
						label='반려견 이름'
						error={errors?.name?.message}
						isRequired
						confirmButtonText='중복확인'
						confirmButton
						confirmButtonVariant='solid'
						confirmButtonDisabled={!watch('name') || isDisabledNameVerified}
						onSubmit={handleDuplicateCheck}
						success={successMessage}
						onBlur={handleBlurNameDuplicate}
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
									isDisabled={type === 'update'}
								/>
								<SurveyButton
									label={DOG_GENDER['FEMALE']}
									value='FEMALE'
									isChecked={field.value === 'FEMALE'}
									onToggle={field.onChange}
									isDisabled={type === 'update'}
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
							<CustomDatePicker
								name={field.name}
								value={field.value}
								onChange={(date) => {
									field.onChange(format(date as Date, 'yyyy-MM-dd'))
								}}
								dateFormat='yyyy-MM-dd'
								marginBottom={false}
								isDisabled={type === 'update'}
							/>
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
				onPrimaryClick={handleSubmit}
				position='sticky'
			/>
			{isOpenDogTypeModal &&
			<DogTypeModal
				dogName={dogInfo?.name || dogName as string}
				value={watch('dogType')}
				onChange={(value) => setValue('dogType', value)}
				isOpen={isOpenDogTypeModal}
				onClose={onCloseDogTypeModal}
			/>
			}
		</>
	);
};

export default DogForm;