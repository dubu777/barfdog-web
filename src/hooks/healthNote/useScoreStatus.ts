import { useMemo } from "react";
import {
	getScoreChangeStatus,
	getSimplifyStatus,
	getSimplifyStatusColor,
	getSimplifyStatusLabel,
} from "@/utils/healthNote/common/getHealthStatus";

interface UseScoreStatusProps {
	current: number;
	scoreDifference: number;
	threshold?: number;
}

export function useScoreStatus({
	current,
	scoreDifference,
	threshold = 10,
}: UseScoreStatusProps) {
	const prev = current - scoreDifference;
	const status = useMemo(() => getSimplifyStatus(getScoreChangeStatus(scoreDifference, threshold)), [scoreDifference, threshold]);
	const label = useMemo(() => getSimplifyStatusLabel(status), [status]) || null;
	const color = useMemo(() => getSimplifyStatusColor(status), [status]) || null;

	return {
		prev,
		status,
		label,
		color,
	}
}