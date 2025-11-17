// import SubscriptionCompleted from "@/components/pages/checkout/subscription/completed/SubscriptionCompleted";

interface SubscriptionCompletedPageProps {
  params: {
    subscribeId: string;
  };
}

export default async function SubscriptionCompletedPage({
  params,
}: SubscriptionCompletedPageProps) {
  const subscribeId = Number(params.subscribeId);
  // return <SubscriptionCompleted subscribeId={subscribeId} />;
  return null;
}
