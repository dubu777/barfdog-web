import * as styles from "../Information.css";
import { ellipsis } from "@/styles/common.css";
import { useState } from "react";
import InfoTitleButton from "@/components/pages/mypage/layout/infomation/layout/InfoTitleButton";
import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Button from "@/components/common/button/Button";
import Image from "next/image";
import SampleDog1 from '/public/images/myPage/sample/sample1.jpg'

interface PetInfoProps {
	data: any;
	isDefaultOpen?: boolean;
}

const PetInfo = ({
	data,
	isDefaultOpen = true,
}: PetInfoProps) => {
	const [isOpen, setIsOpen] = useState(isDefaultOpen);

	return (
		<article className={styles.infoContainer({ isOpen })}>
			<InfoTitleButton
				title='반려견 정보'
				subTitleRight='크리스토퍼 왕멍멍이'
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
			{isOpen &&
				<Card shadow='none' padding={12} className={styles.infoDetailContainer}>
					<div className={`${styles.infoItem} ${styles.infoSubTitle}`}>
						<DefaultText type="headline2">크리스토퍼 왕멍멍이</DefaultText>
					</div>
					<div className={styles.petInfo}>
						<Image src={SampleDog1} alt='크리스토퍼 왕멍멍이' width={76} height={76} className={styles.petImage} />
						<div className={styles.petInfoText}>
							<DefaultText type='headline1'>크리스토퍼 왕멍멍이</DefaultText>
							<DefaultText type='caption' color='gray600' className={ellipsis({ lineSize: 'line1' })}>
								3살 3.7kg 수컷 소형견 말티푸
							</DefaultText>
							<DefaultText type='caption' color='gray600' className={ellipsis({ lineSize: 'line1' })}>
								건강고민: 관절염 피부염 슬개골탈구
							</DefaultText>
						</div>
					</div>
					<Button variant='outline' fullWidth>반려견 상세 정보 수정</Button>
				</Card>
			}
		</article>
	);
};

export default PetInfo;