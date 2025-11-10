import { commonWrapper, imageWrapper } from "@/styles/common.css";
import { ChangeEvent, Dispatch, RefObject, SetStateAction, useEffect } from "react";
import Image from "next/image";
import Text from "@/components/ui/text/Text";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import InfoBox from "@/components/ui/infoBox/InfoBox";
import Button from "@/components/ui/button/Button";

interface Step4Props {
	previews: string[];
	handleSubmit: () => Promise<void>;
	setSteps: Dispatch<SetStateAction<1 | 2 | 3 | 4 | 5>>;
	loading: boolean;
	inputRef: RefObject<HTMLInputElement>;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Step4({
	previews,
	handleSubmit,
	loading,
	inputRef,
	handleChange,
	setSteps,
}: Step4Props) {
	useEffect(() => {
		if (previews.length === 0) {
			setSteps(3);
			return;
		}
	}, [previews, setSteps]);

	return (
		<div className={commonWrapper({ direction: 'col', align: 'start', paddingBottom: 85 })}>
			<Text 
				type='title2' 
				align='center' 
				className={commonWrapper({ padding: 20, paddingTop: 40 })}
			>
				아래의 사진으로 <br/>비만 분석을 진행할까요?
			</Text>
			<div className={commonWrapper({ direction: 'col', gap: 16 })}>
				<Button 
					variant='outline' 
					intent='assistive' 
					size='sm'
					onClick={() => inputRef?.current?.click()}
				>
					<input
						type="file"
						multiple={false}
						accept="image/*"
						onChange={handleChange}
						ref={inputRef}
						style={{ display: 'none' }}
					/>
					재촬영/업로드
				</Button>
				<div className={commonWrapper({
					direction: 'col',
					align: 'start',
					gap: 16,
					paddingX: 20,
					paddingBottom: 20,
				})}>
					<InfoBox 
						text='촬영 가이드에 맞지 않는 사진은 AI가 인식하기 어려워요. 가이드를 꼭 지켜주세요' 
						fullWidth 
					/>
					<Image
						src={previews[0]}
						alt='uploaded image'
						width={500}
						height={500}
						className={imageWrapper({ height: 'auto', objectFit: 'contain', borderRadius: 8 })}
					/>
				</div>
			</div>
			<ButtonDocked
				type='full-button'
				primaryButtonLabel='제출하기'
				onPrimaryClick={handleSubmit}
				isPrimaryDisabled={loading}
			/>
		</div>
	);
}