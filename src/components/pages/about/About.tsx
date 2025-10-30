'use client';
import * as styles from './About.css';
import Image from "next/image";
import Link from "next/link";
import Text from "@/components/ui/text/Text";
import Button from "@/components/ui/button/Button";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import { ABOUT_INFO } from '@/constants/about';
import { imageWrapper } from '@/styles/common.css';

export default function About() {
	const ourStory = ABOUT_INFO.OUR_STORY;
	const ourProcess = ABOUT_INFO.OUR_PROCESS;
	const ourSns = ABOUT_INFO.SNS;
	const ourSnsTop = ABOUT_INFO.SNS_TOP;

	const ourStoryContentList = ourStory.content.split('/b');
	return (
		<>
			<Header
				showBackButton
				showCartButton
				centerTitle="ABOUT US"
			/>
			<section className={styles.aboutContainer}>
				<article className={styles.sectionBox({})}>
					<div className={styles.sectionTitle({ padding: '60/20/28' })}>
						<Image src={ourStory.logoImageUrl} alt={ourStory.title} width={119} height={84} />
						<Text type='headline2' color='red'>{ourStory.title}</Text>
						<Text type='body2'>{ourStory.subTitle}</Text>
					</div>
					<Image src={ourStory.imageUrl} alt={ourStory.title} width={1200} height={320} className={imageWrapper({ objectFit: 'cover' })} />
					<div className={styles.sectionContent}>
						{ourStoryContentList.map((content, index) => (
							<Text key={index} type={index === 1 ? 'label2' : 'body2'} preLine>
								{content}
							</Text>
						))}
						<div className={styles.signatureBox}>
							<Text type='caption' color='gray700'>{ourStory.subContent.text}</Text>
							<Image src={ourStory.subContent.imageUrl} alt={ourStory.subContent.text} width={74} height={80} />
						</div>
					</div>
				</article>
				<article>
					<Image src={ourProcess.imageUrl} alt={ourProcess.title} width={600} height={400} className={imageWrapper({ objectFit: 'cover' })} />
					<div className={`${styles.sectionBox({ background: 'pinkWhite' })} ${styles.sectionContent}`}>
						<div className={styles.ourProcessBox}>
							<div className={styles.ourProcessTitle}>
								<Image src={ourProcess.logoImageUrl} alt={ourProcess.title} width={166} height={77} />
								<Text type='headline2' color='red'>{ourProcess.title}</Text>
							</div>
							{ourProcess.descriptions.map(description => (
								<div key={description.title} className={styles.sectionDescription}>
									<Text type='headline2'>{description.title}</Text>
									<Text type='body2' preLine>{description.description}</Text>
								</div>
							))}
						</div>
					</div>
				</article>
				<article className={styles.snsContainer}>
					<div className={styles.snsTopImageText}>
						<Text type='title1'>{ourSnsTop.title}</Text>
						<Text type='body2' color='gray700' preLine align='center'>{ourSnsTop.subTitle}</Text>
					</div>
					<Image src={ourSns.imageUrl} alt={ourSns.title} width={600} height={400} className={imageWrapper({ objectFit: 'contain' })} />
					<div className={styles.snsBox}>
						<div className={styles.sectionTitle({ padding: '0/20' })}>
							<Text type='headline2'>{ourSns.title}</Text>
							<Text type='body2' preLine>{ourSns.subTitle}</Text>
							<Link href={ourSns.action.url} target='_blank'>
								<Button buttonType='button' size='sm'>
									{ourSns.action.label}
								</Button>
							</Link>
						</div>
						<ul className={styles.snsList}>
							{ourSns.descriptions.map(link => (
								<Link href={link.url} key={link.url} target='_blank'>
									<SvgIcon src={link.imageUrl} size={24} />
								</Link>
							))}
						</ul>
					</div>
				</article>
			</section>
			<Footer showMenu={false} />
		</>
	);
};