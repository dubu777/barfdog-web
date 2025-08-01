import { Suspense } from "react";
import Result from "@/components/pages/sVoucher/result/Result";
import LoadingImage from '/public/images/sVoucher/scan.gif';
import Image from "next/image";

interface ReviewPageProps {
  params: {
    surveyId: string;
  }
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const surveyId = Number(params.surveyId)
  return (
    <Suspense fallback={<Image src={LoadingImage} alt='loadingImage' width={265} height={425} />}>
      <Result surveyId={surveyId} />
    </Suspense>
  )
}