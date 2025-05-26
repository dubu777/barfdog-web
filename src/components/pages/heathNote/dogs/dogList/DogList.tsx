'use client';
import * as styles from './DogList.css';
import { dogImage } from "@/components/pages/heathNote/common/HealthNoteCommon.css";
import Link from "next/link";
import Image from "next/image";
import FemaleIcon from '/public/images/healthNote/female.svg';
import MaleIcon from '/public/images/healthNote/male.svg';
import PenIcon from '/public/images/healthNote/pen.svg';
import DogIcon from '/public/images/healthNote/dogIcon.png';
import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Chips from "@/components/common/chips/Chips";
import CreateDogButton from "@/components/pages/heathNote/common/createDogButton/CreateDogButton";
import { DOG_GENDER } from "@/constants/dog";
import { useGetFullDogList } from "@/api/dog/queries/useGetFullDogList";

function formatAgeFromBirth(birth: string): string {
	if (!/^\d{6}$/.test(birth)) {
		return "유효하지 않은 생년월 입력";
	}

	const birthYear = parseInt(birth.slice(0, 4), 10);
	const birthMonth = parseInt(birth.slice(4, 6), 10);

	const now = new Date();
	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth() + 1;

	let years = currentYear - birthYear;
	let months = currentMonth - birthMonth;

	if (months < 0) {
		years -= 1;
		months += 12;
	}

	if (months === 0) return `${years}년`;
	if (years === 0) return `${months}개월`;

	return `${years}년 ${months}개월`;
}

const DogList = () => {
	const { data: dogList } = useGetFullDogList();

	return (
		<section>
			<article className={styles.createDogButton}>
				<CreateDogButton />
			</article>
			<article>
				<div className={styles.dogList}>
					{dogList.map(dog => {
						return (
							<Card key={dog.id} shadow='strong' padding={12}  className={styles.dogCard}>
								<Image src={dog.pictureUrl || DogIcon} alt={dog.name} width={76} height={76} className={dogImage({ borderRadius: 'md' })} />
								<div className={styles.dogInfo}>
									<div className={styles.dogInfoTop}>
										<div className={styles.dogName}>
											<DefaultText type='headline1'>
												{dog.name}
											</DefaultText>
											{dog.subscribeStatus === 'SUBSCRIBING' &&
											<Chips variant='solid' color='gray800' borderRadius='lg'>구독중</Chips>
											}
										</div>
										<Link href={`/health-note/dogs/${dog.id}`}>
											<SvgIcon src={PenIcon} size={32} />
										</Link>
									</div>
									<DefaultText type='body3' color='gray600' className={styles.dogType}>
										<SvgIcon src={dog.gender === 'FEMALE' ? FemaleIcon : MaleIcon} size={18} />
										{dog.dogType}
									</DefaultText>
									<DefaultText type='body3' color='gray600'>
										{DOG_GENDER[dog.gender]} | {formatAgeFromBirth(dog.birth)} | {dog.weight}kg
									</DefaultText>
								</div>
							</Card>
						)
					})}
				</div>
			</article>
		</section>
	);
};

export default DogList;