export const formatTime = (value: string | number): string => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  
  const hours = Math.floor(numericValue);
  const minutes = (numericValue % 1) * 60;
  
  return minutes > 0 ? `${hours}시간 ${minutes}분` : `${hours}시간`;
};