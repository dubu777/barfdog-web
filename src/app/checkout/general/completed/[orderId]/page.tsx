import GeneralOrderCompleted from "@/components/pages/checkout/general/completed/GeneralOrderCompleted";

interface GeneralCompletedPageProps {
  params: {
    orderId: string;
  };
}

export default async function GeneralCompletedPage({
  params,
}: GeneralCompletedPageProps) {
  const orderId = Number(params.orderId);

  return <GeneralOrderCompleted orderId={orderId} />;
}
