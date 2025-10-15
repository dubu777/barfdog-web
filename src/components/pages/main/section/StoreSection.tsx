import { useRouter } from "next/navigation";
import Image from "next/image";
import { cardShadow } from "@/components/common/card/Card.css";
import { ellipsis } from "@/styles/common.css";
import { mainBox, mainStoreItem, mainStoreItemList } from "@/components/pages/main/common/MainCommon.css";
import MainContainer from "@/components/pages/main/layout/MainContainer";
import MainTitle from "@/components/pages/main/common/MainTitle";
import Button from "@/components/common/button/Button";
import Text from "@/components/common/text/Text";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MAIN_DATA } from "@/constants/main";
import { useGetInfiniteStoreItemList } from "@/api/store/queries/useGetInfiniteStoreItemList";

export default function StoreSection() {
	const router = useRouter();

	const { data } = useGetInfiniteStoreItemList('recent', 'RAW');
	const storeItemList = data?.pages?.flatMap((page) => page.itemList).filter(item => !!item.inStock) ?? [];

	const title = MAIN_DATA.STORE.title;
	const subTitle = MAIN_DATA.STORE.subTitle;
	const action = MAIN_DATA.STORE.action;

	return (
		<MainContainer>
			<MainTitle title={title} subTitle={subTitle} />
			<div className={mainStoreItemList}>
				<Swiper
					spaceBetween={14}
					slidesPerView='auto'
					className={mainBox}
				>
					{storeItemList.map(item => (
						<SwiperSlide
							key={item.id}
							className={mainStoreItem}
						>
							<Image src={item.displayThumbnailUrl.url} alt={item.name} width={120} height={120} style={{ borderRadius: '8px' }} className={cardShadow.normal} />
							<div>
								<Text type='label4' className={ellipsis({ lineSize: 'line1' })}>{item.name}</Text>
								<Text type='headline2'>{item.originalPrice.toLocaleString()}원</Text>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div className={mainBox}>
				<Button onClick={() => router.push(action.url)} variant={action.variant} fullWidth={action.fullWidth}>
					{action.label}
				</Button>
			</div>
		</MainContainer>
	);
};