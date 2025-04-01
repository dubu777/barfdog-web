import * as styles from '../Card.css';
import DefaultText from "@/components/common/defaultText/DefaultText";
import ProgressBar from "@/components/common/progressBar/ProgressBar";
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
	const showProgress = showProgressLabel || status !== 'SUBSCRIBE_PENDING' && status !== 'SUBSCRIBE_WILL_CANCEL' && status !== 'SUBSCRIBE_CANCEL';

	return (
		<div className={styles.statusContainer({ hasStatusLabel: showProgressLabel && !!progressInfo.label })}>
			{showProgressLabel && orderStatusMessage &&
				<DefaultText type='caption' color='red'>{orderStatusMessage}</DefaultText>
			}
			{showProgress &&
				<ProgressBar
					progress={progressInfo.progress}
					label={showProgressLabel ? progressInfo.label: undefined}
				/>
			}
			{showProgress &&
				<div className={styles.dateInfo}>
					<DefaultText type='caption'>
						{productionDates?.paymentDate ? format(new Date(productionDates?.paymentDate), 'MM.dd') : ''} {progressInfo.statusText?.payment}
					</DefaultText>
					<DefaultText type='caption' color='gray600'>
						{productionDates?.deliveryDate ? format(new Date(productionDates?.deliveryDate), 'MM.dd') : ''} {progressInfo.statusText?.delivery}
					</DefaultText>
				</div>
			}
		</div>
	);
};

export default CardProgressStatus;