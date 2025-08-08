import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";
import SurveyPageContainer from "@/components/pages/dietAnalysis/survey/surveyPageContainer/SurveyPageContainer";
import { Gender } from "@/types";
import { redirect } from "next/navigation";

interface SurveyPageProps {
  searchParams: {
    petName?: string;
    petId?: string;
    gender?: string;
  };
}

export default function SurveyPage({ searchParams }: SurveyPageProps) {
  const { petName = "", petId, gender = "MALE" } = searchParams;

  // petId는 필수, 없거나 숫자로 파싱 불가 시 리디렉트
  const petIdNum = Number(petId);
  if (!petId || Number.isNaN(petIdNum)) {
    return redirect("/diet-analysis");
  }

  return (
    <main>
      <NavigationGuard>
        <SurveyPageContainer
          petName={petName}
          petId={petIdNum}
          gender={gender as Gender}
        />
      </NavigationGuard>
    </main>
  );
}
