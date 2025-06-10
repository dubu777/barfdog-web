import * as yup from "yup";
import { DogDetailData, DogFormValues } from "@/types";

export const dogInfoSchema = (dogOriginalName: string) =>
	yup.object().shape({
		name: yup.string().required('이름은 필수입니다.'),
		nameVerified: yup
			.boolean()
			.when('name', {
				is: (name: string) => name !== dogOriginalName,
				then: schema => schema.oneOf([true], '이름 중복 확인이 필요합니다.'),
				otherwise: schema => schema.notRequired(),
			}),
		gender: yup.string().required('성별은 필수입니다.'),
		neutralization: yup.boolean(),
		dogSize: yup.mixed<'LARGE' | 'MIDDLE' | 'SMALL'>().oneOf(['LARGE', 'MIDDLE', 'SMALL']).nullable(),
		weight: yup
			.string()
			.matches(/^\d+(\.\d+)?$/, "숫자만 입력해 주세요.")
			.matches(
				/^\d+(?:\.\d{0,1})?$/,
				"몸무게는 소숫점 첫째 자리까지 입력할 수 있습니다."
			).required('몸무게 설정은 필수입니다.'),
		birth: yup.string().required('생년월일은 필수입니다.'),
		oldDog: yup.boolean(),
		dogType: yup.string().required('견종 선택은 필수입니다.'),
	})

export const defaultDogInfoValues = (dogInfo: DogDetailData | null): DogFormValues => ({
	name: dogInfo?.name || '',
	nameVerified: false,
	gender: dogInfo?.gender || '',
	neutralization: dogInfo?.neutralization ?? false,
	dogSize: dogInfo?.dogSize || null,
	weight: dogInfo?.weight || 0,
	birth: dogInfo?.birth || '',
	oldDog: dogInfo?.oldDog ?? false,
	dogType: dogInfo?.dogType || '',
});