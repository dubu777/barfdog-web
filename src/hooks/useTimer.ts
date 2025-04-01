import { useCallback, useEffect, useState } from "react";

const useTimer = (initialTime: number, onComplete?: () => void) => {
	const [timeLeft, setTimeLeft] = useState<number>(initialTime);
	const [isRunning, setIsRunning] = useState<boolean>(false);

	const start = useCallback(() => setIsRunning(true), []);
	const stop = useCallback(() => setIsRunning(false), []);
	const reset = useCallback(() => setTimeLeft(initialTime), [initialTime]);

	useEffect(() => {
		if (!isRunning) return;

		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					setIsRunning(false);
					if (onComplete) onComplete();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [isRunning, onComplete])

	// 분:초 형식으로 변환된 시간 반환
	const formattedTimeLeft = `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`;


	return { timeLeft, formattedTimeLeft, isRunning, start, stop, reset };
}

export default useTimer;