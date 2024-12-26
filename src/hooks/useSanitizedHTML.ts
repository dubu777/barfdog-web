'use client';
import { useEffect, useState } from "react";
import DOMPurify, { Config } from "dompurify";

export function useSanitizedHTML(html: string, options?: Config) {
  const [sanitizedHTML, setSanitizedHTML] = useState<string>('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cleanHTML = DOMPurify.sanitize(html, options);
      setSanitizedHTML(cleanHTML || '');
    }
  }, [html, options]);

  return sanitizedHTML;
}