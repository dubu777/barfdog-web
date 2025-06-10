import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";
import BodyCheckSurvey from "@/components/pages/heathNote/bodyCheck/survey/BodyCheckSurvey";
import { BodyCheckPart } from "@/types/healthNote";

export default function BodyCheckSurveyPage({
  params,
}: {
  params: { part: BodyCheckPart };
}) {
  const part = params.part;

  return (
    <NavigationGuard>
      <BodyCheckSurvey part={part} />
    </NavigationGuard>
  );
}
