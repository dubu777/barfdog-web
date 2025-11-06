export function parseYmdHms(
  raw: string | null | undefined,
  zone: "local" | "utc" = "local"
): number | null {
  if (!raw) return null;
  const s = raw.trim().replace("T", " "); // ISO "T"도 허용
  const [datePart, timePartWithZone] = s.split(" ");
  if (!datePart || !timePartWithZone) return null;

  // "HH:mm:ssZ" 같은 꼬리를 방지: 숫자:숫자:숫자까지만 취함
  const timePart = timePartWithZone.slice(0, 8); // "HH:mm:ss"
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh, mm, ss] = timePart.split(":").map(Number);
  if ([y, m, d, hh, mm, ss].some((v) => Number.isNaN(v))) return null;

  return zone === "utc"
    ? Date.UTC(y, m - 1, d, hh, mm, ss)
    : new Date(y, m - 1, d, hh, mm, ss).getTime();
}
