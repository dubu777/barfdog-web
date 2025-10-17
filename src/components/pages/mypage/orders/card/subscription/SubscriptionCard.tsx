import { commonWrapper } from "@/styles/common.css";
import Button from "@/components/common/button/Button";
import CardWrapper from "../common/CardWrapper";
import OrderStatus from "../common/OrderStatus";
import OrderImage from "../common/OrderImage";
import OrderPrice from "../common/OrderPrice";
import OrderName from "../common/OrderName";
import RecipesDetail from "./RecipesDetail";
import { OrderInfo, RecipeInfo } from "@/types/mypage/orders";
import { PlanKey } from "@/types";

interface SubscriptionCardProps {
  orderInfo: OrderInfo;
  recipeInfo: RecipeInfo;
}

export default function SubscriptionCard({ 
  orderInfo, 
  recipeInfo
}: SubscriptionCardProps) {
  // TODO: 주문취소 기능 추가
  return (
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
      {orderInfo.orderStatus === 'PAYMENT_DONE' && 
        <Button 
          variant="outline" 
          intent="assistive" 
          fullWidth 
          size='sm'
        >
          주문취소
        </Button>
      }
    </CardWrapper>
  );
}