import CheckoutFailed from "@/components/pages/checkout/common/failed/CheckoutFailed";
import { ORDER_TYPE } from "@/constants";

interface CheckoutFailedPageProps {
  params: {
    subscribeId: string;
  };
}

export default function SubscriptionCheckoutFailedPage({
  params,
}: CheckoutFailedPageProps) {
  const subscribeId = Number(params.subscribeId);

  return (
    <CheckoutFailed
      subscribeId={subscribeId}
      orderType={ORDER_TYPE.SUBSCRIPTION}
    />
  );
}
