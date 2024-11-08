import * as styles from "@/components/pages/mypage/main/DogList/DogList.css";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";

interface SubscriptionButtonProps {
  linkUrl: string;
  title: string;
  color?: 'red';
}

const SubscriptionButton = ({ title, linkUrl, color }: SubscriptionButtonProps) => {
  return (
    <DefaultButton
      type={color === 'red' ? 'mainBorder' :'grayBorder'}
      size='sm'
      linkUrl={linkUrl}
    >
      {title}
    </DefaultButton>
  )
}

const DogButtonControls = ({ status, subscribeId }: { status: string, subscribeId: number | string }) => {
  const subscribing = status === 'SUBSCRIBING';
  const beforeSubscribe = status === 'BEFORE_PAYMENT' || status === 'SURVEY_COMPLETED';
  const pendingSubscribe = status === 'SUBSCRIBE_PENDING' || status === 'SUBSCRIBE_CANCEL';
  const wilCancelSubscribe = status === 'SUBSCRIBE_WILL_CANCEL';

  const DelayDelivery = () => (
    <SubscriptionButton title={'배송 미루기'} linkUrl={`/mypage/delayDelivery/${subscribeId}`} />
  )
  const DeliveryAddress = () => (
    <SubscriptionButton title={'구독 배송지 관리'} linkUrl='' />
  )
  const ManageSubscription = () => (
    <SubscriptionButton title={'구독 관리'} linkUrl='' />
  )
  const PaymentSubscription = () => (
    <SubscriptionButton title={'구독 결제하기'} color='red' linkUrl='' />
  )
  const CheckSurvey = () => (
    <SubscriptionButton title={'설문 확인하기'} linkUrl='' />
  )
  const Resubscribe = () => (
    <SubscriptionButton title={'재구독하기'} color='red' linkUrl='' />
  )
  return (
    <div className={styles.subscribeControlsBox}>
      {subscribing &&
        <>
          <DelayDelivery />
          <DeliveryAddress />
          <ManageSubscription />
        </>
      }
      {beforeSubscribe &&
      <>
        <CheckSurvey />
        <PaymentSubscription />
      </>
      }
      {pendingSubscribe &&
        <Resubscribe />
      }
      {wilCancelSubscribe &&
      <>
        <Resubscribe />
        <DeliveryAddress />
        <ManageSubscription />
      </>
      }
    </div>
  );
};

export default DogButtonControls;