import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";
import BodyCheckSurvey from "@/components/pages/heathNote/bodyCheck/survey/BodyCheckSurvey";

export default async function BodyCheckSurveyPage() {
  return (
    <NavigationGuard>
      <BodyCheckSurvey />
    </NavigationGuard>
  );
}
