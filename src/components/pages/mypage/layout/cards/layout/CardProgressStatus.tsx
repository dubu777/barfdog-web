import * as styles from '../Card.css';
import DefaultText from "@/components/common/defaultText/DefaultText";
import ProgressBar from "@/components/common/progressBar/ProgressBar";
import { ORDER_PROGRESS, ORDER_STATUS_MESSAGES } from "@/constants/mypage";

interface CardProgressStatusProps {
	status: string;
	productionDates?: { productionDate: string | null; receivingDate: string | null; };
	subscribeCount?: number;
	isMyPage?: boolean;
}

const CardProgressStatus = ({ status, productionDates, subscribeCount, isMyPage }: CardProgressStatusProps) => {
	const getOrderStatusMessage = (status: string, n: number = 0): string | undefined => {
		return ORDER_STATUS_MESSAGES[status]?.(n) || undefined;
	};

	const progressInfo = ORDER_PROGRESS[status] || { progress: 0 };
	const orderStatusMessage = isMyPage ? getOrderStatusMessage(status, subscribeCount || 0 + 1) : undefined;
	const showProgress = isMyPage || status !== 'SUBSCRIBE_PENDING' && status !== 'SUBSCRIBE_CANCEL';

	return (
		<div className={styles.statusContainer({ hasStatusLabel: isMyPage && !!progressInfo.label })}>
			{isMyPage && orderStatusMessage &&
				<DefaultText type='caption' color='red'>{orderStatusMessage}</DefaultText>
			}
			{showProgress &&
				<ProgressBar
					progress={progressInfo.progress}
					label={isMyPage ? progressInfo.label: undefined}
				/>
			}
			{showProgress &&
				<div className={styles.dateInfo}>
					<DefaultText type='caption'>
						{productionDates?.productionDate} {progressInfo.statusText?.payment}
					</DefaultText>
					<DefaultText type='caption' color='gray600'>
						{productionDates?.receivingDate} {progressInfo.statusText?.delivery}
					</DefaultText>
				</div>
			}
		</div>
	);
};

export default CardProgressStatus;