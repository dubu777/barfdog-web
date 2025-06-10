import { ellipsis } from "@/styles/common.css";
import { divider, productAvatar, productInfoBox, productName } from "@/components/pages/mypage/common/cards/Card.css";
import Image from "next/image";
import NoImage from "/public/images/icons/noImage.png";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { PlanInfo } from "@/types";
import { numberOfPacksPerDay } from "@/constants";

interface CardProductInfoProps {
	name: string;
	imageUrl: string;
	itemName?: string;
	amount?: number;
	optionNames?: string;
	imageSize?: number;
	price?: number;
	planInfo?: PlanInfo;
}

const CardProductInfo = ({
	name,
	imageUrl,
	itemName,
	imageSize = 76,
	price,
	planInfo,
	amount,
	optionNames,
}: CardProductInfoProps) => {
	return (
		<div className={productInfoBox}>
			<Image
				src={imageUrl?.replace(/\s+/g, '') || NoImage}
				alt={name}
				width={imageSize}
				height={imageSize}
				style={{ borderRadius: '8px' }}
				className={productAvatar}
			/>
			<div className={productName}>
				<DefaultText type='headline2'>{name}</DefaultText>
				<div>
					{planInfo &&
						<DefaultText type='caption' style={{ display: 'flex', alignItems: 'center' }}>
							{numberOfPacksPerDay[planInfo.numberOfPacksPerDay]}<span className={divider}/>
							{planInfo.weeklyPaymentCycle}주<span className={divider}/>
							{planInfo.totalNumberOfPacks}팩
							{/* {planInfo.options &&
								<><span className={divider}/>추가-건<br/></>
							} */}
						</DefaultText>
					}
					{itemName &&
						<DefaultText type='caption'>{itemName}</DefaultText>
					}
					{(amount || optionNames) &&
						<DefaultText type='caption' style={{ display: 'flex', alignItems: 'center' }} className={ellipsis({ lineSize: 'line1' })}>
							{amount && `${amount}개`} {optionNames && <><span className={divider}/>옵션 {optionNames} 건</>}
						</DefaultText>
					}
				</div>
				{price && price !== 0 &&
					<DefaultText type='label3'>{price.toLocaleString()}원</DefaultText>
				}
			</div>
		</div>
	);
};

export default CardProductInfo;