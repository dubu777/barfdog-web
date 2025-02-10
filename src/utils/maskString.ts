export function maskString(
  str: string,
  visibleStart: number = 2,
  visibleEnd: number = 1,
  maskChar: string = '*'
): string {
  if (!str) return '';

  // 이메일의 경우
  if (str.includes('@')) {
    const [username, domain] = str.split('@');
    return `${maskString(username, visibleStart, visibleEnd, maskChar)}@${domain}`;
  }

  if (str.length <= visibleStart + visibleEnd) {
    return str[0] + maskChar.repeat(str.length - 1);
  }

  const startPart = str.slice(0, visibleStart);
  const endPart = str.slice(-visibleEnd);
  const maskedPart = maskChar.repeat(str.length - visibleEnd);

  return `${startPart}${maskedPart}${endPart}`
}