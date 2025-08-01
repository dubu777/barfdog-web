import { Suspense } from "react";
import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";
import SurveyPageContainer from "@/components/pages/dietAnalysis/survey/surveyPageContainer/surveyPageContainer";
import Loader from "@/components/common/loader/Loader";

export default function SurveyPage() {
  return (
    <Suspense fallback={<Loader fullscreen />}>
      <main>
        <NavigationGuard>
          <SurveyPageContainer />
        </NavigationGuard>
      </main>
    </Suspense>
  );
}
