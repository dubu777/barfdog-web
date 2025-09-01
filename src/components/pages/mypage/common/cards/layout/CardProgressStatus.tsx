import * as styles from '../Card.css';
import Text from "@/components/common/text/Text";
import ProgressBar from "@/components/pages/mypage/common/progressBar/ProgressBar";
import {
	SUBSCRIPTION_ORDER_PROGRESS,
	SUBSCRIPTION_ORDER_STATUS_MESSAGES,
} from "@/constants/mypage";
import { format } from "date-fns";

interface CardProgressStatusProps {
	status: string;
	productionDates?: { paymentDate: string | null; deliveryDate: string | null; };
	subscribeCount?: number;
	showProgressLabel?: boolean;
}

const CardProgressStatus = ({ status, productionDates, subscribeCount, showProgressLabel }: CardProgressStatusProps) => {
	const getOrderStatusMessage = (status: string, count: number = 0): string | undefined => {
		return SUBSCRIPTION_ORDER_STATUS_MESSAGES[status]?.(productionDates?.paymentDate || format(new Date(), 'yyyy-MM-dd'), count) || undefined;
	};

	const progressInfo = SUBSCRIPTION_ORDER_PROGRESS[status] || { progress: 0 };
	const orderStatusMessage = showProgressLabel ? getOrderStatusMessage(status, subscribeCount || 1) : undefined;
	const showProgress = !showProgressLabel ? status !== 'SUBSCRIBE_PENDING' && status !== 'SUBSCRIBE_WILL_CANCEL' && status !== 'SUBSCRIBE_CANCEL' : true;

	console.log(status)
	return (
		<div className={styles.statusContainer({ hasStatusLabel: showProgressLabel && !!progressInfo.label })}>
			{showProgressLabel && orderStatusMessage &&
				<Text type='caption' color='red'>{orderStatusMessage}</Text>
			}
			{showProgress &&
				<ProgressBar
					progress={progressInfo.progress}
					label={showProgressLabel ? progressInfo.label: undefined}
					className={styles.statusProgressBar}
				/>
			}
			{showProgress &&
				<div className={styles.dateInfo}>
					<Text type='caption' color='gray500'>
						{productionDates?.paymentDate ? format(new Date(productionDates?.paymentDate), 'MM. dd.') : ''} {progressInfo.statusText?.payment}
					</Text>
					<Text type='caption' color='gray500'>
						{productionDates?.deliveryDate ? format(new Date(productionDates?.deliveryDate), 'MM. dd.') : ''} {progressInfo.statusText?.delivery}
					</Text>
				</div>
			}
		</div>
	);
};

export default CardProgressStatus;