'use client';
import * as styles from './HistoryDetail.css';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import MoreHorizIcon from "/public/images/icons/more_horiz.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Header from "@/components/layout/header/Header";
import useModal from "@/hooks/useModal";
import DefaultText from "@/components/common/defaultText/DefaultText";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import Card from "@/components/common/card/Card";
import ImageCarousel from "@/components/common/imageCarousel/ImageCarousel";
import Divider from "@/components/common/divider/Divider";
import ImagesModal from "@/components/common/modal/imagesModal/ImagesModal";
import HistoryEditModal from "@/components/pages/heathNote/healthCheckHistory/detail/historyEditModal/HistoryEditModal";
import HistoryControlBottomSheet
	from "@/components/pages/heathNote/healthCheckHistory/detail/historyControlBottomSheet/HistoryControlBottomSheet";
import { HEALTH_CHECK_HISTORY_TAG_MAP } from "@/constants";

const HistoryDetail = ({ historyId }: { historyId: number }) => {
	const router = useRouter();
	const data = {
		id: 150,
		date: '2025.03.17',
		hospitalName: '정 동물병원',
		testItems: ['blood_pressure_test', 'blood_pressure_check', 'hormone'],
		note: `슬개골 탈구가 의심됨.\n관련 검사 해보기\n\n초기 단계에서는 예방이 중요\n특이사항 상세보기의 경우 내용에 맞추어 높이 변경, `,
		imageList: [
			{ id: 222, url: "http://dev.barfdogserver.com/display/reviews?filename=e26c51ea-ac2d-4f32-b31d-2973b4ced9f5.jpeg", filename: 'file1' },
			{ id: 223, url: "http://dev.barfdogserver.com/display/reviews?filename=b9751c8e-a5b3-4148-9c85-811e6fd3760b.jpg", filename: 'file2' },
		],
	}

	const [defaultImageIndex, setDefaultImageIndex] = useState<number>(0);

	const { isOpen: isOpenControlBottomSheet, onClose: onCloseControlBottomSheet, onToggle: onToggleControlBottomSheet } = useModal();
	const { isOpen: isOpenConfirmDelete, onClose: onCloseConfirmDelete, onToggle: onToggleConfirmDelete  } = useModal();
	const { isOpen: isOpenEditModal, onClose: onCloseEditModal, onToggle: onToggleEditModal  } = useModal();
	const { isOpen: isOpenImageModal, onClose: onCloseImageModal, onToggle: onToggleImageModal  } = useModal();

	const handleThumbnailClick = (index: number) => {
		setDefaultImageIndex(index);
		onToggleImageModal();
	}

	const defaultInfo = [
		{ label: '병원', value: data.hospitalName },
		{ label: '검사일', value: format(new Date(data.date), 'yyyy.MM.dd (eee)', { locale: ko } )},
		{ label: '검사항목', value: data.testItems.map(tag => HEALTH_CHECK_HISTORY_TAG_MAP[tag]).join(', ') },
	]
	const infoList = [
		{
			title: '건강검진 정보',
			content: (
				<ul className={styles.defaultInfo}>
					{defaultInfo.map(info => (
						<li key={info.label} className={styles.defaultInfoItem}>
							<DefaultText className={styles.defaultInfoLabel} type='label4'>{info.label}</DefaultText>
							<DefaultText type='body3' color='gray800' align='right'>{info.value}</DefaultText>
						</li>
					))}
				</ul>
			),
			visible: true,
		},
		{
			title: '검사 및 결과 사진',
			content: (
				<ImageCarousel imageList={data.imageList} handleThumbnailClick={handleThumbnailClick} />
			),
			visible: data.imageList.length > 0,
		},
		{
			title: '특이사항',
			content: (
				<DefaultText type='body2' preLine>
					{data.note}
				</DefaultText>
			),
			visible: true,
		},
	]

	const handleDelete = () => {

	}

	return (
		<>
			<Header
				centerTitle='상세'
				showBackButton
				onBack={() => router.back()}
				rightElement={(
					<button className={styles.moreButton} onClick={onToggleControlBottomSheet}>
						<SvgIcon src={MoreHorizIcon} style={{ transform: 'rotate(90deg)' }} size={24} />
					</button>
				)}
			/>
			<section className={styles.historyDetailContainer}>
				{infoList.map(info => (
					info.visible &&
					<Card key={info.title} shadow='light' className={styles.historyDetailItem}>
						<DefaultText type='headline1'>{info.title}</DefaultText>
						<Divider thickness={2} color='gray900' />
						{info.content}
					</Card>
				))}
			</section>
			{isOpenControlBottomSheet &&
				<HistoryControlBottomSheet
					isOpen={isOpenControlBottomSheet}
					onClose={onCloseControlBottomSheet}
					handleEdit={onToggleEditModal}
					handleDelete={onToggleConfirmDelete}
				/>
			}
			{isOpenConfirmDelete &&
				<AlertModal
					title='건강 검진 내역을 삭제하시겠어요?'
					content='삭제한 건강 검진 내역은 복구되지 않아요'
					isOpen={isOpenConfirmDelete}
					onClose={onCloseConfirmDelete}
					cancelText='돌아가기'
					confirmText='삭제하기'
					onCancel={onCloseConfirmDelete}
					onConfirm={handleDelete}
				/>
			}
			{isOpenEditModal &&
				<HistoryEditModal data={data} isOpen={isOpenEditModal} onClose={onCloseEditModal} />
			}
			{isOpenImageModal &&
				<ImagesModal
					isOpen={isOpenImageModal}
					onClose={onCloseImageModal}
					defaultImageIndex={defaultImageIndex}
					imageList={data.imageList}
				/>
			}
		</>
	);
};

export default HistoryDetail;