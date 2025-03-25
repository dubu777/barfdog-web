import * as styles from './RecommendationCode.css';
import Chips from "@/components/common/chips/Chips";
import { useToastStore } from "@/store/useToastStore";
import { copyToClipboard } from "@/utils";

interface RecommendationCodeProps {
	code: string;
	tailPosition?: 'top' | 'bottom';
	className?: string;
}

const RecommendationCode = ({ code, tailPosition = 'top', className }: RecommendationCodeProps) => {
	const { addToast } = useToastStore();
	const handleCopyCode = async () => {
		await copyToClipboard(code);
		addToast('복사가 완료되었습니다!');
	};
	return (
		<div onClick={handleCopyCode} className={`${styles.recommendationCode} ${className || ''}`}>
			<Chips variant='solid' switchOff size='sm' borderRadius='full' color='black' tailVisible tailPosition={tailPosition}>
				추천코드 {code}
			</Chips>
		</div>
	);
};

export default RecommendationCode;