import { ReactNode } from "react";
import { createPortal } from "react-dom";
import CardSection from "@/components/pages/mypage/common/cards/layout/CardSection";
import CardProductInfo from "@/components/pages/mypage/common/cards/layout/CardProductInfo";
import CardProgressStatus from "@/components/pages/mypage/common/cards/layout/CardProgressStatus";
import CardActions from "@/components/pages/mypage/common/cards/layout/CardActions";
import CardModal from "@/components/pages/mypage/common/cards/layout/CardModal";
import { CardActionsId, IsOpenCardModal, NormalizedCardData, OrderAction } from "@/types";

interface BaseCardProps {
	type: 'order' | 'subscription';
	data: NormalizedCardData;
	cardHeaderTitle: ReactNode;
	cardActions: OrderAction[];
	handleActions: (url?: string, params?: string, id?: CardActionsId) => void;
	showCardActions?: boolean;
	showCardProgressStatus?: boolean;
	showProgressLabel?: boolean;
	isOpenModal: IsOpenCardModal;
	setIsOpenModal: ({ id, isOpen }: IsOpenCardModal) => void;
	productionDates?: {
		productionDate: string;
		receivingDate: string;
		paymentDate: null | string;
		deliveryDate: string;
	}
	isOrderDetail?: boolean;
	isButtonWrap?: boolean;
}

const BaseCard = ({
	type,
	data,
	cardHeaderTitle,
	cardActions,
	handleActions,
	showCardActions = true,
	showCardProgressStatus = false,
	showProgressLabel = false,
	isOpenModal,
	setIsOpenModal,
	productionDates,
	isOrderDetail = false,
	isButtonWrap = type === 'order',
}: BaseCardProps) => {
	return (
		<CardSection>
			{cardHeaderTitle}
			<CardProductInfo
				name={data.name}
				imageUrl={data.imageUrl}
				imageSize={showCardProgressStatus ? 72 : 76}
				itemName={data.itemName}
				price={data.price}
				planInfo={data.plan}
				amount={data.amount || 0}
				optionNames={data.optionNames}
			/>
			{showCardProgressStatus &&
				<CardProgressStatus
					status={data.orderStatus || ''}
					subscribeCount={data.subscribeCount}
					showProgressLabel={showProgressLabel}
					productionDates={productionDates}
				/>
			}
			{showCardActions &&
				<CardActions
					actions={cardActions}
					onActionClick={(url, params , id) => handleActions(url, params, id)}
					isButtonWrap={isButtonWrap}
				/>
			}
			{createPortal(
				<CardModal
					data={data}
					orderId={data.id}
					orderType={data.orderType}
					modalState={isOpenModal}
					onClose={() => setIsOpenModal({ id: null, isOpen: false })}
					isOrderDetail={isOrderDetail}
				/>, document.body
			)}

		</CardSection>
	);
};

export default BaseCard;