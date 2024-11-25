import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const questionMark = style({
  cursor: 'pointer',
});

export const questionModal = style({});

export const questionModalContent = style({
  whiteSpace: 'pre-line',
  textAlign: 'left',
  lineHeight: '22px',
  fontSize: themeVars.fontSize["text-sm"],
  marginTop: '20px',
});
