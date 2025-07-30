import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";
import SurveyPageContainer from "@/components/pages/dietAnalysis/survey/surveyPageContainer/surveyPageContainer";

export default function SurveyPage() {
  return (
    <main>
      <NavigationGuard>
        <SurveyPageContainer />
      </NavigationGuard>
    </main>
  );
}
