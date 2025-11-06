import { inputStateTextStyle } from "@/components/ui/inputStatusMessage/InputStatusMessage.css";
import ErrorIcon from "/public/images/icons/close_small.svg";
import CheckIcon from "public/images/survey/check_small.svg";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Text from "@/components/ui/text/Text";

interface FormMessageProps {
	type: 'error' | 'success';
	message: string;
}

export default function InputStatusMessage({
	type,
	message,
}: FormMessageProps) {
	return (
		<>
			{type === 'error' && (
				<div className={inputStateTextStyle}>
					<SvgIcon src={ErrorIcon} color="red" size={18} />
					<Text type="caption" color="red" align="left">
						{message}
					</Text>
				</div>
			)}
			{type === 'success' && (
				<div className={inputStateTextStyle}>
					<SvgIcon src={CheckIcon} color="blue500" size={18} />
					<Text type="caption" color="blue500" align="left">
						{message}
					</Text>
				</div>
			)}
		</>
	);
}