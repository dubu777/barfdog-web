'use client';
import { useState } from "react";
import DogForm from "@/components/pages/heathNote/dogs/dogForm/DogForm";
import { useFormHandler } from "@/hooks/useFormHandler";
import { defaultDogInfoValues, dogInfoSchema } from "@/utils/validation/dogValidation";
import { DogFormValues } from "@/types";

const CreateDog = () => {
	const [file, setFile] = useState<File | null>(null);
	const { handleSubmit, control, errors, watch, setValue, setError, isValid, dirtyFields, clearErrors } = useFormHandler<DogFormValues>(dogInfoSchema(''), defaultDogInfoValues(null));

	// 이미지 파일 업로드, 등록 적용 필요
	const handleFileChange = (selectedFile: File | null) => {
		setFile(selectedFile)
	}
	const onSubmit = (data) => {
		console.log(data);
	}
	return (
		<section>
			<DogForm
				type='create'
				dogInfo={null}
				dogName={watch('name')}
				control={control}
				errors={errors}
				setError={setError}
				clearErrors={clearErrors}
				watch={watch}
				setValue={setValue}
				isValid={isValid}
				handleFileChange={handleFileChange}
				handleSubmit={handleSubmit(onSubmit)}
				dirtyFields={dirtyFields}
			/>
		</section>
	);
};

export default CreateDog;