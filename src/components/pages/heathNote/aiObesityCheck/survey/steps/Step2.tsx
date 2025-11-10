import { commonWrapper, imageWrapper } from "@/styles/common.css";
import { surveyInfoImageBox } from "./Steps.css";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Ex1Image from '/public/images/healthNote/aiObesityCheck/ex1.png';
import Ex2Image from '/public/images/healthNote/aiObesityCheck/ex2.png';
import Ex3Image from '/public/images/healthNote/aiObesityCheck/ex3.png';
import Info1Image from '/public/images/healthNote/aiObesityCheck/info1.png';
import Info2Image from '/public/images/healthNote/aiObesityCheck/info2.png';
import Info3Image from '/public/images/healthNote/aiObesityCheck/info3.png';
import Info4Image from '/public/images/healthNote/aiObesityCheck/info4.png';
import Text from "@/components/ui/text/Text";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";

interface Step2Props {
	isMobileWidth: boolean;
	setSteps: Dispatch<SetStateAction<1 | 2 | 3 | 4 | 5>>;
}

export default function Step2({
	isMobileWidth,
	setSteps,
}: Step2Props) {
	const imageConfigs = {
		example: {
			images: [Ex1Image, Ex2Image, Ex3Image],
			excludeLastOnMobile: true,
		},
		info: {
			images: [Info1Image, Info2Image, Info3Image, Info4Image],
			excludeLastOnMobile: false,
		}
	};

	const infoList = [
		{
			key: 'example',
			title: '이렇게 촬영해주세요!',
			...imageConfigs.example,
			images: isMobileWidth && imageConfigs.example.excludeLastOnMobile 
				? imageConfigs.example.images.slice(0, -1) 
				: imageConfigs.example.images,
			descriptions: [
				'•  일어서있는 아이를 수직으로 보는 시점에서',
				'•  몸 전체가 잘리는 부분 없이 화면에 꽉 차도록',
				'•  기본 카메라를 사용해 수평을 맞춰 세로로 촬영',
			]
		},
		{
			key: 'info',
			title: '이런 촬영은 주의해 주세요!',
			...imageConfigs.info,
			descriptions: []
		},
	]
	return (
		<>
			<Text type='title2' className={commonWrapper({ padding: 20, paddingTop: 40, justify: 'start' })}>
				촬영 가이드를 확인해 주세요
			</Text>
			<div className={commonWrapper({
				direction: 'col',
				align: 'start',
				gap: 32,
				paddingX: 20,
				paddingBottom: 20,
			})}>
				{infoList.map((info) => (
					<div key={info.title} className={commonWrapper({ direction: 'col', align: 'start', gap: 12 })}>
						<Text type='label1'>{info.title}</Text>
						<div 
							className={surveyInfoImageBox({
								columns: 
									info.key === 'info' && isMobileWidth
										? 2
										: (info.images.length as 2 | 3 | 4),
							})}
						>
							{info.images.map((image, index) => (
								<Image
									key={index} 
									src={image} 
									alt={`${info.title}-${index}`}
									width={500}
									height={500}
									className={imageWrapper({ height: 'auto', objectFit: 'contain' })} 
								/>
							))}
						</div>
						{info.descriptions.length > 0 && 
							<div>
								{info.descriptions.map((description, index) => (
									<Text key={index} type='label2' block color='gray700'>
										{description}
									</Text>
								))}
							</div>
						}
					</div>
				))}
			</div>
			<ButtonDocked
				type='full-button'
				primaryButtonLabel='확인했어요'
				onPrimaryClick={() => setSteps(3)}
				position='sticky'
			/>
		</>
	);
}