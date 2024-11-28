import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const selectedProductContainer = style({
  display: 'grid',
  gridTemplateColumns: '0.6fr 2fr',
  rowGap: '15px',
  columnGap: '10px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  marginTop: '30px',
})

export const selectedProductWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  columnGap: '10px',
  width: '100%',
})

export const productTitleWrapper = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%,'
})

export const productContentWrapper = style({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  gap: '10px',
  height: '38px',
})

export const productContentBox = style({
  width: '100%',
  fontSize: themeVars.fontSize["text-sm"],
  fontWeight: themeVars.fontWeight.bold,
  color: themeVars.fontColors.grey42,
  borderBottom: `1px solid ${themeVars.borderColors.black50}`,
  textAlign: 'center',
  lineHeight: '1.3',
})
