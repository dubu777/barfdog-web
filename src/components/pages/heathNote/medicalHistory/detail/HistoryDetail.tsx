'use client';
import * as styles from './HistoryDetail.css';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
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
import HistoryEditModal from "@/components/pages/heathNote/medicalHistory/detail/historyEditModal/HistoryEditModal";
import HistoryControlBottomSheet
	from "@/components/pages/heathNote/medicalHistory/detail/historyControlBottomSheet/HistoryControlBottomSheet";
import { useToastStore } from "@/store/useToastStore";
import { DIAGNOSIS_ITEM, queryKeys } from "@/constants";
import { useGetMedicalHistoryDetail } from "@/api/healthNote/medicalHistory/queries/useGetMedicalHistoryDetail";
import { useDeleteMedicalHistory } from "@/api/healthNote/medicalHistory/mutations/useDeleteMedicalHistory";
import { useImageModal } from '@/hooks/useImageModal';

interface HistoryDetailProps {
	diagnosisId: number;
	petId: number;
}

export default function HistoryDetail ({
	diagnosisId,
	petId,
}: HistoryDetailProps) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { addToast } = useToastStore();
	
	const { data } = useGetMedicalHistoryDetail(diagnosisId);
	const { mutate } = useDeleteMedicalHistory();

	const { isOpen: isOpenControlBottomSheet, onClose: onCloseControlBottomSheet, onToggle: onToggleControlBottomSheet } = useModal();
	const { isOpen: isOpenConfirmDelete, onClose: onCloseConfirmDelete, onToggle: onToggleConfirmDelete  } = useModal();
	const { isOpen: isOpenEditModal, onClose: onCloseEditModal, onToggle: onToggleEditModal  } = useModal();

	const {
    isOpen: isOpenImageModal,
    onClose: onCloseImageModal,
    handleThumbnailClick,
    defaultImageIndex,
  } = useImageModal();

	const defaultInfo = [
		{ label: '병원', value: data.diagnosisInfo.hospitalName },
		{ label: '검사일', value: format(new Date(data.diagnosisInfo.diagnosisDate), 'yyyy.MM.dd (eee)', { locale: ko } )},
		{ label: '검사항목', value: data.diagnosisInfo.diagnosisItemList.map(tag => DIAGNOSIS_ITEM[tag]).join(', ') },
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
				<ImageCarousel imageList={data.diagnosisFileList} handleThumbnailClick={handleThumbnailClick} />
			),
			visible: data.diagnosisFileList.length > 0,
		},
		{
			title: '특이사항',
			content: (
				<DefaultText type='body2' preLine>
					{data.diagnosisInfo.note}
				</DefaultText>
			),
			visible: data.diagnosisInfo.note,
		},
	]

	const handleDelete = () => {
		mutate({
			diagnosisId,
		}, {
			onSuccess: async (data) => {
				console.log(data)
				addToast("병원 진료 기록이 삭제되었습니다.");
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.MEDICAL_HISTORY.BASE, queryKeys.MEDICAL_HISTORY.GET_MEDICAL_HISTORY_LIST],
				})
				router.push(`/health-note/medical-history?petId=${petId}`)
			},
			onError: (error) => {
				if(axios.isAxiosError(error)) {
					addToast(error.message, 'above-button');
				}
				console.log(error);
			}
		})
	}

	return (
		<>
			<Header
				centerTitle='상세'
				showBackButton
				onBack={() => router.push(`/health-note/medical-history?petId=${petId}`)}
				rightElement={(
					<button className={styles.moreButton} onClick={onToggleControlBottomSheet}>
						<SvgIcon src={MoreHorizIcon} style={{ transform: 'rotate(90deg)' }} size={24} />
					</button>
				)}
			/>
			<section className={styles.historyDetailContainer}>
				{infoList.map(info => (
					info.visible &&
					<Card
						key={info.title}
						shadow='light'
						padding='20/16'
						gap={12}
						borderRadius={16}
						align='start'
					>
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
					title='병원 진료 기록을 삭제하시겠어요?'
					content='삭제한 병원 진료 기록은 복구되지 않아요'
					isOpen={isOpenConfirmDelete}
					onClose={onCloseConfirmDelete}
					cancelText='돌아가기'
					confirmText='삭제하기'
					onCancel={onCloseConfirmDelete}
					onConfirm={handleDelete}
				/>
			}
			{isOpenEditModal &&
				<HistoryEditModal
					diagnosisId={diagnosisId}
					data={{
						...data.diagnosisInfo,
						petId: petId,
						fileChangeInfo: {
							addFileIdList: [],
							deleteFileIdList: [],
						}
					}}
					initialFiles={data.diagnosisFileList}
					isOpen={isOpenEditModal}
					onClose={onCloseEditModal}
				/>
			}
			{isOpenImageModal &&
				<ImagesModal
					isOpen={isOpenImageModal}
					onClose={onCloseImageModal}
					defaultImageIndex={defaultImageIndex}
					imageList={data.diagnosisFileList}
				/>
			}
		</>
	);
};