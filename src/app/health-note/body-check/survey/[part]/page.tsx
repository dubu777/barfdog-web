// "use client";

import { redirect } from "next/navigation";
import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";
import BodyCheckSurveyContainer from "@/components/pages/heathNote/bodyCheck/survey/BodyCheckSurveyContainer";
import { bodyCheckSurveyConfig } from "@/config/bodyCheckSurveyConfig";
import { BodyCheckPart } from "@/types/healthNote";

export default function BodyCheckSurveyPage({
  params,
}: {
  params: { part: BodyCheckPart };
}) {
  const part = params.part;

  return (
    <NavigationGuard>
      <BodyCheckSurveyContainer part={part} />
    </NavigationGuard>
  );
}
