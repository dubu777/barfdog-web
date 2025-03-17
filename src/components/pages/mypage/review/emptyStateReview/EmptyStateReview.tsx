'use client';
import * as styles from './EmptyStateReview.css';
import { ellipsis } from "@/styles/common.css";
import Image from "next/image";
import EmptyStateCard from "@/components/pages/mypage/layout/cards/emptyStateCard/EmptyStateCard";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useGetStoreItemList } from "@/api/store/queries/useGetStoreItemList";

interface EmptyStateReviewProps {
	hasOrderHistory?: boolean;
	isWrittenReview?: boolean;
}
const EmptyStateReview = ({ hasOrderHistory = false, isWrittenReview = false }: EmptyStateReviewProps) => {
	const { data: storeItemList } = useGetStoreItemList(0, 'recent', 'TOPPING', 100);
	const recommendItems = storeItemList.itemList.filter(item => !item.name.includes('대용량'))
	return (
		<>
			{!isWrittenReview
				? <EmptyStateCard type={hasOrderHistory ? 'review' : 'orderTracking'} />
				: <div className={styles.emptyText}>
						<DefaultText type='label1' color='gray700' align='center'>아직 작성하신 리뷰가 없어요!</DefaultText>
						<DefaultText type='body3' color='gray600' align='center'>작성 가능한 리뷰를 확인해보세요</DefaultText>
				</div>
			}
			{!hasOrderHistory &&
			<div className={styles.recommendItemsContainer}>
				<DefaultText type='title4'>이런 상품은 어떠세요?</DefaultText>
				<DefaultText type='label4' color='gray600' className={styles.recommendItemsSubTitle}>
					반려견을 위한 일반 배송 상품도 있어요 :)
				</DefaultText>
				<Swiper
					slidesPerView='auto'
					spaceBetween={14}
				>
					{recommendItems.map(item => (
						<SwiperSlide key={item.id} className={styles.recommendItems}>
							<Image src={item.thumbnailUrl} alt={item.name} width={120} height={120} className={styles.recommendItemImage} />
							<DefaultText type='label4' color='gray800' className={ellipsis({ lineSize: 'line1' })}>{item.name}</DefaultText>
							<DefaultText type='headline2' color='gray800'>{item.originalPrice.toLocaleString()}원</DefaultText>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			}
		</>
	);
};

export default EmptyStateReview;