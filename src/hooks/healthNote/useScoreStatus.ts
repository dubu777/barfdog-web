import { useMemo } from "react";
import {
	getScoreChangeStatus,
	getSimplifyStatus,
	getSimplifyStatusColor,
	getSimplifyStatusLabel,
} from "@/utils/healthNote/getHealthStatus";

interface UseScoreStatusProps {
	current: number;
	previous: number;
	threshold?: number;
}

export function useScoreStatus({
	current,
	previous,
	threshold = 10,
}: UseScoreStatusProps) {
	const diff = current - previous;
	const status = useMemo(() => getSimplifyStatus(getScoreChangeStatus(diff, threshold)), [diff, threshold]);
	const label = useMemo(() => getSimplifyStatusLabel(status), [status]) || null;
	const color = useMemo(() => getSimplifyStatusColor(status), [status]) || null;

	return {
		diff,
		status,
		label,
		color,
	}
}