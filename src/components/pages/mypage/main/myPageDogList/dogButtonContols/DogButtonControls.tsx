'use client';
import * as styles from "../MyPageDogList.css";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { useRouter } from "next/navigation";
import { useMyPageStore } from "@/store/useMypageStore";

interface SubscriptionButtonProps {
  linkUrl?: string;
  title: string;
  color?: 'red';
  onClick?: () => void;
}

const SubscriptionButton = ({ title, linkUrl, color, onClick }: SubscriptionButtonProps) => {
  const router = useRouter();
  return (
    <DefaultButton
      type={color === 'red' ? 'mainBorder' :'grayBorder'}
      size='sm'
      onClick={onClick ? onClick : () => linkUrl ? router.push(linkUrl) : undefined}
    >
      {title}
    </DefaultButton>
  )
}

interface DogButtonControlsProps {
  status: string;
  subscribeId: string | number;
  dogName: string;
}

const DogButtonControls = ({ status, subscribeId, dogName }: DogButtonControlsProps) => {
  const subscribing = status === 'SUBSCRIBING';
  const beforeSubscribe = status === 'BEFORE_PAYMENT' || status === 'SURVEY_COMPLETED';
  const pendingSubscribe = status === 'SUBSCRIBE_PENDING' || status === 'SUBSCRIBE_CANCEL';
  const wilCancelSubscribe = status === 'SUBSCRIBE_WILL_CANCEL';
  const { setSubscriptionDogName } = useMyPageStore();
  const router = useRouter();

  const handleAddressWithDogName = () => {
    setSubscriptionDogName(dogName)
    router.push(`/mypage/subscribe/address/${subscribeId}`);
  }
  const SubscriptionSkipDelivery = () => (
    <SubscriptionButton title={'배송 미루기'} linkUrl={`/mypage/subscribe/skipDelivery/${subscribeId}`} />
  )
  const SubscriptionAddress = () => (
    <SubscriptionButton title={'구독 배송지 관리'} onClick={handleAddressWithDogName} />
  )
  const ManageSubscription = () => (
    <SubscriptionButton title={'구독 관리'} linkUrl='/mypage/subscribe' />
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
          <SubscriptionSkipDelivery />
          <SubscriptionAddress />
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
        <SubscriptionAddress />
        <ManageSubscription />
      </>
      }
    </div>
  );
};

export default DogButtonControls;