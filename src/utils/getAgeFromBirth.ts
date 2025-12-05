export function calculateAge(birth: string | Date): {
  years: number;
  months: number;
} {
  const birthDate: Date =
    typeof birth === "string"
      ? (() => {
          const [yStr, mStr, dStr] = birth.split("-");
          const year = Number(yStr);
          const month = Number(mStr) - 1; // JS Date 월은 0~11
          const day = Number(dStr);
          return new Date(year, month, day);
        })()
      : birth;
  const now = new Date();

  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();

  // 생일일이 아직 지나지 않았다면
  if (now.getDate() < birthDate.getDate()) {
    months--;
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  return { years, months };
}

// { years, months } 객체를 "N년 M개월" 문자열로 포맷
export function formatAge(age: { years: number; months: number }): string {
  const { years, months } = age;
  if (years === 0 && months === 0) return `0개월`;
  if (years > 0 && months > 0) return `${years}살 ${months}개월`;
  if (years > 0) return `${years}살`;
  return `${months}개월`;
}

// 편의 함수: 문자열 생일 → "N년 M개월"
export function getAgeFromBirth(birth: string): string {
  return formatAge(calculateAge(birth));
}
