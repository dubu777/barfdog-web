import { commonWrapper, ellipsis, imageWrapper } from "@/styles/common.css";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import PictureIcon from '/public/images/icons/picture.svg';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Chips from "@/components/common/chips/Chips";
import Text from "@/components/common/text/Text";
import SubtitleText from "@/components/pages/mypage/common/card/typography/SubtitleText";
import MetaText from "@/components/pages/mypage/common/card/typography/MetaText";
import RateStar from "@/components/common/rateStar/RateStar";
import DescriptionText from "@/components/pages/mypage/common/card/typography/DescriptionText";
import Button from "@/components/common/button/Button";
import { REVIEW_STATUS, REVIEW_STATUS_COLOR_MAP, REVIEW_TYPE } from "@/constants";
import { ReviewItemType, ReviewStatus } from "@/types";

interface ReviewCardProps {
	isWriteableReview?: boolean;
	id: number;
	title: string;
	reviewType: ReviewItemType;
	thumbnailUrl?: string;
	imageUrl?: string;
	status?: ReviewStatus;
	createdDate?: string;
	star?: number;
	imageCount?: number;
	contents?: string;
	showDetail?: boolean;
	handleUpdate?: () => void;
	handleCreate?: () => void;
	handleStarChange?: (newRating: number) => void;
}

export default function ReviewCard({
	isWriteableReview = false,
	id,
	title,
	reviewType,
	thumbnailUrl,
	imageUrl,
	status,
	createdDate,
	star,
	imageCount = 0,
	contents,
	showDetail = false,
	handleUpdate,
	handleCreate,
	handleStarChange,
}: ReviewCardProps) {
	const router = useRouter();
	return (
		<div
			key={id}
			className={commonWrapper({
				backgroundColors: 'gray0',
				padding: 20,
				direction: 'col',
				align: 'start',
				gap: 12,
			})}
		>
			<div className={commonWrapper({ align: 'center', justify: 'between' })}>
				<div className={commonWrapper({ gap: 4, align: 'center', justify: 'start', width: 'auto' })}>
					{(!isWriteableReview && status) &&
					<Chips color={REVIEW_STATUS_COLOR_MAP[status]} variant='solid' borderRadius='lg'>
						{REVIEW_STATUS[status]}
					</Chips>
					}
					<Text type='label4'>{REVIEW_TYPE[reviewType]}</Text>
				</div>
				{handleUpdate &&
					<button onClick={handleUpdate}>
						<Text type='headline4' color='blue500'>수정</Text>
					</button>
				}
			</div>
			<div className={commonWrapper({ gap: 12, align: 'start', justify: 'start' })}>
				<Image
					src={thumbnailUrl ?? imageUrl ?? ''}
					alt={title}
					width={76}
					height={76}
					className={imageWrapper({ objectFit: 'cover', borderRadius: 8 })}
				/>
				<div className={commonWrapper({ gap: 4, direction: 'col', align: 'start', width: 'auto' })}>
					<SubtitleText text={title} type='headline2' />
					{reviewType === 'SUBSCRIBE'
						? (
							<div>
								<MetaText
									textList={[
										`하루 2끼`,
										`4주`,
										`28팩`,
									]}
									color='gray600'
								/>
								<MetaText textList={['정기구독 레시피1, 정기구독 레시피2']} color='gray600' />
							</div>
						) : (
							<div>
								<MetaText textList={['2개']} color='gray600' />
								<MetaText textList={['추가 상품 총 3건']} color='gray600' />
							</div>
						)
					}
				</div>
			</div>
			{!isWriteableReview &&
				<div className={commonWrapper({ gap: 8, align: 'center', justify: 'start' })}>
					<RateStar onChange={(newRating) => handleStarChange?.(newRating)} rateLength={5} value={star} size={24} color='red' />
					{createdDate &&
						<DescriptionText text={format(new Date(createdDate), 'yy.MM.dd')} color='gray700' />
					}
				</div>
			}
			{(!isWriteableReview && contents) &&
				<div className={commonWrapper({ gap: 4, align: 'center', justify: 'start' })}>
					{imageCount > 0 &&
						<SvgIcon src={PictureIcon} size={24} />
					}
					<Text type='body2' className={ellipsis({ lineSize: 'line1' })}>
						{contents}
					</Text>
				</div>
			}
			{showDetail &&
				<Button
					variant='outline'
					type={isWriteableReview ? 'primary' : 'assistive'}
					size='sm'
					fullWidth
					onClick={() => {
						if (isWriteableReview) {
							handleCreate?.();
						}
						router.push(
							isWriteableReview
								? '/mypage/review/create'
								: `/mypage/review/${id}?reviewType=${reviewType}&status=${status}`
						)}
					}
				>
					{isWriteableReview ? '리뷰 작성' : '리뷰 상세'}
				</Button>
			}
		</div>
	);
}