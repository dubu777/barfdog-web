import ProbiomeSurvey from "@/components/pages/heathNote/probiome/survey/ProbiomeSurvey";
import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";

export default async function ProbiomeSurveyPage() {
  return (
    <NavigationGuard>
      <ProbiomeSurvey />
    </NavigationGuard>
  );
}
