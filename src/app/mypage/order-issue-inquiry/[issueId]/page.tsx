import OrderIssueDetail from "@/components/pages/mypage/orderIssueInquiry/orderIssueDetail/OrderIssueDetail";
import { ORDER_ISSUE_TYPE } from "@/constants/mypage";

interface OrderIssueDetailPageProps {
  params: {
    issueId: string;
  };
  searchParams: {
    issueType: keyof typeof ORDER_ISSUE_TYPE;
  }
}

export default async function OrderIssueDetailPage({ params, searchParams }: OrderIssueDetailPageProps) {
  const { issueId } = params;
  const { issueType } = searchParams;
  return (
    <OrderIssueDetail issueId={issueId} issueType={issueType} />
  )
}
