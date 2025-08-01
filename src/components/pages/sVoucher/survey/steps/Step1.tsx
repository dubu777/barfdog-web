import * as styles from "@/components/pages/sVoucher/survey/Survey.css";
import { Dispatch, SetStateAction } from "react";
import WeightImage from '/public/images/sVoucher/weight.svg';
import InputField from "@/components/common/inputField/InputField";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";

interface Step1Props {
	weight: number | null;
	setWeight: (value: number) => void;
	setSteps: Dispatch<SetStateAction<1 | 2 | 3 | 4 | 5>>;	
}

export default function Step1({
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
	return (
		<>
			<DefaultText type='title2' className={styles.surveyTitle}>
				우리 아이의<br/>체중을 알려주세요
			</DefaultText>
			<SvgIcon src={WeightImage} size={100} />
			<div className={styles.surveyInput}>
				<InputField
					type="number"
					step="0.1"
					value={weight ?? ''}
					onChange={(e) => {
						const value = e.target.value;
						if (value === '' || /^\d*\.?\d{0,1}$/.test(value)) {
							setWeight(Number(value));
						}
					}}
					onSubmit={handleGoNextStep}
					placeholder='몸무게 입력'
					unit='kg'
				/>
				<DefaultText type='body3' color='gray600'>소수점 1자리까지만 입력 가능해요</DefaultText>
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