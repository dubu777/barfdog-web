'use client';
import * as styles from './HistoryList.css';
import Link from "next/link";
import EmptyGif from '/public/images/healthNote/health-check/empty.gif';
import Image from "next/image";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Button from "@/components/common/button/Button";
import CreateButton from "@/components/common/createButton/CreateButton";
import Card from "@/components/common/card/Card";
import Chips from "@/components/common/chips/Chips";
import { HEALTH_CHECK_HISTORY_TAG_MAP } from "@/constants";

const HistoryList = () => {
	const isEmpty = false;
	const dummyData = [
		{
			id: 150,
			createdDate: '2025.03.17',
			hospitalName: '정 동물병원',
			tags: ['blood_pressure_test', 'blood_pressure_check', 'hormone', 'blood_pressure_test', 'blood_pressure_check', 'hormone', 'blood_pressure_test', 'blood_pressure_check', 'hormone'],
		},
		{
			id: 142,
			createdDate: '2025.02.01',
			hospitalName: '망원 동물병원',
			tags: ['urine_stool', 'physical'],
		},
		{
			id: 132,
			createdDate: '2024.12.21',
			hospitalName: '정 동물병원',
			tags: ['comprehensive'],
		},
	]

	return (
		<section className={styles.healthCheckListContainer}>
			{isEmpty ?
				<article className={styles.emptyBox}>
					<div className={styles.emptyTitle}>
						<Image src={EmptyGif} alt='empty' width={150} height={150} />
						<DefaultText type='label1' color='gray700' align='center'>아직 건강검진 내역을<br/>등록하지 않았어요</DefaultText>
						<DefaultText type='body3' color='gray600'>우리 아이 건강 검진 내역을 기록해 보세요</DefaultText>
					</div>
					<Button variant='solid'>건강검진 내역 등록하기</Button>
				</article>
				: (
					<article>
						<CreateButton url='/health-note/health-check-history/create' text='건강검진 내역 등록하기' />
						<div className={styles.healthCheckList}>
							{dummyData.map(data => (
								<Link href={`/health-note/health-check-history/${data.id}`} key={data.id} >
									<Card
										shadow='light'
										padding={16}
										gap={12}
										align='start'
									>
										<div className={styles.healthCheckInfo}>
											<DefaultText type='label4' color='gray600'>{data.createdDate}</DefaultText>
											<DefaultText type='headline2' color='gray800'>{data.hospitalName}</DefaultText>
										</div>
										<div className={styles.tagList}>
											{data.tags.map((tag, index) => (
												<Chips key={`${tag}${index}`} variant='solid' color='blue50' borderRadius='lg'>
													{HEALTH_CHECK_HISTORY_TAG_MAP[tag]}
												</Chips>
											))}
										</div>
									</Card>
								</Link>
							))}
						</div>
					</article>
				)
			}
		</section>
	);
};

export default HistoryList;