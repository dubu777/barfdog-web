'use client';

import { useGetSubscriptionDetail } from "@/api/mypage/subscription/queries/useGetSubscriptionDetail";
import Divider from "@/components/common/divider/Divider";
import { commonWrapper } from "@/styles/common.css";
import BasicInfo from "./info/basicInfo/BasicInfo";
import PaymentInfo from "./info/paymentInfo/PaymentInfo";
import SubscriptionInfo from "./info/subscriptionInfo/SubscriptionInfo";
import Text from "@/components/common/text/Text";

interface SubscriptionDetailProps {
  subscriptionId: number;
}

export default function SubscriptionDetail({ subscriptionId }: SubscriptionDetailProps) {
  const { data } = useGetSubscriptionDetail(subscriptionId);
  const { subscriptionInfo, subscriptionRecipeInfo } = data;

  console.log('subscriptionDetail',data);

  // TODO: 하단 기능 로직 구현 필요
  const handleApplyCoupon = () => {
    console.log('다음 회차 쿠폰 적용');
  };
  const handleChangeGrams = () => {
    console.log('구독 급여량 변경');
  };
  const handleChangePlan = () => {
    console.log('구독 플랜 변경');
  };
  const handleChangeRecipe = () => {
    console.log('구독 레시피 변경');
  };
  const handleChangeSkip = () => {
    console.log('구독 건너뛰기');
  };
  const handleCancelSubscription = () => {
    console.log('구독 해지');
  };

  if (!data) return null;
  return (
    <section
      className={commonWrapper({
        direction: 'col',
        align: 'start',
        paddingBottom: 60,
        backgroundColors: 'gray50',
      })}
    >
      <BasicInfo 
        status={subscriptionInfo.subscribeStatus}
        plan={subscriptionInfo.plan}
        dogName={subscriptionInfo.dogName}
        recipeNames={subscriptionRecipeInfo.map((recipe) => recipe.name).join(', ')}
        pictureUrl={null}
      />
      <Divider thickness={8} color="gray100" />
      <PaymentInfo 
        nextPaymentPrice={subscriptionInfo.nextPaymentPrice}
        nextPaymentDate={subscriptionInfo.nextPaymentDate}
        subscriptionCount={subscriptionInfo.subscribeCount}
        onApplyCoupon={handleApplyCoupon}
      />
      <Divider thickness={8} color="gray100" />
      <SubscriptionInfo
        plan={subscriptionInfo.plan}
        subscriptionRecipeInfo={subscriptionRecipeInfo}
        oneMealGramsPerRecipe={subscriptionInfo.oneMealGramsPerRecipe.split(',')}
        subscriptionActions={{
          onChangeGrams: handleChangeGrams,
          onChangePlan: handleChangePlan,
          onChangeRecipe: handleChangeRecipe,
          onChangeSkip: handleChangeSkip,
        }}
      />
      {/* <Divider thickness={8} color="gray100" /> */}
      {/* <PaymentMethodInfo /> */}
      <button 
        onClick={handleCancelSubscription} 
        className={commonWrapper({ 
          justify: 'start', 
          padding: 20, 
          paddingTop: 16, 
          paddingBottom: 0
        })}
      >
        <Text type="label4" color="gray700">해지하기</Text>
      </button>
    </section>
  );
}