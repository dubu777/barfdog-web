import * as styles from './TextButton.css';
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import ArrowRightIcon from "/public/images/icons/chevron-right-sm.svg";

interface TextButtonProps {
	text: string;
	onClick: () => void;
	className?: string;
}

const TextButton = ({
	text,
	onClick,
	className,
}: TextButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={`${styles.textButton} ${className || ''}`}
		>
			<DefaultText type="headline4" color="red">
				{text}
			</DefaultText>
			<SvgIcon src={ArrowRightIcon} color="red" size={20} />
		</button>
	);
};

export default TextButton;