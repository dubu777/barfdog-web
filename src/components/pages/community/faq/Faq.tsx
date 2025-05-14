'use client';
import * as styles from './Faq.css';
import DefaultText from "@/components/common/defaultText/DefaultText";
import Accordion from "@/components/common/accordion/Accordion";
import InfoText from "@/components/pages/mypage/common/infoText/InfoText";
import { FAQ_DEFAULT_LIST } from "@/constants/community";

const Faq = () => {
	return (
		<section className={styles.faqContainer}>
			<article className={styles.faqTitle}>
				<DefaultText type='title2'>보호자님들께서<br/>자주 하시는 질문을 모아봤어요!</DefaultText>
				<DefaultText type='body2' color='gray600'>이곳에 궁금하신 질문이 없다면 우측 하단의 상담 아이콘을 통해 실시간 상담 받아보세요!</DefaultText>
			</article>
			<article>
				{FAQ_DEFAULT_LIST.map((faq, index) => (
					<Accordion
						key={index}
						showArrow
						title={(
							<div className={styles.faqAccordionTitle}>
								<DefaultText type='label4' style={{ minWidth: '25px' }}>{faq.label}</DefaultText>
								<DefaultText type='label3'>{faq.question}</DefaultText>
							</div>
						)}
						contentClassName={styles.faqAccordionContent}
					>
						<DefaultText type='body3' color='gray700' preLine>
							{faq.answer}
						</DefaultText>
						{faq?.subDescription &&
							<div className={styles.subAnswer}>
								{faq?.subDescription?.map(text =>
									<InfoText key={text} text={text} color='gray700' type='body3' />
								)}
							</div>
						}
					</Accordion>
				))}
			</article>
		</section>
	);
};

export default Faq;