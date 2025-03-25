import * as styles from '../Information.css';
import DefaultText from "@/components/common/defaultText/DefaultText";
import ArrowIcon from '/public/images/icons/chevron-down.svg';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

interface InfoTitleButtonProps {
	title?: string;
	subTitleRight?: string;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

const InfoTitleButton = ({ title, subTitleRight, isOpen, setIsOpen }: InfoTitleButtonProps) => {
	return (
		title &&
		<button onClick={() => setIsOpen(!isOpen)} className={`${styles.infoItem}`}>
			<DefaultText type="title4">{title}</DefaultText>
			<div className={styles.infoAccordion}>
				<DefaultText type="headline2" color="red">{subTitleRight}</DefaultText>
				<SvgIcon src={ArrowIcon} className={styles.infoAccordionIcon({ isOpen })} />
			</div>
		</button>
	);
};

export default InfoTitleButton;