import * as styles from './HistoryForm.css';
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { Control, Controller, FieldErrors } from "react-hook-form";
import CheckIcon from "public/images/survey/check_small.svg";
import InputField from "@/components/ui/inputField/InputField";
import Textarea from "@/components/ui/textarea/Textarea";
import InputLabel from "@/components/ui/inputLabel/InputLabel";
import CustomDatePicker from "@/components/ui/datePicker/CustomDatePicker";
import LabeledCheckbox from "@/components/ui/labeledCheckBox/LabeledCheckBox";
import Chips from "@/components/ui/chips/Chips";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import MobileDatePicker from "@/components/ui/datePicker/mobileDatePicker/MobileDatePicker";
import MultiFileUploader from "@/components/ui/multiFileUploader/MultiFileUploader";
import useDeviceState from "@/hooks/useDeviceState";
import { UploadedFile } from "@/types";
import { DIAGNOSIS_ITEM_LIST } from "@/constants";
import { DiagnosisItem, MedicalHistoryFormValue } from "@/types/healthNote/medicalHistory";

interface HistoryFormProps {
	control: Control<MedicalHistoryFormValue>;
	errors: FieldErrors<MedicalHistoryFormValue>;
	handleSubmit: () => void;
	isValid: boolean;
	uploadedFiles: UploadedFile[];
	uploadFile: (file: File) => Promise<void>;
	removeFile: (fileId: number) => Promise<void>;
}

export default function HistoryForm ({ 
	control,
	errors,
	handleSubmit,
	isValid,
	uploadedFiles,
	uploadFile,
	removeFile,
}: HistoryFormProps) {
	const params = useParams();
	const { isMobileDevice } = useDeviceState();

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
					name='diagnosisDate'
					control={control}
					render={({field}) =>
						<div>
							<InputLabel
								label='날짜'
								labelColor='gray700'
								isRequired
							/>
							{isMobileDevice ? (
								<MobileDatePicker
									value={field.value}
									onChange={(date) => {
										field.onChange(format(date as Date, 'yyyy-MM-dd'))
									}}
								/>
							) : (
								<CustomDatePicker
									value={field.value}
									dateFormat='yyyy-MM-dd'
									name={field.name}
									marginBottom={false}
									onChange={(date) => {
										field.onChange(format(date as Date, 'yyyy-MM-dd'))
									}}
								/>
							)}
						</div>
					}
				/>
				<Controller
					name='diagnosisItemList'
					control={control}
					render={({field}) =>
						<div>
							<InputLabel
								label='검사 항목'
								isRequired
								labelColor='gray700'
							/>
							<div className={styles.diagnosisItemList}>
								{DIAGNOSIS_ITEM_LIST.map(item => {
									const isChecked = field.value.includes(item.value as DiagnosisItem);
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
											className={styles.diagnosisItemCheckbox}
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
				<MultiFileUploader
					files={uploadedFiles}
					onUpload={uploadFile}
					onRemove={removeFile}
					maxFiles={10}
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
							<Textarea
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
				primaryButtonLabel={`${params?.diagnosisId ? '수정' : '등록'}하기`}
				onPrimaryClick={handleSubmit}
				isPrimaryDisabled={!isValid}
			/>
		</article>
	);
};
