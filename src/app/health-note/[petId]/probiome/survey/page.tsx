import { redirect } from "next/navigation";
import ProbiomeSurvey from "@/components/pages/heathNote/probiome/survey/ProbiomeSurvey";
import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";
import { Gender } from "@/types";

interface ProbiomeSurveyPageProps {
  searchParams: {
    petId?: string;
    kitId?: string;
    petName?: string;
    gender?: Gender;
  };
}

export default function ProbiomeSurveyPage({
  searchParams,
}: ProbiomeSurveyPageProps) {
  const { petId, kitId, petName, gender } = searchParams;

  // 필수 파라미터 검증
  if (!petId || !kitId || !petName || !gender) {
    redirect("/health-note");
  }

  const parsedPetId = parseInt(petId);
  const parsedKitId = parseInt(kitId);

  return (
    <NavigationGuard>
      <ProbiomeSurvey
        petId={parsedPetId}
        kitId={parsedKitId}
        petName={petName}
        gender={gender}
      />
    </NavigationGuard>
  );
}
