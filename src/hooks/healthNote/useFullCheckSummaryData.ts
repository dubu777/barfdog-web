import { useMemo } from "react";
import { FullCheckSummary } from "@/types/healthNote/fullCheck";

interface UseFullCheckSummaryDataProps {
  fullCheckSummary?: FullCheckSummary;
} 

export function useFullCheckSummaryData({ fullCheckSummary }: UseFullCheckSummaryDataProps) {
  const isFirstFullCheck = useMemo(
    () => !fullCheckSummary?.isExistDiagnosis,
    [fullCheckSummary?.isExistDiagnosis]
  );

  const checkupScoreUpperPercentile = useMemo(
    () => fullCheckSummary?.checkupScoreUpperPercentile,
    [fullCheckSummary?.checkupScoreUpperPercentile]
  );

  const checkupScore = useMemo(
    () => fullCheckSummary?.checkupScore ?? 0,
    [fullCheckSummary?.checkupScore]
  );

  const avgCheckupScore = useMemo(
    () => fullCheckSummary?.avgCheckupScore ?? 0,
    [fullCheckSummary?.avgCheckupScore]
  );

  return {
    isFirstFullCheck,
    checkupScoreUpperPercentile,
    checkupScore,
    avgCheckupScore,
  };
}

