import { commonWrapper } from "@/styles/common.css";
import BottomSheet from "@/components/ui/bottomSheet/BottomSheet";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import Text from "@/components/ui/text/Text";
import InfoText from "@/components/ui/typography/infoText/InfoText";

interface ReviewNoticeBottomSheetProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ReviewNoticeBottomSheet({
	isOpen,
	onClose,
}: ReviewNoticeBottomSheetProps) {
	const infoList = [
		{
			title: '리뷰 등록 및 노출',
			descriptions: [
				'작성한 리뷰는 최초에 승인대기 상태로 등록되며, 검토가 완료될 때까지 서비스 내에 노출되지 않습니다.',
				'관리자가 리뷰를 승인한 경우에만 노출되며, 반려된 리뷰는 노출되지 않습니다.',
			]
		},
		{
			title: '적립금 지급 조건',
			descriptions: [
				'리뷰가 승인 완료된 경우에만 적립금이 지급됩니다.',
				'리뷰 작성 시 텍스트 리뷰는 300원 / 사진 리뷰는 500원, 최대 800원이 지급됩니다.',
			]
		},
		{
			title: '리뷰 수정 및 삭제',
			descriptions: [
				'승인 또는 반려된 리뷰를 수정하면 다시 승인대기 상태로 전환되며, 재검토 후 승인 시 노출됩니다.',
				'등록된 리뷰는 사용자가 직접 삭제할 수 없으며, 부득이한 경우 채널톡을 통해 문의해 주셔야 합니다.'
			]
		},
		{
			title: '리뷰 반려 및 삭제',
			subTitle: '아래와 같은 경우에는 리뷰가 반려되거나 삭제될 수 있습니다.',
			descriptions: [
				'바프독 서비스와 관련 없는 사진 또는 내용 작성',
				'기호·문자의 단순 나열, 의미 없는 반복',
				'개인정보, 광고, 비속어 등 부적절한 표현 포함',
				'타인의 사진을 도용하거나 저작권을 침해한 경우',
			]
		},
	]
	return (
		<BottomSheet
			isOpen={isOpen}
			onClose={onClose}
			title='리뷰 작성시 유의사항'
		>
			<div
				className={commonWrapper({
					padding: 20,
					paddingTop: 0,
					direction: 'col',
					gap: 24,
					align: 'start',
				})}
			>
				{infoList.map(info => (
					<div key={info.title} className={commonWrapper({ direction: 'col', gap: 4, align: 'start' })}>
						<Text type='label4' color='gray800'>{info.title}</Text>
						{info.subTitle &&
							<Text type='caption' color='gray700'>{info.subTitle}</Text>
						}
						{info.descriptions.map(text => (
							<InfoText key={text} text={text} type='caption' />
						))}
					</div>
				))}
			</div>
			<ButtonDocked
				type='full-button'
				primaryButtonLabel='확인'
				onPrimaryClick={onClose}
				position='sticky'
			/>
		</BottomSheet>
	);
}