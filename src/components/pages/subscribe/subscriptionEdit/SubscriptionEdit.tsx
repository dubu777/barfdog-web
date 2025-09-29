"use client";

import { useGetSubscriptionDetailV2 } from "@/api/subscription/queries/useGetSubscriptionDetailV2";

interface SubscriptionEditProps {
  reportId: number;
}

export default function SubscriptionEdit({ reportId }: SubscriptionEditProps) {
  const { data: detailData } = useGetSubscriptionDetailV2(reportId);
  console.log(detailData, "detailData");

  return (
    <div>
      <></>
    </div>
  );
}
