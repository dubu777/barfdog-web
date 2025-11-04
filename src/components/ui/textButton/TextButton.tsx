import * as styles from './TextButton.css';
import Text from "@/components/ui/text/Text";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
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
			<Text type="headline4" color="red">
				{text}
			</Text>
			<SvgIcon src={ArrowRightIcon} color="red" size={20} />
		</button>
	);
};

export default TextButton;