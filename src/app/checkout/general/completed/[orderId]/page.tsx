import Text from "@/components/ui/text/Text";

interface GeneralCompletedPageProps {
  params: {
    orderId: string;
  };
}

export default async function GeneralCompletedPage({
  params,
}: GeneralCompletedPageProps) {
  const orderId = Number(params.orderId);

  return <Text type="title1">일반 결제 완료 페이지, orderId: {orderId}</Text>;
}
