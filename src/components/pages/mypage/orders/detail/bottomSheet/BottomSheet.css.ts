import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const bottomSheetContainer = style({
  overflowY: 'scroll',
  maxHeight: '95vh',
})

export const bottomSheetStickyHeader = style({
  position: 'sticky',
  top: -1,
  backgroundColor: themeVars.colors.gray.gray0,
})