
/**
 * 주어진 이름에 "이" 조사를 붙여 반환합니다.
 * (이름의 마지막 글자에 받침이 있으면 "이", 없으면 아무 조사도 붙이지 않습니다.)
 *
 * @param name - 이름 문자열
 * @returns 이름에 적절한 "이" 조사가 붙은 문자열
 */
export function getNameWithPossessiveSuffix(name: string): string {
  if (!name) return '';
  const lastChar = name[name.length - 1];
  const code = lastChar.charCodeAt(0) - 0xac00;
  const finalConsonant = code % 28;
  // 받침이 있으면 "이" 조사, 없으면 아무것도 붙이지 않음
  return finalConsonant !== 0 ? `${name}이` : `${name}`;
}

/**
 * 주어진 이름에 "을"/"를" 조사를 붙여 반환합니다.
 *
 * @param name - 이름 문자열
 * @returns 이름에 적절한 object 조사가 붙은 문자열
 */
export function getNameWithObjectSuffix(name: string): string {
  if (!name) return '';
  const lastChar = name[name.length - 1];
  const code = lastChar.charCodeAt(0) - 0xac00;
  const finalConsonant = code % 28;
  // 받침이 있으면 "을", 없으면 "를"
  return finalConsonant !== 0 ? `${name}을` : `${name}를`;
}

/**
 * 주어진 이름에 "이"/"가" 조사를 붙여 반환합니다.
 *
 * @param name - 이름 문자열
 * @returns 이름에 적절한 주격 조사가 붙은 문자열
 */
export function getNameWithSubjectSuffix(name: string): string {
  if (!name) return '';
  const lastChar = name[name.length - 1];
  const code = lastChar.charCodeAt(0) - 0xac00;
  const finalConsonant = code % 28;
  // 받침이 있으면 "이", 없으면 "가"
  return finalConsonant !== 0 ? `${name}이` : `${name}가`;
}