import CheckoutFailed from "@/components/pages/checkout/common/failed/CheckoutFailed";

interface CheckoutFailedPageProps {
  params: {
    subscribeId: string;
  };
}

export default function CheckoutFailedPage({
  params,
}: CheckoutFailedPageProps) {
  const subscribeId = Number(params.subscribeId);

  return <CheckoutFailed subscribeId={subscribeId} />;
}
