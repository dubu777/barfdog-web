import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const reviewItemTypeFilter = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'center',
  gap: '4px',
  padding: '20px 12px 4px 20px',
  background: themeVars.colors.gray.gray0,
})

export const reviewTab = style({
  padding: '20px',
  background: themeVars.colors.gray.gray0,
})
