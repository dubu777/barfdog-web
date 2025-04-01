import { CardActionsId, OrderAction, OrderDeliveryInquiryStatus } from "@/types";
import { actionsControls } from "../Card.css";
import Button from "@/components/common/button/Button";

interface CardActionsProps {
	actions?: OrderAction[];
	onActionClick: (url?: string, params?: string, id?: CardActionsId) => void;
	isButtonWrap?: boolean;
}

const CardActions = ({
	actions,
	onActionClick,
	isButtonWrap = false,
}: CardActionsProps) => {
	if (!actions || actions.length === 0) return null;
	return (
		<div className={actionsControls({ isWrap: isButtonWrap })}>
			{actions?.map(({
				label,
				variants,
				fullWidth,
				url,
				params,
				id,
			}, index) => (
				<Button
					size='sm'
					key={`${label}-${index}`}
					variant={variants === 'solid' ? 'solid' : 'outline'}
					type={variants === 'solid' ? 'primary' : 'assistive'}
					width={fullWidth ? '100%' : 'calc(50% - 4px)'}
					onClick={() => onActionClick(url, params, id)}
				>
					{label}
				</Button>
			))}
		</div>
	);
};

export default CardActions;