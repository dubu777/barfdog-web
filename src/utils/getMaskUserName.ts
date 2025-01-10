export function getMaskUserName(username: string) {
  const firstPart = username[0];
  const maskedPart = '*'.repeat(username.length - 2);
  const lastPart = username[username.length - 1];

  return `${firstPart}${maskedPart}${lastPart}`;
}