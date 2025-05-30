import * as styles from './HistoryForm.css';
import { Dispatch, SetStateAction } from 'react';
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { Control, Controller, FieldErrors } from "react-hook-form";
import CheckIcon from "public/images/survey/check_small.svg";
import InputField from "@/components/common/inputField/InputField";
import DefaultTextarea from "@/components/common/defaultTextarea/DefaultTextarea";
import InputLabel from "@/components/common/inputLabel/InputLabel";
import CustomDatePicker from "@/components/common/datePicker/CustomDatePicker";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import Chips from "@/components/common/chips/Chips";
import MultiFileUpload from "@/components/common/multiFileUpload/MultiFileUpload";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { ImageFile } from "@/types";
import { HealthCheckHistoryFormValue } from "@/types/healthNote";
import { HEALTH_CHECK_HISTORY_TAG_MAP } from "@/constants";

interface HistoryFormProps {
	control: Control<HealthCheckHistoryFormValue>;
	errors: FieldErrors<HealthCheckHistoryFormValue>;
	handleSubmit: () => void;
	isValid: boolean;
	setAddImageIdList: Dispatch<SetStateAction<number[]>>;
	setDeleteImageIdList?: Dispatch<SetStateAction<number[]>>;
	imageList?: ImageFile[];
}

const HistoryForm = ({
	control,
	errors,
	setAddImageIdList,
	setDeleteImageIdList,
	handleSubmit,
	isValid,
	imageList = [],
}: HistoryFormProps) => {
	const params = useParams();
	const testItems = Object.entries(HEALTH_CHECK_HISTORY_TAG_MAP).map(([value, label]) => ({ label, value }));

	const handleFileUpload = async (files: ImageFile[]) => {
		const uploadedImageList: number[] = [];
		for (const file of files) {
			if (file.id) {
				uploadedImageList.push(file.id);
			}
		}
		setAddImageIdList((prev) => Array.from(new Set([...prev, ...uploadedImageList])));
	}

	const handleFileRemove = (id: number) => {
		const isExistingFile = imageList ? imageList?.some(image => image.id === id) : false;
		if (isExistingFile) {
			// 기존 저장된 이미지라면 deleteImageIdList 추가
			if (setDeleteImageIdList) {
				setDeleteImageIdList(prev => [...prev, id]);
			}
		} else {
			// 새로 업로드한 이미지라면 추가된 addImageIdList 에서 제거
			setAddImageIdList(prev => prev.filter(imageId => imageId !== id));
		}
	}

	return (
		<article className={styles.healthCheckFormContainer}>
			<form className={styles.healthCheckForm}>
				<Controller
					name='hospitalName'
					control={control}
					render={({field}) =>
						<InputField
							{...field}
							variants='box'
							placeholder='병원명을 입력해주세요.'
							label='병원'
							error={errors?.hospitalName?.message}
							isRequired
						/>
					}
				/>
				<Controller
					name='date'
					control={control}
					render={({field}) =>
						<div>
							<InputLabel
								label='날짜'
								labelColor='gray700'
								isRequired
							/>
							<CustomDatePicker
								name='date'
								value={field.value}
								dateFormat='yyyy.MM.dd'
								marginBottom={false}
								onChange={(date) => {
									field.onChange(format(date as Date, 'yyyy.MM.dd'))
								}}
							/>
						</div>
					}
				/>
				<Controller
					name='testItems'
					control={control}
					render={({field}) =>
						<div>
							<InputLabel
								label='검사 항목'
								labelColor='gray700'
								isRequired
							/>
							<div className={styles.testItemsBox}>
								{testItems.map(item => {
									const isChecked = field.value.includes(item.value as keyof typeof HEALTH_CHECK_HISTORY_TAG_MAP);
									return (
										<LabeledCheckbox
											key={item.value}
											value={item.value}
											isChecked={isChecked}
											iconSize={0}
											onToggle={(value) => {
												if (!isChecked) {
													field.onChange([...field.value, value]);
												} else {
													field.onChange(field.value.filter(v => v !== value))
												}
											}}
											className={styles.testItemsCheckbox}
										>
											<Chips
												variant='solid'
												borderRadius='lg'
												size='lg'
												color='red'
												switchOff={!isChecked}
												icon={isChecked ? CheckIcon : undefined}
											>
												{item.label}
											</Chips>
										</LabeledCheckbox>
									)
								})}
							</div>
						</div>
					}
				/>
				<MultiFileUpload
					uploadApiUrl='/api/reviews/upload'
					onFilesChange={(files) => handleFileUpload(files as ImageFile[])}
					maxFiles={10}
					imageWidth={100}
					imageHeight={100}
					initialImages={[]}
					handleRemove={(id) => handleFileRemove(id)}
					title='검사 및 결과 사진'
				/>
				<Controller
					name='note'
					control={control}
					render={({ field }) => (
						<div>
							<InputLabel
								label='특이사항'
								labelColor='gray700'
							/>
							<DefaultTextarea
								{...field}
								id='note'
								value={field.value}
								placeholder='예) 검진 후 스트레스를 받지 않도록 편안한 환경 제공하기'
								error={errors.note?.message || ''}
							/>
						</div>
					)}
				/>
			</form>
			<ButtonDocked
				type='full-button'
				primaryButtonLabel={`${params?.historyId ? '수정' : '등록'}하기`}
				onPrimaryClick={handleSubmit}
				isPrimaryDisabled={!isValid}
			/>
		</article>
	);
};

export default HistoryForm;