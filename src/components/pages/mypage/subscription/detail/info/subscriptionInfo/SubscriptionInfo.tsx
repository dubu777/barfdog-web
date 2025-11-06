import { commonWrapper } from "@/styles/common.css";
import Divider from "@/components/ui/divider/Divider";
import CardImage from "@/components/pages/mypage/common/card/image/CardImage";
import Button from "@/components/ui/button/Button";
import Text from "@/components/ui/text/Text";
import InfoBox from "@/components/ui/infoBox/InfoBox";
import ListDivider from "@/components/ui/listDivider/ListDivider";
import LabelValueItem from "@/components/ui/labelValueItem/LabelValueItem";
import InfoWrapper from "@/components/pages/mypage/common/wrapper/InfoWrapper";
import CardWrapper from "@/components/pages/mypage/common/wrapper/CardWrapper";
import { DeliveryPlan, MealPlan, RawFood } from "@/types";
import { DELIVERY_PLAN_LABEL, MEAL_PLAN_LABEL } from "@/constants";

interface SubscriptionInfoProps {
  mealCount: MealPlan;
  weeks: DeliveryPlan;
  recipeList: RawFood[];
  subscriptionActions?: {
    onEditSubscription: () => void;
    onSkipSubscription: () => void;
  }
}

export default function SubscriptionInfo({ 
  subscriptionActions,
  mealCount,
  weeks,
  recipeList,
}: SubscriptionInfoProps) {
  const subscriptionActionsList = subscriptionActions 
    ? [
        {
          label: '식단 변경',
          onClick: subscriptionActions.onEditSubscription,
        },
        {
          label: '구독 건너뛰기',
          onClick: subscriptionActions.onSkipSubscription,
        },
      ] 
    : [];
 
  return (
    <InfoWrapper title='구독 정보'>
      <CardWrapper gap={16} padding={12}>
        <div className={commonWrapper({ direction: 'col', align: 'start', gap: 4 })}>
          <LabelValueItem
            label="식사량"
            value={`하루 ${MEAL_PLAN_LABEL[mealCount]}`}
            labelType="label3"
            valueType="body3"
            valueColor="gray900"
            labelColor="gray700"
            gap={12}
            labelWidth='auto'
          />
          <LabelValueItem
            label="배송 주기"
            value={DELIVERY_PLAN_LABEL[weeks]}
            labelType="label3"
            valueType="body3"
            valueColor="gray900"
            labelColor="gray700"
            gap={12}
            labelWidth='auto'
          />
        </div>
        <Divider thickness={2} color="gray900" />
        <div className={commonWrapper({ direction: 'col', align: 'start', gap: 8 })}>
          <Text type='label3'>구독 상품</Text>
          {recipeList.map((recipe, index) => (
            <div key={recipe.recipeId} className={commonWrapper({ gap: 12})}>
              <CardImage 
                imageUrl={recipe.displayImageUrl.url} 
                name={recipe.name}       
              />
              <div className={commonWrapper({ direction: 'col', align: 'start', gap: 4 })}>
                <Text type='headline2'>{recipe.name}</Text>
                <Text type='body3' color='gray700'>{recipe.pricePerGram}g</Text>
              </div>
              <ListDivider listLength={recipeList.length} index={index} color='gray200' />
            </div>
          ))}
        </div>
        {subscriptionActions &&
          <>
            <Divider thickness={2} color="gray900" />
            <div className={commonWrapper({ direction: 'col', align: 'start', gap: 8 })}>
              <Text type='label3'>구독 정보 변경</Text>
              <InfoBox 
                color="blue"
                text="구독 변경 사항은 다음 회차부터 적용돼요"
                fullWidth
              />
              {subscriptionActionsList.map((action) => (
                <Button 
                  key={action.label} 
                  onClick={action.onClick}
                  variant="outline"
                  intent="assistive"
                  size="md"
                  fullWidth
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </>
        }
      </CardWrapper>
    </InfoWrapper>
  );
}