import { commonWrapper } from "@/styles/common.css";
import { surveyUploadBox } from "@/components/pages/heathNote/aiObesityCheck/survey/steps/Steps.css";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef } from "react";
import LightImage from '/public/images/healthNote/aiObesityCheck/light.svg';
import PhotoImage from '/public/images/healthNote/aiObesityCheck/photo.svg';
import Text from "@/components/ui/text/Text";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Button from "@/components/ui/button/Button";
import Card from "@/components/ui/card/Card";
import { getNameWithPossessiveSuffix } from "@/utils";

interface Step3Props {
	petName: string;
	files: File[];
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	steps: number;
	setSteps: Dispatch<SetStateAction<1 | 2 | 3 | 4 | 5>>;
}

export default function Step3({
	petName,
	files,
	handleChange,
	steps,
	setSteps,
}: Step3Props) {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (files.length > 0 && steps !== 4) {
			setSteps(4);
		}
	}, [files, steps, setSteps]);

	return (
		<>
			<Text 
				type='title2' 
				align='center' 
				className={commonWrapper({ padding: 20, paddingTop: 40 })}
			>
				{getNameWithPossessiveSuffix(petName)}의 사진을<br/>업로드해 주세요
			</Text>
			<div className={commonWrapper({
				direction: 'col',
				align: 'start',
				gap: 16,
				paddingX: 20,
			})}>
				<Card 
					shadow='none'
					borderRadius={8}
					gap={12}
					padding={12}
					direction='row'
					justify='start'
					backgroundColor='transparent'
					border='blue500'
				>
					<SvgIcon src={LightImage} size={24} />
					<Text type='label4' color='blue500'>TIP! 간식이나 장난감을 들고 아이가 앞에서 멈췄을 때 촬용해 보세요!</Text>
				</Card>
				<input
					type="file"
					multiple={false}
					accept="image/*"
					capture="environment"
					onChange={handleChange}
					ref={inputRef}
					style={{ display: 'none' }}
				/>
				<div onClick={() => inputRef?.current?.click()} className={surveyUploadBox}>
					<SvgIcon src={PhotoImage} size={60} />
					<Button variant='solid' intent="secondary">업로드 하기</Button>
				</div>
			</div>
		</>
	);
}