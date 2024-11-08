export const copyToClipboard = async (text: string): Promise<void> => {
  if (!navigator.clipboard) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  } else {
    try {
      await navigator.clipboard.writeText(text);
      console.log('클립보드에 복사되었습니다:', text);
    } catch (err) {
      console.log('클립보드 복사 실패:', err);
    }
  }
}