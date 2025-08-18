import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";
import BodyCheckSurvey from "@/components/pages/heathNote/bodyCheck/survey/BodyCheckSurvey";
import { BodyCheckPart } from "@/types/healthNote";

interface BodyCheckSurveyPageProps {
  params: Promise<{
    petId: string;
    part: BodyCheckPart;
  }>;
}

export default async function BodyCheckSurveyPage({ params }: BodyCheckSurveyPageProps) {
  const { petId, part } = await params;

  return (
    <NavigationGuard>
      <BodyCheckSurvey part={part} petId={Number(petId)} />
    </NavigationGuard>
  );
}
