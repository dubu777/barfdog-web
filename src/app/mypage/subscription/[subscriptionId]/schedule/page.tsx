import Schedule from "@/components/pages/mypage/subscription/schedule/Schedule";

interface SubscriptionSchedulePageProps {
  params: {
    subscriptionId: string;
  }
}

export default async function SubscriptionSchedulePage({ params }: SubscriptionSchedulePageProps) {
  const subscriptionId = Number(params.subscriptionId);
  return (
    <Schedule subscriptionId={subscriptionId} />
  )
}