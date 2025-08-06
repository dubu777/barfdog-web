import { useState } from "react";
import * as styles from "../Information.css";
import { ellipsis } from "@/styles/common.css";
import { differenceInYears, isBefore, parse } from "date-fns";
import InfoTitleButton from "@/components/pages/mypage/common/information/layout/InfoTitleButton";
import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Button from "@/components/common/button/Button";
import Image from "next/image";
import SampleDog1 from '/public/images/mypage/sample/sample1.jpg'
import { DOG_GENDER } from "@/constants/dog";

interface PetInfoProps {
	data: any;
	subTitleRight?: string;
	isDefaultOpen?: boolean;
	showEditDogInfo?: boolean;
}

const getAgeFromYYYYMM = (yyyymm: string): number => {
	const birthDate = parse(yyyymm, 'yyyyMM', new Date());
	const today = new Date();

	let age = differenceInYears(today, birthDate);

	// 생일이 아직 안 지났으면 한 살 빼기
	if (!isBefore(birthDate, today)) {
		age--;
	}

	return age;
};

const DogInfo = ({
	data,
	subTitleRight,
	isDefaultOpen = true,
	showEditDogInfo = false,
}: PetInfoProps) => {
	const [isOpen, setIsOpen] = useState(isDefaultOpen);
	return (
		<article className={styles.infoContainer({ isOpen })}>
			<InfoTitleButton
				title='반려견 정보'
				subTitleRight={subTitleRight || undefined}
				isOpen={isOpen}
				setIsOpen={!isDefaultOpen ? setIsOpen : undefined}
			/>
			{isOpen &&
				<Card
					shadow='none'
					padding={12}
					className={styles.infoDetailContainer}
				>
					<div className={styles.petInfo}>
						<Image src={SampleDog1} alt={data.name} width={76} height={76} className={styles.petImage} />
						<div className={styles.infoBox}>
							<DefaultText type='headline1'>{data.name || '더듬'}</DefaultText>
							<DefaultText type='caption' color='gray600' className={ellipsis({ lineSize: 'line1' })}>
								{getAgeFromYYYYMM(data.birth)}살 {data.weight}kg {DOG_GENDER[data.gender]} {data.dogType}<br/>
							</DefaultText>
							<DefaultText type='caption' color='gray600' className={ellipsis({ lineSize: 'line1' })}>
								건강고민: 관절염, 피부염, 슬개골탈구
							</DefaultText>
						</div>
					</div>
					{showEditDogInfo &&
						<Button variant='outline' fullWidth size='sm'>반려견 상세 정보 수정</Button>
					}
				</Card>
			}
		</article>
	);
};

export default DogInfo;