import Text from "@/components/ui/text/Text";

interface SubscriptionCompletedPageProps {
  params: {
    orderId: string;
  };
}

export default async function SubscriptionCompletedPage({
  params,
}: SubscriptionCompletedPageProps) {
  const orderId = Number(params.orderId);

  return <Text type="title1">구독 결제 완료 페이지, orderId: {orderId}</Text>;
}
