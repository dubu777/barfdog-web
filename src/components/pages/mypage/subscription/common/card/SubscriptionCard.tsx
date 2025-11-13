import { ReactNode, useMemo } from "react";
import Button from "@/components/ui/button/Button";
import CardWrapper from "../../../common/wrapper/CardWrapper";
import SubscriptionContents from "./SubscriptionContents";
import { PlanInfo } from "@/types";
import { SubscriptionStatus as SubscriptionStatusType } from "@/types/mypage/subscription";
import { VISIBLE_SUBSCRIPTION_STATUS_ACTIONS } from "@/constants/mypage/subscription";

interface SubscriptionCardProps {
  subscriptionId: number;
  status: SubscriptionStatusType;
  pictureUrl?: string | null;
  recipeNames: string;
  dogName: string;
  showActions?: boolean;
  shadow?: "none" | "light" | "normal" | "strong";
  children?: ReactNode;
  onGoToDetail?: () => void;
  onRetryPayment?: (subscriptionId: number) => void;
  onResubscribe?: (subscriptionId: number) => void;
  openKeepSubscriptionModal?: () => void;
  setSelectedSubscriptionId?: (subscriptionId: number) => void;
  planInfo: PlanInfo;
}

export default function SubscriptionCard({
  subscriptionId,
  status,
  pictureUrl,
  recipeNames,
  dogName,
  showActions = true,
  shadow = "light",
  children,
  onGoToDetail,
  onRetryPayment,
  onResubscribe,
  openKeepSubscriptionModal,
  setSelectedSubscriptionId,
  planInfo,
}: SubscriptionCardProps) {
  const subscriptionActions = useMemo(() => {
    return {
      SUBSCRIBING: onGoToDetail,
      SUBSCRIBE_PENDING: [onGoToDetail, () => onRetryPayment?.(subscriptionId)],
      SUBSCRIBE_WILL_CANCEL: () => {
        openKeepSubscriptionModal?.();
        setSelectedSubscriptionId?.(subscriptionId);
      },
      SUBSCRIBE_CANCEL: () => onResubscribe?.(subscriptionId),
    };
  }, [
    onGoToDetail,
    onRetryPayment,
    onResubscribe,
    openKeepSubscriptionModal,
    setSelectedSubscriptionId,
    subscriptionId,
  ]);

  return (
    <CardWrapper gap={10} padding={12} shadow={shadow}>
      <SubscriptionContents
        status={status}
        pictureUrl={pictureUrl}
        recipeNames={recipeNames}
        dogName={dogName}
        planInfo={planInfo}
      />
      {showActions &&
        VISIBLE_SUBSCRIPTION_STATUS_ACTIONS[status]?.actions?.map(
          (action, index) => (
            <Button
              key={action.label}
              variant={action.variants}
              intent={action.intent}
              fullWidth
              size="sm"
              onClick={() =>
                Array.isArray(subscriptionActions[status])
                  ? subscriptionActions[status][index]()
                  : subscriptionActions[status]()
              }
            >
              {action.label}
            </Button>
          )
        )}
      {children && children}
    </CardWrapper>
  );
}
