import GutCheckSurvey from "@/components/pages/heathNote/gutCheck/survey/GutCheckSurvey";
import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";

export default async function GutCheckSurveyPage() {
  return (
    <NavigationGuard>
      <GutCheckSurvey />
    </NavigationGuard>
  );
}
