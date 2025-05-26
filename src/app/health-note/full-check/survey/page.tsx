import FullCheckSurvey from "@/components/pages/heathNote/fullCheck/survey/FullCheckSurvey";
import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";

export default async function FullCheckSurveyPage() {
  return (
    <NavigationGuard>
      <FullCheckSurvey />
    </NavigationGuard>
  );
}
