'use client';
import * as styles from './GutCheckList.css';
import { useRouter } from "next/navigation";
import InfoIcon from '/public/images/icons/info.svg';
import DefaultText from "@/components/common/defaultText/DefaultText";
import Chips from "@/components/common/chips/Chips";
import Button from "@/components/common/button/Button";
import CreateButton from "@/components/common/createButton/CreateButton";
import Card from "@/components/common/card/Card";
import useModal from "@/hooks/useModal";
import KitGuideModal from "@/components/pages/heathNote/gutCheck/modal/KitGuideModal";

const GUT_CHECK_STATUS = {
	REQUEST_DONE: '회수신청',
	REQUEST_READY: '문진 작성완료',
}

const GutCheckList = () => {
	const router = useRouter();
	const { isOpen: isOpenKitGuideModal, onClose: onCloseKitGuideModal, onToggle: onToggleKitGuideModal } = useModal();
	const isEmpty = false;
	const dummyData =
		// [];
		[
		{
			id: 150,
			createdDate: '2025.03.17',
			name: '바푸동',
			status: 'REQUEST_DONE',
		},
		{
			id: 149,
			createdDate: '2025.03.05',
			name: '바푸푸',
			status: 'REQUEST_READY',
		},
	]

	return (
		<>
			<section className={styles.gutCheckListContainer}>
				<div className={styles.gutCheckListTitle}>
					<DefaultText type='title3'>진단 키트를 수령한 후<br/>사전 문진을 작성해 주세요</DefaultText>
					<Button
						iconSrc={InfoIcon}
						size='sm'
						iconColor='gray700'
						iconPosition='left'
						variant='outline'
						type='assistive'
						className={styles.kitGuideButton}
						onClick={onToggleKitGuideModal}
					>
						키트 안내
					</Button>
				</div>
				<CreateButton url='/health-note/gut-check/create' text='사전 문진 작성하기' />
				<article className={styles.gutCheckList}>
					{dummyData.length > 0 ?
						dummyData.map(data => (
							<Card
								key={data.id}
								shadow='strong'
								gap={12}
								padding={12}
								align='start'
							>
								<div className={styles.gutCheckCardItem}>
									<Chips variant='outlined' color='red' borderRadius='lg'>
										{GUT_CHECK_STATUS[data.status]}
									</Chips>
									<DefaultText type='body3' color='gray600'>{data.createdDate}</DefaultText>
								</div>
								<DefaultText type='title4'>{data.name}</DefaultText>
								<div className={styles.gutCheckCardItem}>
									<Button
										variant='outline'
										type='assistive'
										fullWidth
										disabled={data.status === 'REQUEST_DONE'}
										onClick={() => router.push(`/health-note/gut-check/return-request/${data.id}`)}
									>
										회수 신청 {data.status === 'REQUEST_DONE' && '완료'}
									</Button>
									<Button variant='outline' fullWidth>
										상세보기
									</Button>
								</div>
							</Card>
						)) : (
							<Card
								shadow='strong'
								className={styles.gutCheckEmpty}
								gap={4}
							>
								<DefaultText type='label1' color='gray700'>문진을 작성한 기록이 없어요</DefaultText>
								<DefaultText type='body3' color='gray600'>사전 문진을 작성해야 회수 신청을 할 수 있어요</DefaultText>
							</Card>
						)
					}
				</article>
			</section>
			{isOpenKitGuideModal &&
				<KitGuideModal isOpen={isOpenKitGuideModal} onClose={onCloseKitGuideModal} />
			}
		</>
	);
};

export default GutCheckList;