'use client';
import * as styles from './HistoryList.css';
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import EmptyGif from '/public/images/healthNote/health-check/empty.gif';
import DefaultText from "@/components/common/defaultText/DefaultText";
import Button from "@/components/common/button/Button";
import CreateButton from "@/components/common/createButton/CreateButton";
import Card from "@/components/common/card/Card";
import Chips from "@/components/common/chips/Chips";
import { DIAGNOSIS_ITEM } from "@/constants";
import { useGetMedicalHistoryList } from "@/api/healthNote/medicalHistory/queries/useGetMedicalHistoryList";

interface HistoryListProps {
	petId: number;
}

export default function HistoryList ({ petId }: HistoryListProps) {
	const router = useRouter();
	const { data } = useGetMedicalHistoryList(petId);
	const isEmpty = useMemo(() => data.length < 1, [data.length]);

	return (
		<section className={styles.healthCheckListContainer}>
			{isEmpty ?
				<article className={styles.emptyBox}>
					<div className={styles.emptyTitle}>
						<Image src={EmptyGif} alt='empty' width={150} height={150} />
						<DefaultText type='label1' color='gray700' align='center'>아직 병원 진료 기록을<br/>등록하지 않았어요</DefaultText>
						<DefaultText type='body3' color='gray600'>우리 아이 병원 진료 내역을 기록해 보세요</DefaultText>
					</div>
					<Button 
						onClick={() => router.push(`/health-note/${petId}/medical-history/create`)}
						variant='solid'
					>
						병원 진료 기록 등록하기
					</Button>
				</article>
				: (
					<article>
						<CreateButton url={`/health-note/${petId}/medical-history/create`} text='병원 진료 기록 등록하기' />
						<div className={styles.healthCheckList}>
							{data.map(data => (
								<Link href={`/health-note/${petId}/medical-history/${data.diagnosisId}`} key={data.diagnosisId} >
									<Card
										shadow='light'
										padding={16}
										gap={12}
										align='start'
									>
										<div className={styles.healthCheckInfo}>
											<DefaultText type='label4' color='gray600'>{format(new Date(data.diagnosisDate), 'yyyy.MM.dd')}</DefaultText>
											<DefaultText type='headline2' color='gray800'>{data.hospitalName}</DefaultText>
										</div>
										<div className={styles.tagList}>
											{data.diagnosisItemList.map((tag, index) => (
												<Chips key={`${tag}${index}`} variant='solid' color='blue50' borderRadius='lg'>
													{DIAGNOSIS_ITEM[tag]}
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