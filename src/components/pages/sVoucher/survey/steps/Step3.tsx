import * as styles from "@/components/pages/sVoucher/survey/Survey.css";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef } from "react";
import LightImage from '/public/images/sVoucher/light.svg';
import PhotoImage from '/public/images/sVoucher/photo.svg';
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Button from "@/components/common/button/Button";

interface Step3Props {
	files: File[];
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	steps: number;
	setSteps: Dispatch<SetStateAction<1 | 2 | 3 | 4 | 5>>;
}

export default function Step3({
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
	}, [files, steps]);

	return (
		<>
			<DefaultText type='title2' className={styles.surveyTitle}>
				우리 아이 사진을<br/>업로드해 주세요
			</DefaultText>
			<div className={styles.surveyUploadContainer}>
				<div className={styles.surveyLightIcon}>
					<SvgIcon src={LightImage} size={24} />
					<DefaultText type='label4' color='blue500'>TIP! 간식이나 장난감을 들고 아이가 앞에서 멈췄을 때 촬용해 보세요!</DefaultText>
				</div>
				<input
					type="file"
					multiple
					accept="image/*"
					capture="environment"
					onChange={handleChange}
					ref={inputRef}
					style={{ display: 'none' }}
				/>
				<div onClick={() => inputRef?.current?.click()} className={styles.surveyUploadBox}>
					<SvgIcon src={PhotoImage} size={60} />
					<Button variant='solid' buttonColor='gray900'>쵤영/업로드</Button>
				</div>
			</div>
		</>
	);
}