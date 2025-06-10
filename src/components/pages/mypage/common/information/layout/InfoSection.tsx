import * as styles from '../Information.css';
import { ReactNode, useState } from 'react';
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
	infoLists?: InfoLists[];
	isDefaultOpen?: boolean;
	buttons?: InfoListsButtons[];
	className?: string;
	children?: ReactNode;
}

const InfoSection = ({
	title,
	subTitle,
	subTitleRight,
	infoLists,
	isDefaultOpen = true,
	buttons,
	className,
	children,
}: InfoSectionProps) => {
	const [isOpen, setIsOpen] = useState(isDefaultOpen);

	return (
		<article className={`${styles.infoContainer({ isOpen })} ${className || ''}`}>
			<InfoTitleButton title={title} subTitleRight={subTitleRight} isOpen={isOpen} setIsOpen={!isDefaultOpen ? setIsOpen : undefined} />
			{isOpen && (
				<Card shadow="none" padding={12} className={styles.infoDetailContainer}>
					{infoLists
						? <>
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
										<Button key={index} variant="outline" fullWidth size="sm" onClick={btn.onClick}>
											{btn.label}
										</Button>
									))}
								</div>
							)}
						</>
						: children
					}

				</Card>
			)}
		</article>
	);
};

export default InfoSection;