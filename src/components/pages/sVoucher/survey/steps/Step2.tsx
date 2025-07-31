import * as styles from "@/components/pages/sVoucher/survey/Survey.css";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import Info1Image from '/public/images/sVoucher/info1.png';
import Info2Image from '/public/images/sVoucher/info2.png';

interface Step2Props {
	setSteps: Dispatch<SetStateAction<1 | 2 | 3 | 4 | 5>>;
}

export default function Step2({
	setSteps,
}: Step2Props) {
	const infoList = [
		{
			title: '이렇게 촬영해주세요!',
			image: Info1Image,
			descriptions: [
				'- 일어서있는 아이를 수직으로 보는 시점에서',
				'- 몸 전체가 잘리는 부분 없이 화면에 꽉 차도록',
				'- 기본 카메라를 사용해 수평을 맞춰 세로로 촬영',
			]
		},
		{
			title: '이런 촬영은 주의해 주세요!',
			image: Info2Image,
			descriptions: []
		},
	]
	return (
		<>
			<DefaultText type='title2' className={styles.surveyTitle}>
				촬영 가이드를<br/>확인해 주세요
			</DefaultText>
			<div className={styles.surveyInfo}>
				{infoList.map(info => (
					<div key={info.title}>
						<DefaultText type='label1'>{info.title}</DefaultText>
						<Image src={info.image} alt={info.title} width={500} height={500} style={{ width: '100%' }} className={styles.surveyInfoImage} />
						<div>
							{info.descriptions.length > 0 && info.descriptions.map((description, index) => (
								<DefaultText key={index} type='label2' block>
									{description}
								</DefaultText>
							))
							}
						</div>
					</div>
				))}
			</div>
			<ButtonDocked
				position='sticky'
				type='full-button'
				primaryButtonLabel='확인했어요'
				onPrimaryClick={() => setSteps(3)}
			/>
		</>
	);
}