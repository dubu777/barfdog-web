import { redirect } from "next/navigation";
import ProbiomeSurvey from "@/components/pages/heathNote/probiome/survey/ProbiomeSurvey";
import NavigationGuard from "@/components/ui/navigationGuard/NavigationGuard";
import { Gender } from "@/types";

interface ProbiomeSurveyPageProps {
  params: {
    petId: string;
  };
  searchParams: {
    kitId?: string;
    petName?: string;
    gender?: Gender;
  };
}

export default function ProbiomeSurveyPage({
  params,
  searchParams,
}: ProbiomeSurveyPageProps) {
  const { kitId, petName, gender } = searchParams;
  const { petId } = params;

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
