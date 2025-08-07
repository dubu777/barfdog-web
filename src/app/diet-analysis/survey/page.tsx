import { Suspense } from "react";
import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";
import SurveyPageContainer from "@/components/pages/dietAnalysis/survey/surveyPageContainer/SurveyPageContainer";
import { Gender } from "@/types";
import { redirect } from "next/navigation";

interface SurveyPageProps {
  searchParams: {
    dogName?: string;
    dogId?: string;
    gender?: string;
    mode?: string;
  };
}

export default function SurveyPage({ searchParams }: SurveyPageProps) {
  const { dogName = "", dogId, gender = "MALE", mode } = searchParams;

  // dogId는 필수, 없거나 숫자로 파싱 불가 시 리디렉트
  const dogIdNum = Number(dogId);
  if (!dogId || Number.isNaN(dogIdNum)) {
    return redirect("/diet-analysis");
  }

  const isResurvey = mode === "resurvey";

  return (
    <main>
      <NavigationGuard>
        <SurveyPageContainer
          dogName={dogName}
          dogId={dogIdNum}
          gender={gender as Gender}
          isResurvey={isResurvey}
        />
      </NavigationGuard>
    </main>
  );
}
