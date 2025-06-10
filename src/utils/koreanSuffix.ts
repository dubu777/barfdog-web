
// 받침이 있는지 확인
function hasBatchim(char: string): boolean {
  const code = char.charCodeAt(0) - 0xac00;
  return code >= 0 && code % 28 !== 0;
}

export function getNameWithPossessiveSuffix(name: string): string {
  if (!name) return '';
  return hasBatchim(name.slice(-1)) ? `${name}이` : name;
}

export function getNameWithObjectSuffix(name: string): string {
  if (!name) return '';
  return hasBatchim(name.slice(-1)) ? `${name}을` : `${name}를`;
}

export function getNameWithSubjectSuffix(name: string): string {
  if (!name) return '';
  return hasBatchim(name.slice(-1)) ? `${name}이` : `${name}가`;
}

export function getNameWithTopicSuffix(name: string): string {
  if (!name) return '';
  return hasBatchim(name.slice(-1)) ? `${name}은` : `${name}는`;
}