import Image from "next/image";
import * as styles from './RecommendItems.css';
import { ellipsis } from "@/styles/common.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import DefaultText from "@/components/common/defaultText/DefaultText";
import { useGetStoreItemList } from "@/api/store/queries/useGetStoreItemList";

const RecommendItems = () => {
	const { data: storeItemList } = useGetStoreItemList(0, 'recent', 'TOPPING', 100);
	const recommendItems = storeItemList.itemList.filter(item => !item.name.includes('대용량'))
	return (
		<div className={styles.recommendItemsContainer}>
			<div className={styles.recommendItemsTitle}>
				<DefaultText type='title4'>이런 상품은 어떠세요?</DefaultText>
				<DefaultText type='label4' color='gray600' className={styles.recommendItemsSubTitle}>
					반려견을 위한 일반 배송 상품도 있어요 :)
				</DefaultText>
			</div>
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
	);
};

export default RecommendItems;