'use client';
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

const useSanitizedHTML = (html: string, lineLimit?: number, maxLength = 119) => {
  const [sanitizedHTML, setSanitizedHTML] = useState<string>('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // const cleanHTML = DOMPurify.sanitize(html, {
      //   ALLOWED_TAGS: ['p', 'br', 'h1', 'h2', 'h3'],
      //   ALLOWED_ATTR: [],
      // });
      const cleanHTML = DOMPurify.sanitize(html);
      setSanitizedHTML(cleanHTML || '');
    }
  }, [html]);

  if (lineLimit && typeof window !== 'undefined') {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sanitizedHTML;

    // 텍스트 추출
    const paragraphs = Array.from(tempDiv.querySelectorAll('p, h1, h2, h3'))
      .map(el => el.textContent?.trim() || '')
      .filter(line => line);

    // 줄 제한 적용
    const limitedLines = paragraphs.slice(0, lineLimit).join('\n');

    // 전체 길이 제한 + 말줄임 처리
    return limitedLines.length > maxLength
      ? `${limitedLines.slice(0, maxLength - 3)}...`
      : limitedLines;
  } else {
    console.log('!??!')
    return sanitizedHTML;
  }
}
export default useSanitizedHTML;