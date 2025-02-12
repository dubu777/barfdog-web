import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const dividerStyles = style({
  width: '100%',
  height: '12px',
  margin: '20px 0',
  borderBottom: `12px solid ${themeVars.borderColors.grey50}`
})