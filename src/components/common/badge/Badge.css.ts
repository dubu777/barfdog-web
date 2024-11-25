import {recipe} from "@vanilla-extract/recipes";
import {themeVars} from "@/styles/theme.css";

export const badge = recipe({
  base: {
    display: 'inline-block',
    padding: '1.7px 8.5px',
    border: `1px solid ${themeVars.borderColors.greyBB}`,
    borderRadius: '10px',
    color: themeVars.borderColors.greyBB,
    fontSize: themeVars.fontSize["text-xs"],
  },
  variants: {
    color: {
      red: {
        color:themeVars.colors.mainRed,
        border: `1px solid ${themeVars.colors.mainRed}`,
      }
    }
  }
})