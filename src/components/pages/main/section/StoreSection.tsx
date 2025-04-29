import { useRouter } from "next/navigation";
import Image from "next/image";
import { cardShadow } from "@/components/common/card/Card.css";
import { ellipsis } from "@/styles/common.css";
import { mainBox, mainStoreItem, mainStoreItemList } from "@/components/pages/main/common/MainCommon.css";
import MainContainer from "@/components/pages/main/layout/MainContainer";
import MainTitle from "@/components/pages/main/common/MainTitle";
import Button from "@/components/common/button/Button";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MAIN_DATA } from "@/constants/main";
import { useGetStoreItemList } from "@/api/store/queries/useGetStoreItemList";

const StoreSection = () => {
	const { data } = useGetStoreItemList(0, 'recent', 'ALL', 6);
	const router = useRouter();
	const title = MAIN_DATA.STORE.title;
	const subTitle = MAIN_DATA.STORE.subTitle;
	const action = MAIN_DATA.STORE.action;
	const storeItemList = data.itemList.filter(item => !!item.inStock);

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
							<Image src={item.thumbnailUrl} alt={item.name} width={120} height={120} style={{ borderRadius: '8px' }} className={cardShadow.normal} />
							<div>
								<DefaultText type='label4' className={ellipsis({ lineSize: 'line1' })}>{item.name}</DefaultText>
								<DefaultText type='headline2'>{item.originalPrice.toLocaleString()}원</DefaultText>
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

export default StoreSection;