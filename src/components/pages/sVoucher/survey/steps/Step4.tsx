import * as styles from "@/components/pages/sVoucher/survey/Survey.css";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import InfoBox from "@/components/common/infoBox/InfoBox";

interface Step4Props {
	previews: string[];
	setSteps: Dispatch<SetStateAction<1 | 2 | 3 | 4 | 5>>;
	resetFiles: () => void;
}

export default function Step4({
	previews,
	setSteps,
	resetFiles,
}: Step4Props) {

	console.log('previews', previews)
	const handleGoBack = () => {
		resetFiles();
		setSteps(3);
	}
	return (
		<>
			<DefaultText type='title2' className={styles.surveyTitle}>
				아래의 사진으로 <br/>비만 분석을 진행할까요?
			</DefaultText>
			<div className={styles.surveyPreviewContainer}>
				<InfoBox text='촬영 가이드에 맞지 않는 사진은 AI가 인식하기 어려워요. 가이드를 꼭 지켜주세요' />
				<Image
					src={previews[0]}
					alt='uploaded image'
					width={500}
					height={500}
					className={`${styles.surveyImage} ${styles.surveyPreviewImage}`}
				/>
			</div>
			<ButtonDocked
				type='dual-button'
				primaryButtonLabel='제출하기'
				onPrimaryClick={() => setSteps(5)}
				secondaryButtonLabel='재촬영/업로드'
				onSecondaryClick={handleGoBack}
			/>
		</>
	);
}