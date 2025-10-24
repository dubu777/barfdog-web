import { commonWrapper } from "@/styles/common.css";
import { useRouter } from "next/navigation";
import Card from "@/components/common/card/Card";
import Button from "@/components/common/button/Button";
import SubscriptionStatus from "./SubscriptionStatus";
import SubscriptionPlan from "./SubscriptionPlan";
import Text from "@/components/common/text/Text";
import CardImage from "../../../common/card/image/CardImage";
import { PlanKey } from "@/types";
import { VISIBLE_SUBSCRIPTION_STATUS_ACTIONS } from "@/constants/mypage/subscription";

interface SubscriptionCardProps {
  subscribeId?: number;
  status: string;
  pictureUrl: string | null;
  recipeNames: string;
  dogName: string;
  plan: PlanKey;
  showActions?: boolean;
  shadow?: 'none' | 'light' | 'normal' | 'strong';
}

export default function SubscriptionCard({ 
  subscribeId, 
  status,
  pictureUrl,
  recipeNames,
  dogName,
  plan,
  showActions = true,
  shadow = 'light',
}: SubscriptionCardProps) {
  const router = useRouter();
  return (
    <Card
      direction='col'
      align='start'
      gap={10}
      padding={12}
      shadow={shadow}
    >
      <SubscriptionStatus status={status} />
      <div className={commonWrapper({ gap: 12, align: 'start' })}>
        <CardImage imageUrl={pictureUrl} name={recipeNames} />
        <div className={commonWrapper({ direction: 'col', gap: 4, align: 'start' })}>
          <Text type='headline2'>{dogName}</Text>
          <SubscriptionPlan 
            plan={plan} 
            recipeNames={recipeNames} 
          />
        </div>
      </div>
      {showActions && VISIBLE_SUBSCRIPTION_STATUS_ACTIONS[status]?.actions?.map((action) => (
        <Button 
          key={action.label} 
          variant={action.variants}
          intent={action.intent} 
          fullWidth
          size="sm"
          onClick={() => action.onClick(router, subscribeId)}
        >
          {action.label}
        </Button>
      ))}
    </Card>
  );
}