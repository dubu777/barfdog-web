import InfoItem from "@/components/pages/mypage/common/card/typography/InfoItem";
import CardWrapper from "../../../../common/wrapper/CardWrapper";
import InfoWrapper from "../../../../common/wrapper/InfoWrapper";
import { PlanKey } from "@/types";
import { subscriptionPlanInfo } from "@/constants";
import { commonWrapper } from "@/styles/common.css";
import Divider from "@/components/common/divider/Divider";
import { RecipeInfo } from "@/types/mypage/subscription";
import CardImage from "@/components/pages/mypage/common/card/image/CardImage";
import ListDivider from "@/components/common/listDivider/ListDivider";
import Button from "@/components/common/button/Button";
import Text from "@/components/common/text/Text";

interface SubscriptionInfoProps {
  plan: PlanKey;
  subscriptionRecipeInfo: RecipeInfo[];
  oneMealGramsPerRecipe: string[];
  subscriptionActions: {
    onChangeGrams: () => void;
    onChangePlan: () => void;
    onChangeRecipe: () => void;
    onChangeSkip: () => void;
  }
}

export default function SubscriptionInfo({ 
  plan,
  subscriptionRecipeInfo,
  oneMealGramsPerRecipe,
  subscriptionActions,
}: SubscriptionInfoProps) {
  const { onChangeGrams, onChangePlan, onChangeRecipe, onChangeSkip } = subscriptionActions;
  const subscriptionActionsList = [
    {
      label: '구독 급여량 변경',
      onClick: onChangeGrams,
    },
    {
      label: '구독 플랜 변경',
      onClick: onChangePlan,
    },
    {
      label: '구독 레시피 변경',
      onClick: onChangeRecipe,
    },
    {
      label: '구독 건너뛰기',
      onClick: onChangeSkip,
    },
  ];
  return (
    <InfoWrapper title='구독 정보'>
      <CardWrapper gap={16} padding={12}>
        <div className={commonWrapper({ direction: 'col', align: 'start', gap: 4 })}>
          <InfoItem
            label="플랜"
            labelType='label3'
            labelColor='gray900'
            value={subscriptionPlanInfo[plan].label}
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
        <div className={commonWrapper({ direction: 'col', align: 'start', gap: 4 })}>
          {subscriptionActionsList.map((action) => (
            <Button 
              key={action.label} 
              onClick={action.onClick}
              variant="outline"
              intent="assistive"
              size="sm"
              fullWidth
            >
              {action.label}
            </Button>
          ))}
        </div>
      </CardWrapper>
    </InfoWrapper>
  );
}