import { useRouter } from "next/navigation";
import { motion } from 'motion/react';
import Image from "next/image";
import FaqAvatar from '/public/images/main/faqAvatar.png';
import MainContainer from "@/components/pages/main/layout/MainContainer";
import MainTitle from "@/components/pages/main/common/MainTitle";
import Button from "@/components/ui/button/Button";
import Text from "@/components/ui/text/Text";
import {
	mainFAQButton,
	mainFAQButtonAvatar,
	mainFAQButtonBox,
	mainFAQDescription, mainFAQDescriptionBox
} from "@/components/pages/main/common/MainCommon.css";
import { MAIN_DATA } from "@/constants/main";

const parentVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.36,
		},
	},
};

const childVariants = {
	hidden: { opacity: 0, y: -20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'spring',
			stiffness: 50,
			damping: 10,
			ease: 'easeIn'
		},
	},
};

export default function FAQSection() {
	const router = useRouter();
	const title = MAIN_DATA.FAQ.title;
	const subTitle = MAIN_DATA.FAQ.subTitle;
	const action = MAIN_DATA.FAQ.action;
	const descriptions = MAIN_DATA.FAQ.descriptions;
	
	return (
		<MainContainer backgroundColor='yellow'>
			<MainTitle title={title} subTitle={subTitle} hasInteraction />
			<motion.div
				variants={parentVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 'all' }}
				className={mainFAQDescriptionBox}
			>
				{descriptions.map(description => (
					<motion.div key={description} variants={childVariants} className={mainFAQDescription}>
						<Text type='label4'>
							{description}
						</Text>
					</motion.div>
				))}
			</motion.div>
			<div className={mainFAQButtonBox}>
				<Button onClick={() => router.push(action.url)} variant={action.variant} fullWidth={action.fullWidth} className={mainFAQButton}>
					<Image src={FaqAvatar} alt='faq avatar' width={109} height={124} className={mainFAQButtonAvatar} />
					{action.label}
				</Button>
			</div>
		</MainContainer>
	);
};