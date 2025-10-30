import { commonWrapper } from "@/styles/common.css";
import InfoItem from "@/components/pages/mypage/common/card/typography/InfoItem";
import Divider from "@/components/common/divider/Divider";
import CardImage from "@/components/pages/mypage/common/card/image/CardImage";
import Button from "@/components/common/button/Button";
import Text from "@/components/common/text/Text";
import InfoBox from "@/components/common/infoBox/InfoBox";
import ListDivider from "@/components/common/listDivider/ListDivider";
import InfoWrapper from "@/components/pages/mypage/common/wrapper/InfoWrapper";
import CardWrapper from "@/components/pages/mypage/common/wrapper/CardWrapper";
import { PlanKey } from "@/types";
import { RecipeInfo } from "@/types/mypage/subscription";
import { numberOfPacksPerDay, subscriptionPlanInfo } from "@/constants";

interface SubscriptionInfoProps {
  plan: PlanKey;
  subscriptionRecipeInfo: RecipeInfo[];
  oneMealGramsPerRecipe: string[];
  subscriptionActions?: {
    onEditSubscription: () => void;
    onSkipSubscription: () => void;
  }
}

export default function SubscriptionInfo({ 
  plan,
  subscriptionRecipeInfo,
  oneMealGramsPerRecipe,
  subscriptionActions,
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
          <InfoItem
            label="식사량"
            labelType='label3'
            labelColor='gray900'
            value={numberOfPacksPerDay[subscriptionPlanInfo[plan].numberOfPacksPerDay]}
            valueType='body3'
            valueColor='gray700'
            justify="start"
            gap={12}
          />
          <InfoItem
            label="배송 주기"
            labelType='label3'
            labelColor='gray900'
            value={`${subscriptionPlanInfo[plan].weeklyPaymentCycle}주`}
            valueType='body3'
            valueColor='gray700'
            justify="start"
            gap={12}
          />
        </div>
        <Divider thickness={2} color="gray900" />
        <div className={commonWrapper({ direction: 'col', align: 'start', gap: 8 })}>
          <Text type='label3'>구독 상품</Text>
          {subscriptionRecipeInfo.map((recipe, index) => (
            <div key={recipe.id} className={commonWrapper({ gap: 12})}>
              <CardImage 
                imageUrl={recipe.imgUrl} 
                name={recipe.name}       
              />
              <div className={commonWrapper({ direction: 'col', align: 'start', gap: 4 })}>
                <Text type='headline2'>{recipe.name}</Text>
                <Text type='body3' color='gray700'>{oneMealGramsPerRecipe[index]}g</Text>
              </div>
              <ListDivider listLength={subscriptionRecipeInfo.length} index={index} color='gray200' />
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