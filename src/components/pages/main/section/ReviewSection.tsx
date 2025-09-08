import Image from "next/image";
import { ellipsis } from "@/styles/common.css";
import { useRouter } from "next/navigation";
import {
	mainBox, mainReviewButton,
	mainReviewCard, mainReviewCardContent,
	mainReviewDescription,
	mainReviewImage,
} from "@/components/pages/main/common/MainCommon.css";
import MainContainer from "@/components/pages/main/layout/MainContainer";
import MainTitle from "@/components/pages/main/common/MainTitle";
import Button from "@/components/common/button/Button";
import Text from "@/components/common/text/Text";
import Card from "@/components/common/card/Card";
import RateStar from "@/components/common/rateStar/RateStar";
import Marquee from "react-fast-marquee";
import { motion } from 'framer-motion';
import { MAIN_DATA } from "@/constants/main";
import { MainBestReviewList } from "@/types";

interface ReviewSectionProps {
	bestReviewList: MainBestReviewList[];
}

const ReviewSection = ({ bestReviewList }: ReviewSectionProps) => {
	const router = useRouter();
	const title = MAIN_DATA.REVIEW.title;
	const subTitle = MAIN_DATA.REVIEW.subTitle;
	const description = MAIN_DATA.REVIEW.description;
	const action = MAIN_DATA.REVIEW.action;

	return (
		<MainContainer backgroundColor='pinkWhite'>
			<MainTitle title={title} subTitle={subTitle} hasInteraction />
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<Text type='body2' block className={mainReviewDescription}>
					{description}
				</Text>
			</motion.div>
			<Marquee speed={100}>
				{[...bestReviewList, ...bestReviewList].map((review, index) => (
					<Card
						key={`${review.id}-${index}`}
						shadow='none'
						align='start'
						className={mainReviewCard}
					>
						<Image src={review.imageUrl} alt={review.username} width={120} height={120} className={mainReviewImage} />
						<div className={mainReviewCardContent}>
							<div>
								<Text type='headline4' style={{ marginBottom: '2px' }}>{review.username.split('@')[0]}</Text>
								<Text type='caption' className={ellipsis({ lineSize: 'line2' })}>
									{review.contents}
								</Text>
							</div>
							<RateStar rateLength={5} value={5} size={11} />
						</div>
					</Card>
				))}
			</Marquee>
			<div className={`${mainBox} ${mainReviewButton}`}>
				<Button onClick={() => router.push(action.url)} variant={action.variant} fullWidth={action.fullWidth}>
					{action.label}
				</Button>
			</div>
		</MainContainer>
	);
};

export default ReviewSection;