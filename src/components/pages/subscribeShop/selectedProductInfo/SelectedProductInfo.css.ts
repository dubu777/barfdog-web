import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const selectedProductContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
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

})

export const productContentWrapper = style({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',

  gap: '10px',
})

export const productContentBox = style({
  width: '100%',
  fontSize: themeVars.fontSize["text-sm"],
  fontWeight: themeVars.fontWeight.bold,
  color: themeVars.fontColors.grey42,
  borderBottom: `2px solid ${themeVars.borderColors.greyBB}`,
  textAlign: 'center',
})
