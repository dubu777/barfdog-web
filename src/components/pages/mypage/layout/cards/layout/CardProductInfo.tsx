import { productAvatar, productInfoBox, productName } from "@/components/pages/mypage/layout/cards/Card.css";
import Image from "next/image";
import NoImage from "/public/images/icons/noImage.png";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface CardProductInfoProps {
	name: string;
	imageUrl: string;
	itemName?: string;
	imageSize?: number;
	price?: number;
}

const CardProductInfo = ({
	name,
	imageUrl,
	itemName,
	imageSize = 76,
	price,
}: CardProductInfoProps) => {
	return (
		<div className={productInfoBox}>
			<Image
				src={imageUrl || NoImage}
				alt={name}
				width={imageSize}
				height={imageSize}
				style={{ borderRadius: '8px' }}
				className={productAvatar}
			/>
			<div className={productName}>
				<DefaultText type='headline1'>{name}</DefaultText>
				<DefaultText type='caption'>
					식사용 24팩 4주간격 연간플랜적용<br/>
					{itemName || '스타터 프리미엄 & 프리미엄 비프'}
				</DefaultText>
				{price !== undefined &&
				<DefaultText type='label3'>{price.toLocaleString() || 0}원</DefaultText>
				}
			</div>
		</div>
	);
};

export default CardProductInfo;