import Button from "@/components/ui/button/Button";
import Text from "@/components/ui/text/Text";
import { commonWrapper } from "@/styles/common.css";
import Link from "next/link";

interface SubscriptionCompletedPageProps {
  params: {
    orderId: string;
  };
}

export default async function SubscriptionCompletedPage({
  params,
}: SubscriptionCompletedPageProps) {
  const orderId = Number(params.orderId);
  return (
    <div className={commonWrapper({ direction: "col", gap: 8 })}>
      <Text type="title1">구독 결제 완료 페이지, orderId: {orderId}</Text>
      <Link href={"/"}>
        <Button>메인 페이지</Button>
      </Link>
      <Link href={"/diet-analysis"}>
        <Button>AI 추천식단</Button>
      </Link>
    </div>
  );
}
