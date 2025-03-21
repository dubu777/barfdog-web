import CancelSubscription from "@/components/pages/mypage/subscription/cancelSubscription/CancelSubscription";

interface CancelSubscriptionPageProps {
	params: {
		subscriptionId: string;
	}
}

export default async function CancelSubscriptionPage({ params }: CancelSubscriptionPageProps) {
	const subscriptionId = Number(params.subscriptionId);
	return (
		<CancelSubscription subscriptionId={subscriptionId} />
	)
}