import * as styles from './About.css';
import Image from "next/image";
import Link from "next/link";
import Text from "@/components/common/text/Text";
import Button from "@/components/common/button/Button";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { ABOUT_DATA } from "@/constants/community";

const About = () => {
	const ourStory = ABOUT_DATA.OUR_STORY;
	const ourProcess = ABOUT_DATA.OUR_PROCESS;
	const ourSns = ABOUT_DATA.SNS;

	const ourStoryContentList = ourStory.content.split('/b');
	return (
		<section className={styles.aboutContainer}>
			<article className={styles.sectionBox({})}>
				<div className={styles.sectionTitle}>
					<Image src={ourStory.logoImageUrl} alt={ourStory.title} width={119} height={84} />
					<Text type='headline2' color='red'>{ourStory.title}</Text>
					<Text type='body2'>{ourStory.subTitle}</Text>
				</div>
				<Image src={ourStory.imageUrl} alt={ourStory.title} width={375} height={320} className={styles.sectionImage} />
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
				<Image src={ourProcess.imageUrl} alt={ourProcess.title} width={375} height={320} className={styles.sectionImage} />
				<div className={styles.sectionBox({ background: 'pinkWhite' })}>
					<div className={styles.sectionTitle}>
						<Image src={ourProcess.logoImageUrl} alt={ourProcess.title} width={166} height={77} />
						<Text type='headline2' color='red'>{ourProcess.title}</Text>
						<Text type='body2'>{ourProcess.subTitle}</Text>
					</div>
					<div className={styles.ourProcessBox}>
						{ourProcess.descriptions.map(description => (
							<div key={description.title} className={styles.sectionDescription}>
								<Text type='headline2'>{description.title}</Text>
								<Text type='body2' preLine>{description.description}</Text>
							</div>
						))}
					</div>
				</div>
			</article>
			<article>
				<Image src={ourSns.imageUrl} alt={ourSns.title} width={375} height={320} className={styles.sectionImage} />
				<div className={styles.snsBox}>
					<div className={styles.sectionTitle}>
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
	);
};

export default About;