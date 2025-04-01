import * as styles from '../Information.css';
import { useState } from 'react';
import Button from "@/components/common/button/Button";
import InfoList from "@/components/pages/mypage/common/information/layout/InfoList";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Card from "@/components/common/card/Card";
import InfoTitleButton from "@/components/pages/mypage/common/information/layout/InfoTitleButton";
import { InfoLists, InfoListsButtons } from '@/types';

interface InfoSectionProps {
	title?: string;
	subTitle?: string;
	subTitleRight?: string;
	infoLists: InfoLists[];
	isDefaultOpen?: boolean;
	buttons?: InfoListsButtons[];
	className?: string;
}

const InfoSection = ({
	title,
	subTitle,
	subTitleRight,
	infoLists,
	isDefaultOpen = true,
	buttons,
	className,
}: InfoSectionProps) => {
	const [isOpen, setIsOpen] = useState(isDefaultOpen);

	return (
		<article className={`${styles.infoContainer({ isOpen })} ${className || ''}`}>
			<InfoTitleButton title={title} subTitleRight={subTitleRight} isOpen={isOpen} setIsOpen={setIsOpen} />
			{isOpen && (
				<Card shadow="none" padding={12} className={styles.infoDetailContainer}>
					{subTitle && (
						<div className={`${styles.infoItem} ${styles.infoSubTitle}`}>
							<DefaultText type="headline2">{subTitle}</DefaultText>
							{subTitleRight &&
								<DefaultText type="headline2" color="red">{subTitleRight}</DefaultText>
							}
						</div>
					)}
					{infoLists.map(({ title, items, noBorder }, index) => (
						<InfoList key={index} title={title} items={items} noBorder={noBorder} />
					))}
					{buttons && (
						<div className={styles.infoButtonControls}>
							{buttons.map((btn, index) => (
								<Button key={index} variant="outline" width={buttons?.length > 1 ? "50%" : '100%'} size="sm" onClick={btn.onClick}>
									{btn.label}
								</Button>
							))}
						</div>
					)}
				</Card>
			)}
		</article>
	);
};

export default InfoSection;