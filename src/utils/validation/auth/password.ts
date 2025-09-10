// src/utils/validation/password.ts
export type PasswordCriteriaKey =
  | "isLongEnough"
  | "hasLetterNumberSpecial"
  | "noInvalidRepetitionOrSequence";

export interface PasswordCriteriaItem {
  key: PasswordCriteriaKey;
  label: string;
  ok: boolean;
}

export interface PasswordRuleOptions {
  /** 최소 길이 (기본값 8) */
  minLength?: number;
}

/** 영문/숫자/특수문자 판정용 정규식 - 재사용 위해 상수로 고정 */
const LETTER_RE: RegExp = /[A-Za-z]/;
const DIGIT_RE: RegExp = /\d/;
const SPECIAL_RE: RegExp = /[^A-Za-z0-9\s]/;

/** 1) 최소 길이 */
export function isLongEnough(password: string, minLength: number = 8): boolean {
  const s: string = password ?? "";
  return s.length >= minLength;
}

/** 2) 영문 + 숫자 + 특수문자 조합 */
export function hasLetterNumberSpecial(password: string): boolean {
  const s: string = password ?? "";
  return LETTER_RE.test(s) && DIGIT_RE.test(s) && SPECIAL_RE.test(s);
}

/** 3) 3회 이상 동일 문자 또는 (엄격)연속 문자 금지: abc, 123, cba, 321 등 */
export function noInvalidRepetitionOrSequence(password: string): boolean {
  const s: string = password ?? "";
  if (s.length < 3) return true;

  for (let i = 0; i <= s.length - 3; i += 1) {
    const a: number = s.charCodeAt(i);
    const b: number = s.charCodeAt(i + 1);
    const c: number = s.charCodeAt(i + 2);

    // 모두 같은 문자 (aaa)
    if (a === b && b === c) return false;

    // 오름차순 연속 (abc, 123)
    if (b - a === 1 && c - b === 1) return false;

    // 내림차순 연속 (cba, 321)
    if (a - b === 1 && b - c === 1) return false;
  }
  return true;
}

/** 라벨 포함된 기준 리스트 생성 (UI 바인딩용) */
export function getPasswordCriteria(
  password: string,
  options: PasswordRuleOptions = {}
): PasswordCriteriaItem[] {
  const { minLength = 8 } = options;

  const longEnough: boolean = isLongEnough(password, minLength);
  const classesOk: boolean = hasLetterNumberSpecial(password);
  const noRepeatSeq: boolean = noInvalidRepetitionOrSequence(password);

  const items: PasswordCriteriaItem[] = [
    {
      key: "hasLetterNumberSpecial",
      label: "영문/숫자/특수문자 조합",
      ok: classesOk,
    },
    { key: "isLongEnough", label: `최소 ${minLength}자 이상`, ok: longEnough },
    {
      key: "noInvalidRepetitionOrSequence",
      label: "3회 이상 동일하거나 연속성이 없는 문자",
      ok: noRepeatSeq,
    },
  ];

  return items;
}

/** 모든 기준을 통과하는지 여부 */
export function isValidPassword(
  password: string,
  options: PasswordRuleOptions = {}
): boolean {
  return getPasswordCriteria(password, options).every((i) => i.ok);
}
