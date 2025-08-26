export function sumScores(obj: Record<string, unknown>): number {
	return Object.values(obj).reduce((sum: number, val) => {
		return typeof val === "number" ? sum + val : sum;
	}, 0);
}
