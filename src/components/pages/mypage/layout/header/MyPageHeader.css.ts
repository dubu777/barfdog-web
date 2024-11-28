import {style} from "@vanilla-extract/css";
import {themeVars} from "@/styles/theme.css";

export const myPageHeader = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '62px',
  padding: '14px 24px',
})

export const goBackButton = style({
  marginRight: 'auto',
  cursor: 'pointer',
})

export const title = style({
  width: '100%',
  textAlign: 'center',
  marginTop: '28px',
  marginBottom: '26px',
  fontSize: themeVars.fontSize["text-xl"],
  fontWeight: themeVars.fontWeight.bold,
})