import { commonWrapper } from "@/styles/common.css";
import Button from "@/components/common/button/Button";
import CardWrapper from "../../common/card/CardWrapper";
import OrderStatus from "../../common/card/OrderStatus";
import OrderImage from "../../common/card/OrderImage";
import OrderPrice from "../../common/card/OrderPrice";
import OrderName from "../../common/card/OrderName";
import OrderCancelRequestModal from "../modal/OrderCancelRequestModal";
import OrderCancelAlertModal from "../modal/OrderCancelAlertModal";
import RecipesDetail from "./RecipesDetail";
import useModal from "@/hooks/useModal";
import { OrderInfo, RecipeInfo, VisibleOrderStatus } from "@/types/mypage/orders";
import { PlanKey } from "@/types";
import { isOrderStatusStepBelow, isOrderStatusStepEqual } from "@/utils/mypage/orders/orderStatusStep";

interface SubscriptionCardProps {
orderInfo: OrderInfo;
recipeInfo: RecipeInfo;
onCancelOrder: () => void;
}

export default function SubscriptionCard({ 
  orderInfo, 
  recipeInfo,
  onCancelOrder,
}: SubscriptionCardProps) {
  const { isOpen: isOpenOrderCancel, onToggle: onToggleOrderCancel, onClose: onCloseOrderCancel } = useModal();

  const isProducing = isOrderStatusStepEqual(orderInfo.orderStatus as VisibleOrderStatus, 'PRODUCING');
  const isPaymentDone = isOrderStatusStepEqual(orderInfo.orderStatus as VisibleOrderStatus, 'PAYMENT_DONE');

  return (
    <>
    
      <CardWrapper>
        <OrderStatus
          orderStatus={orderInfo.orderStatus}
          plan={orderInfo.plan as PlanKey}
        />
        <div className={commonWrapper({ gap: 12, justify: 'start', align: 'start' })}>
          <OrderImage
            thumbnailUrl={recipeInfo.thumbnailUrl}
            itemName={recipeInfo.recipeName}
          />
          <div className={commonWrapper({ direction: 'col', gap: 4, justify: 'start', align: 'start' })}>
            <OrderName name={orderInfo.dogName ?? ''} />
            <RecipesDetail 
              recipeInfo={recipeInfo}
              orderInfo={orderInfo}
            />
            <OrderPrice
              paymentPrice={orderInfo.paymentPrice}
            />
          </div>
        </div>
        {isOrderStatusStepBelow(orderInfo.orderStatus as VisibleOrderStatus, 'PRODUCING') && 
          <Button 
            variant="outline" 
            intent="assistive" 
            fullWidth 
            size='sm'
            onClick={onToggleOrderCancel}
          >
            주문취소
          </Button>
        }
      </CardWrapper>
      {isOpenOrderCancel && 
        isProducing ? 
          <OrderCancelRequestModal
            isOpen={isOpenOrderCancel}
            onClose={onCloseOrderCancel}
          />
        : isPaymentDone && 
          <OrderCancelAlertModal
            orderType="SUBSCRIPTION"
            isOpen={isOpenOrderCancel}
            onClose={onCloseOrderCancel}
            onSubmit={onCancelOrder}
          />
      }
    </>
  );
}