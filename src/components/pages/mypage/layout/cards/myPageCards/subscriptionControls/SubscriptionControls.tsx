import * as styles from "../MyPageCards.css";
import { useRouter } from "next/navigation";
import { ORDER_ACTIONS } from "@/constants/mypage";
import Button from "@/components/common/button/Button";

interface DogButtonControlsProps {
  status: string;
  subscribeId: string | number;
}

const SubscriptionControls = ({ status, subscribeId }: DogButtonControlsProps) => {
  const actions = ORDER_ACTIONS[status]

  const router = useRouter();
  const handleActions = (url: string) => {
    router.push(`${url}/${subscribeId}`)
  }

  return (
    <div className={styles.subscribeControlsBox}>
      {actions.map((action, index) => (
        <Button
          key={`${ORDER_ACTIONS[status]}-${action.label}-${index}`}
          variant={action.variants ? 'solid' : 'outline'}
          type={action.variants ? 'primary' : 'assistive'}
          size='sm'
          width='50%'
          onClick={() => handleActions(action.url as string)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
};

export default SubscriptionControls;