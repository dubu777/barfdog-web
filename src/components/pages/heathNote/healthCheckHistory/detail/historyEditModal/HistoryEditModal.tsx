import { useState } from "react";
import HistoryForm from "@/components/pages/heathNote/healthCheckHistory/form/HistoryForm";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import { useFormHandler } from "@/hooks/useFormHandler";
import {
	defaultHealthCheckHistoryValue,
	healthCheckHistorySchema
} from "@/utils/validation/healthCheckHistoryValidation";
import { HealthCheckHistoryFormValue } from "@/types/healthNote";

interface HistoryEditModalProps {
	isOpen: boolean;
	onClose: () => void;
	data: any;
}

const HistoryEditModal = ({
	isOpen,
	onClose,
	data,
}: HistoryEditModalProps) => {
	const { handleSubmit, control, errors, isValid } = useFormHandler<HealthCheckHistoryFormValue>(healthCheckHistorySchema, defaultHealthCheckHistoryValue(data));
	const [addImageIdList, setAddImageIdList] = useState<number[]>([]);
	const [deleteImageIdList, setDeleteImageIdList] = useState<number[]>([]);

	console.log('addImageIdList', addImageIdList);

	const onSubmit = (formData) => {
		console.log('formData', formData)

	}
	return (
		<FullModalWrapper isVisible={isOpen} headerTitle='건강검진 수정' handleClose={onClose}>
			<HistoryForm
				errors={errors}
				control={control}
				handleSubmit={handleSubmit(onSubmit)}
				isValid={isValid}
				imageList={data.imageList}
				setAddImageIdList={setAddImageIdList}
				setDeleteImageIdList={setDeleteImageIdList}
			/>
		</FullModalWrapper>
	);
};

export default HistoryEditModal;