export type CleanCallback<T extends object> = (
	key: keyof T,
	value: T[keyof T],
	fullData: T
) => [string, unknown][] | undefined;

export function createCleanedEntries<T extends object>(
  data: T,
  callback?: CleanCallback<T>
): Partial<T> {
  const cleaned = Object.fromEntries(
    Object.entries(data).flatMap(([key, value]) => {
      const typedKey = key as keyof T;

      // 커스텀 클리너가 있으면 우선 적용
      const customCleaned = callback?.(typedKey, value, data);
      if (customCleaned) return customCleaned;

      // 다중 선택 배열 값 최소값 하나로 변환 적용
      if (Array.isArray(value)) {
        return [[key, Math.min(...value)]];
      }

      // 기본 반환
      return [[key, value]];
    })
  );

  return cleaned as Partial<T>;
}