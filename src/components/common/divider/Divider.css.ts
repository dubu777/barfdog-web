import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const dividerStyles = style({
  width: '100%',
  height: '12px',
  borderBottom: `12px solid ${themeVars.borderColors.grey50}`
})