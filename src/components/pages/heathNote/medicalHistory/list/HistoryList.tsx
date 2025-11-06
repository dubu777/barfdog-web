'use client';
import { commonWrapper } from '@/styles/common.css';
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import EmptyGif from '/public/images/healthNote/health-check/empty.gif';
import Text from "@/components/ui/text/Text";
import Button from "@/components/ui/button/Button";
import CreateButton from "@/components/ui/createButton/CreateButton";
import Card from "@/components/ui/card/Card";
import Chips from "@/components/ui/chips/Chips";
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
		<section className={commonWrapper({ padding: 20 })}>
			{!isEmpty ?
				<article className={commonWrapper({
					direction: 'col',
					gap: 20,
					padding: 20,
					paddingTop: 60,
				})}>
					<div className={commonWrapper({ direction: 'col', gap:4 })}>
						<Image src={EmptyGif} alt='empty' width={150} height={150} />
						<Text type='label1' color='gray700' align='center'>아직 병원 진료 기록을<br/>등록하지 않았어요</Text>
						<Text type='body3' color='gray600'>우리 아이 병원 진료 내역을 기록해 보세요</Text>
					</div>
					<Button 
						onClick={() => router.push(`/health-note/${petId}/medical-history/create`)}
						variant='solid'
					>
						병원 진료 기록 등록하기
					</Button>
				</article>
				: (
					<article className={commonWrapper({ direction: 'col', align: 'center', gap: 20 })}>
						<CreateButton url={`/health-note/${petId}/medical-history/create`} text='병원 진료 기록 등록하기' />
						<div className={commonWrapper({
							direction: 'col',
							gap: 8,
							align: 'start',
						})}>
							{data.map(data => (
								<Link
									key={data.diagnosisId} 
									href={`/health-note/${petId}/medical-history/${data.diagnosisId}`} 
									className={commonWrapper({})}
								>
									<Card
										shadow='light'
										padding={16}
										gap={12}
										align='start'
									>
										<div className={commonWrapper({ direction: 'col', gap: 8, align: 'start' })}>
											<Text type='label4' color='gray600'>{format(new Date(data.diagnosisDate), 'yyyy.MM.dd')}</Text>
											<Text type='headline2' color='gray800'>{data.hospitalName}</Text>
										</div>
										<div className={commonWrapper({ wrap: 'wrap', justify: 'start', gap: 4 })}>
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