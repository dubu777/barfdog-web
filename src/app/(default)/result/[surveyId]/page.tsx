import { Suspense } from "react";
import Result from "@/components/pages/sVoucher/result/Result";
import Loader from "@/components/common/loader/Loader";

interface ReviewPageProps {
  params: {
    surveyId: string;
  }
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const surveyId = Number(params.surveyId)
  return (
    <Suspense fallback={<Loader fullscreen />}>
      <Result surveyId={surveyId} />
    </Suspense>
  )
}