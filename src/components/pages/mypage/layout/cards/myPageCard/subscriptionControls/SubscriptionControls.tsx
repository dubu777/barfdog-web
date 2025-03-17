import * as styles from "../MyPageCard.css";
import { useRouter } from "next/navigation";
import { ORDER_ACTIONS, SUBSCRIPTION_ORDER_ACTIONS } from "@/constants/mypage";
import Button from "@/components/common/button/Button";
import { usePersistMypageStore } from "@/store/usePersistMypageStore";
import { MEMBERSHIP_TIERS_LIST } from "@/constants/membership";

interface DogButtonControlsProps {
  type: 'mypage' | 'subscription';
  status: string;
  subscribeId: string | number;
}

const SubscriptionControls = ({ type, status, subscribeId }: DogButtonControlsProps) => {
  const actions = type === 'mypage' ? ORDER_ACTIONS[status] : SUBSCRIPTION_ORDER_ACTIONS[status];
  const { mypageUserInfo } = usePersistMypageStore();
  const userMembershipTier = MEMBERSHIP_TIERS_LIST.find(tier => tier.tierKR === mypageUserInfo.grade);

  const router = useRouter();
  const handleActions = (url: string) => {
    router.push(`${url}/${subscribeId}`)
  }

  return (
    <div className={styles.subscribeControlsContainer}>
      {type === 'subscription' &&
        <div className={styles.subscribeControlsBox}>
          <Button
            variant='outline'
            type='assistive'
            size='sm'
            width='50%'
            onClick={() => handleActions('')} // 전체 구독일정 및 신청 정보 확인/변경 url 적용 필요
          >
            전체 구독일정
          </Button>
          <Button
            variant='outline'
            type='assistive'
            size='sm'
            width='50%'
            onClick={() => handleActions('')} // 전체 구독일정 및 신청 정보 확인/변경 url 적용 필요
          >
            신청 정보 확인/변경
          </Button>
        </div>
      }
      <div className={styles.subscribeControlsBox}>
        {actions?.map((action, index) => {
          const totalDiscount = (userMembershipTier?.subscriptionDiscount || 0) + 5;
          const buttonLabel =
            status === 'SUBSCRIBE_CANCEL'
              ? action.label.split('-').map((part, i) => i === 1 ? `${totalDiscount}%${part}` : part).join('')
              : action.label;
          return (
            <Button
              key={`${ORDER_ACTIONS[status]}-${action.label}-${index}`}
              variant={action.variants ? 'solid' : 'outline'}
              type={action.variants ? 'primary' : 'assistive'}
              size='sm'
              width={actions.length > 1 ? '50%' : '100%'}
              onClick={() => handleActions(action.url as string)}
            >
              {buttonLabel}
            </Button>
          )
        })}
      </div>
    </div>
  );
};

export default SubscriptionControls;