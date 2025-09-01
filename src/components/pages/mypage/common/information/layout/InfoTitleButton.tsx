import * as styles from '../Information.css';
import Text from "@/components/common/text/Text";
import ArrowIcon from '/public/images/icons/chevron-down.svg';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

interface InfoTitleButtonProps {
	title?: string;
	subTitleRight?: string;
	isOpen: boolean;
	setIsOpen?: (isOpen: boolean) => void;
}

const InfoTitleButton = ({ title, subTitleRight, isOpen, setIsOpen }: InfoTitleButtonProps) => {
	return (
		title &&
		<button onClick={setIsOpen ? () => setIsOpen(!isOpen) : undefined} className={`${styles.infoItem}`}>
			<Text type="title4">{title}</Text>
			<div className={styles.infoAccordion}>
				<Text type="headline2" color="red">{subTitleRight}</Text>
				{setIsOpen &&
					<SvgIcon src={ArrowIcon} className={styles.infoAccordionIcon({ isOpen })} />
				}
			</div>
		</button>
	);
};

export default InfoTitleButton;