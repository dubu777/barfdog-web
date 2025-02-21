import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const badge = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '1.5px 8.5px',
    border: `1px solid ${themeVars.borderColors.greyBB}`,
    borderRadius: '10px',
    color: themeVars.borderColors.greyBB,
    fontSize: themeVars.fontSize["text-xs"],
  },
  variants: {
    color: {
      redBorder: {
        color: themeVars.colors.red.red,
        border: `1px solid ${themeVars.colors.red.red}`,
      },
      red: {
        color: themeVars.colors.gray.gray0,
        background: themeVars.backgroundColors.mainRed,
        border: 0,
      },
      orange: {
        color: themeVars.colors.gray.gray0,
        background: themeVars.backgroundColors.orange,
        border: 0,
      },
      grey: {
        color: themeVars.colors.gray.gray0,
        background: themeVars.backgroundColors.grey7E,
        border: 0,
      },
    },
    borderRadius: {
      none: {
        borderRadius: 0,
      }
    }
  }
})