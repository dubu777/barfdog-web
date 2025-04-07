import { useState } from "react";
import { usePathname } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import * as styles from '../Card.css';
import { ellipsis } from "@/styles/common.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import RateStar from "@/components/common/rateStar/RateStar";
import Button from "@/components/common/button/Button";
import CardSection from "@/components/pages/mypage/common/cards/layout/CardSection";
import { REVIEW_STATUS } from "@/constants";
import { CreateReviewDetail, ReviewDetailItem, ReviewFormData, UpdateReviewDetail, WritableReviewItem } from "@/types";
import { usePersistReviewStore } from "@/store/usePersistReviewStore";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { UseFormSetValue } from "react-hook-form";

interface ReviewCardsProps {
	reviewDetail?: ReviewDetailItem | WritableReviewItem | CreateReviewDetail | UpdateReviewDetail | ReviewFormData;
	setValue?: UseFormSetValue<UpdateReviewDetail | CreateReviewDetail>;
	isWritableReview?: boolean;
	isEditable?: boolean;
	isReviewDetail?: boolean;
	formData?: CreateReviewDetail | UpdateReviewDetail;
}

const ReviewCard = ({
	reviewDetail,
	formData,
	setValue,
	isWritableReview = false,
	isEditable = false,
	isReviewDetail = false,
}: ReviewCardsProps) => {
	const pathname = usePathname();
	const { pushWithQuery } = useDynamicQueryPush();
	const { reviewFormData, setReviewFormData } = usePersistReviewStore();

	const [dummyData, setDummyData] = useState({
		orderStatus: 'CONFIRM',
		orderedDate: '2025-02-15',
		// 승인, 승인대기, 승인완료, 반려
		status: '승인',
		star: 3,
		dogName: '크리스토퍼 왕멍멍이',
		orderPrice: 272400,
		plan: '식사용 24팩 4주간격 연간플랜적용',
		recipe: '스타터 프리미엄 & 프리미엄 비프',
		reviewType: 'SUBSCRIBE',
		tip: '뛰어 노는 것을 좋아하는 우리 아이의 관절 건강, 미리 챙겨주세요! 관절에 좋은 커큐민이 듬뿍 담긴 유기농 강황을 사용하여 만들어진 큐브입니다. 실온에서도 금방 녹으니 꼭 냉동보관 해주시고 생식 위에 토핑으로 간편하게 급여해보세요 :)',
		recipeName: '스타터프리미엄+, 프리미엄 비프+',
		option: '1개 옵션 2건',
	})

	// 타입 형식 맞춰야함 (해당 페이지에 맞는 데이터 status 등)
	const cardData = reviewDetail ? isReviewDetail ? {...reviewDetail, ...reviewFormData} : reviewDetail : dummyData;
	const generalItemType = 'reviewType' in cardData && cardData.reviewType === 'ITEM';

	// const itemName = generalItemType ? cardData.title : cardData.dogName;
	const itemName = cardData.title;
	const orderPrice = `${cardData?.orderPrice ? cardData?.orderPrice?.toLocaleString() : cardData?.orderPaymentPrice?.toLocaleString() || 0}원`;
	const imageUrl = isWritableReview ? cardData.imageUrl : cardData.thumbnailUrl ? cardData.thumbnailUrl : cardData.imageUrl;
	const orderType = generalItemType ? '일반배송' : '정기배송 N회차';
	const orderStatus = isWritableReview ? '구매확정' : '리뷰완료';
	const reviewStatus = isWritableReview ? `구매 확정일 ${cardData?.orderedDate ? format(cardData?.orderedDate, 'yyyy. MM. dd'): ''}` : REVIEW_STATUS[cardData.status];
	const reviewStarColor = cardData.orderStatus === 'CONFIRM' ? 'gray' : undefined;
	const subInfoItemDetail = generalItemType
		? cardData.tip || 'TEST 뛰어 노는 것을 좋아하는 우리 아이의 관절 건강, 미리 챙겨주세요! 관절에 좋은 커큐민이 듬뿍 담긴 유기농 강황을 사용하여 만들어진 큐브입니다. 실온에서도 금방 녹으니 꼭 냉동보관 해주시고 생식 위에 토핑으로 간편하게 급여해보세요 :)'
		: cardData.plan || 'TEST 식사용 24팩 4주간격 연간플랜적용';
	const subInfoItemCount = generalItemType
		? cardData.option || 'TEST 1개 옵션 2건'
		: cardData.recipeName || 'TEST 스타터프리미엄+, 프리미엄 비프+';

	const handleCreateOrDetail = () => {
		setReviewFormData(reviewDetail);
		if (isWritableReview) {
			pushWithQuery(`${pathname}/create`, {}, ['tab', 'page']);
		} else {
			pushWithQuery(`${pathname}/${reviewDetail.id}`, { reviewType: reviewDetail.reviewType }, ['tab']);
		}
	}

	return (
		<CardSection shadow='none' borderRadius='none' padding={20}>
			<div className={styles.productInfoBox}>
				<DefaultText type='label4'>{orderType} {orderStatus}</DefaultText>
				<DefaultText type='caption' color='gray600'>{reviewStatus}</DefaultText>
			</div>
			<div className={styles.productInfoBox}>
				{imageUrl
					? <Image src={imageUrl} alt={itemName} width={76} height={76} className={styles.productAvatar} />
					: <div className={styles.productAvatar} />
				}
				<div className={styles.productName}>
					<DefaultText type='label3'>{itemName}</DefaultText>
					<DefaultText type='caption' color='gray600'>
						<span className={ellipsis({ lineSize: 'line2' })}>{subInfoItemDetail}<br/></span>
						{subInfoItemCount}
					</DefaultText>
					<DefaultText type='label3'>{orderPrice}</DefaultText>
				</div>
			</div>
			<div>
				<RateStar
					rateLength={5}
					value={isEditable ? formData?.star ?? 0 : cardData.star ?? 0}
					color={reviewStarColor}
					onChange={isEditable && !!formData ? (value) => setValue('star', value) : undefined}
				/>
			</div>
			{!isReviewDetail &&
			<div className={styles.reviewCardActions}>
				<Button
					onClick={() => pushWithQuery(
						`/mypage/order-delivery-inquiry/${cardData.orderId}`,
						{ orderType: generalItemType ? 'general' : 'subscription' }
					)}
					variant='outline'
					type='assistive'
					fullWidth
					size='sm'
				>
					주문상세
				</Button>
				<Button onClick={handleCreateOrDetail} fullWidth size='sm'>{isWritableReview ? '리뷰작성' : '리뷰상세'}</Button>
			</div>
			}
		</CardSection>
	);
};

export default ReviewCard;