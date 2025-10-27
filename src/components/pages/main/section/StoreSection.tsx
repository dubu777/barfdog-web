import { useRouter } from "next/navigation";
import Image from "next/image";
import { cardShadow } from "@/components/common/card/Card.css";
import { commonWrapper, ellipsis, pointColor } from "@/styles/common.css";
import { mainBox, mainStoreItem, mainStoreItemLink } from "@/components/pages/main/common/MainCommon.css";
import MainContainer from "@/components/pages/main/layout/MainContainer";
import MainTitle from "@/components/pages/main/common/MainTitle";
import Button from "@/components/common/button/Button";
import Text from "@/components/common/text/Text";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { MAIN_DATA } from "@/constants/main";
import { useGetStoreItemList } from "@/api/store/queries/useGetStoreItemList";
import { getItemViewProps } from "@/utils/store/getItemViewProps";
import { DISCOUNT_UNIT } from "@/constants";
import Link from "next/link";

export default function StoreSection() {
	const router = useRouter();

	const { data } = useGetStoreItemList('recent', 'RAW');
	const storeItemList = data?.itemList.filter(item => !!item.inStock) ?? [];

	const title = MAIN_DATA.STORE.title;
	const subTitle = MAIN_DATA.STORE.subTitle;
	const action = MAIN_DATA.STORE.action;

	if (!data) return null;
	return (
		<MainContainer>
			<MainTitle title={title} subTitle={subTitle} />
			<Swiper
				slidesPerView='auto'
				spaceBetween={14}
				freeMode
				modules={[ FreeMode ]}
				className={mainBox}
			>
				{storeItemList.map(item => {
					const {
						isDiscounted,
						formattedSalePrice,
						discountRate,
					} = getItemViewProps(item);
					return (
						<SwiperSlide
							key={item.id}
							className={mainStoreItem}
						>
							<Link href={`/store/${item.id}`} className={mainStoreItemLink}>
								<Image 
									src={item.displayThumbnailUrl.url} 
									alt={item.name} 
									width={120} 
									height={120} 
									style={{ borderRadius: '8px' }} 
									className={cardShadow.normal} 
								/>
								<div>
									<Text type='label4' className={ellipsis({ lineSize: 'line1' })}>{item.name}</Text>
									<Text type='headline2' className={commonWrapper({ gap: 4, justify: 'start' })}>
										{isDiscounted && (
											<span className={pointColor}>
												{discountRate}{DISCOUNT_UNIT.FIXED_RATE}
											</span>
										)}
										<span>{formattedSalePrice}</span>
									</Text>
								</div>
							</Link>
						</SwiperSlide>
					)
				})}
			</Swiper>
			<div className={mainBox}>
				<Button onClick={() => router.push(action.url)} variant={action.variant} fullWidth={action.fullWidth}>
					{action.label}
				</Button>
			</div>
		</MainContainer>
	);
};