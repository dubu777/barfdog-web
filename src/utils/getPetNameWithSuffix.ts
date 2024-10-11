
export function getPetNameWithSuffix(petName: string, content: string): string {
  if (!petName || !content) {
    return content || ''; // content가 없다면 빈 문자열 반환
  }

  const lastChar = petName[petName.length - 1];
  const code = lastChar.charCodeAt(0) - 0xac00;
  const finalConsonant = code % 28;

  return finalConsonant !== 0 ? `${petName}이의 ${content}` : `${petName}의 ${content}`;
}