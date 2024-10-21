import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";


export const buttonStyle = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: '9px',
    padding: '10px 20px',
    border: `0.5px solid ${themeVars.borderColors.greyDD}`,
    minHeight: '54px',
    fontSize: themeVars.fontSize["text-md"],
    transition: 'border-color 0.3s ease, color 0.3s ease, background-color 0.3s ease',
    cursor: 'pointer',
    backgroundColor: themeVars.colors.white,
  },
  variants: {
    checked: {
      true: {
        borderColor: themeVars.colors.mainRed,
        color: themeVars.colors.mainRed,
        backgroundColor: themeVars.backgroundColors.pinkFF,
      },
      false: {
        borderColor: themeVars.borderColors.greyDD,
        color: themeVars.colors.black,
        backgroundColor: themeVars.colors.white,
      },
    },
    type: {
      col: {
        minWidth: '200px',
      },
      row: {
        width: '100%',
      },
      grid: {

      },
    },
  },
  defaultVariants: {
    checked: false,
    type: 'col',
  },
});