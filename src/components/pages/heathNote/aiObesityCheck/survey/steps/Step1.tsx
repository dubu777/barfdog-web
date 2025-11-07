import { commonWrapper } from "@/styles/common.css";
import { Dispatch, SetStateAction } from "react";
import WeightImage from '/public/images/healthNote/aiObesityCheck/weight.svg';
import InputField from "@/components/ui/inputField/InputField";
import Text from "@/components/ui/text/Text";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import { getNameWithPossessiveSuffix } from "@/utils";

interface Step1Props {
	petName: string;
	weight: string | null;
	setWeight: (value: string | null) => void;
	setSteps: Dispatch<SetStateAction<1 | 2 | 3 | 4 | 5>>;	
}

export default function Step1({
	petName,
	weight,
	setWeight,
	setSteps,
}: Step1Props) {
	const isValid = weight && Number(weight) > 0;
	const handleGoNextStep = () => {
		if (isValid) {
			setSteps(2);
		}
	}

	// 숫자와 소수점 1자리까지만 허용하는 정규식
	const isValidWeightInput = (value: string) => /^\d*\.?\d{0,1}$/.test(value);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		
		// 빈 문자열이거나 유효한 입력인 경우에만 상태 업데이트
		if (value === '' || isValidWeightInput(value)) {
			setWeight(value === '' ? null : value);
		}
	}

	return (
		<>
			<Text 
				type='title2' 
				align='center' 
				className={commonWrapper({ padding: 20, paddingTop: 40 })}
			>
				{getNameWithPossessiveSuffix(petName)}의<br/>체중을 알려주세요
			</Text>
			<SvgIcon src={WeightImage} size={100} />
			<div className={commonWrapper({
				direction: 'col',
				align: 'start',
				gap: 4,
				padding: 20,
			})}>
				<InputField
					type="text"
					step="0.1"
					inputMode="decimal"
					value={weight ?? ''}
					onChange={handleChange}
					onSubmit={handleGoNextStep}
					placeholder='몸무게 입력'
					unit='kg'
				/>
				<Text type='body3' color='gray600'>소수점 1자리까지만 입력 가능해요</Text>
			</div>
			{isValid &&
				<ButtonDocked
					type='full-button'
					primaryButtonLabel='다음'
					onPrimaryClick={handleGoNextStep}
				/>
			}
		</>
	);
}