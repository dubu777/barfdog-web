'use client';
import { useState } from "react";
import { useFormHandler } from "@/hooks/useFormHandler";
import { HEALTH_CHECK_HISTORY_TAG_MAP } from "@/constants";
import HistoryForm from "@/components/pages/heathNote/healthCheckHistory/form/HistoryForm";
import {
	defaultHealthCheckHistoryValue,
	healthCheckHistorySchema
} from "@/utils/validation/healthCheckHistoryValidation";

interface HealthCheckFormValue {
	hospitalName: string;
	date: string;
	testItems: (keyof typeof HEALTH_CHECK_HISTORY_TAG_MAP)[];
	note: string;
}

const CreateHistory = () => {
	const { handleSubmit, control, errors, isValid } = useFormHandler<HealthCheckFormValue>(healthCheckHistorySchema, defaultHealthCheckHistoryValue(null));
	const [addImageIdList, setAddImageIdList] = useState<number[]>([]);

	const onSubmit = (data) => {
		console.log(data)
	}

	return (
		<section>
			<HistoryForm
				errors={errors}
				control={control}
				setAddImageIdList={setAddImageIdList}
				handleSubmit={handleSubmit(onSubmit)}
				isValid={isValid}
			/>
		</section>
	);
};

export default CreateHistory;