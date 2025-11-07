import { Suspense } from "react";
import Result from "@/components/pages/heathNote/aiObesityCheck/result/Result";
import LoadingImage from '/public/images/healthNote/aiObesityCheck/scan.gif';
import Image from "next/image";

interface ReviewPageProps {
  params: {
    petId: string;
    surveyId: string;
  }
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { petId, surveyId } = await params;
  return (
    <Suspense 
      fallback={(
        <Image 
          src={LoadingImage} 
          alt='loadingImage' 
          width={265} 
          height={425} 
        />
      )}>
      <Result petId={Number(petId)} surveyId={Number(surveyId)} />
    </Suspense>
  )
}