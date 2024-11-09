export function getNameWithPossessiveSuffix(name: string, content: string): string {
  if (!name || !content) {
    return content || ''; // content가 없다면 빈 문자열 반환
  }

  const lastChar = name[name.length - 1];
  const code = lastChar.charCodeAt(0) - 0xac00;
  const finalConsonant = code % 28;

  return finalConsonant !== 0 ? `${name}이${content}` : `${name}${content}`;
}

/**
 * 주어진 이름에 "을"/"를" 조사를 붙여 반환합니다.
 */
export function getNameWithObjectSuffix(name: string, content: string): string {
  if (!name || !content) {
    return content || ''; // content가 없다면 빈 문자열 반환
  }

  const lastChar = name[name.length - 1];
  const code = lastChar.charCodeAt(0) - 0xac00;
  const finalConsonant = code % 28;

  return finalConsonant !== 0 ? `${name}을 ${content}` : `${name}를 ${content}`;
}

/**
 * 주어진 이름에 "이"/"가" 조사를 붙여 반환합니다.
 */
export function getNameWithSubjectSuffix(name: string, content: string): string {
  if (!name || !content) {
    return content || ''; // content가 없다면 빈 문자열 반환
  }

  const lastChar = name[name.length - 1];
  const code = lastChar.charCodeAt(0) - 0xac00;
  const finalConsonant = code % 28;

  return finalConsonant !== 0 ? `${name}이 ${content}` : `${name}가 ${content}`;
}