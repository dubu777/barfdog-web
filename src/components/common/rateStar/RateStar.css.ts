import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const rate = recipe({
  base: {
    fontSize: themeVars.fontSize["text-lg"],
    textAlign: 'right',
    marginBottom: '5px',
  },
  variants: {
    color: {
      red: {
        color: themeVars.colors.mainRed,
      },
      yellow: {
        color: themeVars.fontColors.yellow,
      },
      black: {
        color: themeVars.colors.black,
      }
    },
    align: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
    }
  }
})
