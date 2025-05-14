import {useCallback, useState} from "react";

export function useCompletedMode() {
	const [completedMode, setCompletedMode] = useState<boolean>(false);

	const enableCompletedMode = useCallback(() => {
		setCompletedMode(true);
	}, []);
	const disableCompletedMode = useCallback(() => {
		setCompletedMode(false);
	}, []);
	const toggleCompletedMode = useCallback(() => {
		setCompletedMode(prev => !prev);
	}, []);

	return {
		completedMode,
		enableCompletedMode,
		disableCompletedMode,
		toggleCompletedMode,
	}
}