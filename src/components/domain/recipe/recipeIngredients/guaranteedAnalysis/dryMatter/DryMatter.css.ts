import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const dryMatterDot = style({
  flex: 1,
  height: '1px',
  backgroundImage: `
    repeating-linear-gradient(
      to right,
      ${themeVars.colors.gray.gray700}, 
      ${themeVars.colors.gray.gray700} 2px,
      transparent 2px, 
      transparent 4px
    )`,
  alignSelf: 'center',
});